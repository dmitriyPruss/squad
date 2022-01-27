const { Conversation, Message, Catalog } = require('./../models/mongoModels');
const { User } = require('../models/postgreModels');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const _ = require('lodash');

module.exports.addMessage = async (req, res, next) => {
  const {
    body: { messageBody, recipient, interlocutor },
    tokenData: { userId, firstName, lastName, displayName, avatar, email }
  } = req;

  console.log('req.body', req.body);

  const participants = [userId, recipient];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
    const newConversation = await Conversation.findOneAndUpdate(
      {
        participants
      },
      { participants, blackList: [false, false], favoriteList: [false, false] },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        useFindAndModify: false
      }
    );

    const { _id, blackList, favoriteList } = newConversation;

    const message = new Message({
      sender: userId,
      body: messageBody,
      conversation: _id
    });

    await message.save();

    message._doc.participants = participants;
    const interlocutorId = participants.filter(
      participant => participant !== userId
    )[0];

    const preview = {
      _id,
      sender: userId,
      text: messageBody,
      createAt: message.createdAt,
      participants,
      blackList,
      favoriteList
    };
    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        _id,
        sender: userId,
        text: messageBody,
        createAt: message.createdAt,
        participants,
        blackList,
        favoriteList,
        interlocutor: {
          id: userId,
          firstName,
          lastName,
          displayName,
          avatar,
          email
        }
      }
    });
    res.send({
      message,
      preview: Object.assign(preview, { interlocutor })
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  const {
    body: { recipient, interlocutorId },
    tokenData: { userId, firstName, lastName, displayName, avatar, email }
  } = req;

  const participants = [userId, interlocutorId];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
    const messages = await Message.aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData'
        }
      },
      { $match: { 'conversationData.participants': participants } },
      { $sort: { createdAt: 1 } },
      {
        $project: {
          _id: 1,
          sender: 1,
          body: 1,
          conversation: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]);

    const interlocutor = await userQueries.findUser({
      id: interlocutorId
    });

    const { firstName, lastName, displayName, id, avatar } = interlocutor;

    res.send({
      messages,
      interlocutor: {
        firstName,
        lastName,
        displayName,
        id,
        avatar
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  const {
    tokenData: { userId }
  } = req;

  try {
    const conversations = await Message.aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData'
        }
      },
      {
        $unwind: '$conversationData'
      },
      {
        $match: {
          'conversationData.participants': userId
        }
      },
      {
        $sort: {
          createdAt: -1
        }
      },
      {
        $group: {
          _id: '$conversationData._id',
          sender: { $first: '$sender' },
          text: { $first: '$body' },
          createAt: { $first: '$createdAt' },
          participants: { $first: '$conversationData.participants' },
          blackList: { $first: '$conversationData.blackList' },
          favoriteList: { $first: '$conversationData.favoriteList' }
        }
      }
    ]);
    const interlocutors = [];
    conversations.forEach(conversation => {
      interlocutors.push(
        conversation.participants.find(participant => participant !== userId)
      );
    });
    const senders = await User.findAll({
      where: {
        id: interlocutors
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar']
    });
    conversations.forEach(conversation => {
      senders.forEach(sender => {
        const {
          dataValues: { id, firstName, lastName, displayName, avatar }
        } = sender;

        if (conversation.participants.includes(id)) {
          conversation.interlocutor = {
            id,
            firstName,
            lastName,
            displayName,
            avatar
          };
        }
      });
    });
    res.send(conversations);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  const {
    body: { blackListFlag, participants },
    tokenData: { userId }
  } = req;

  const predicate = 'blackList.' + participants.indexOf(userId);
  try {
    const chat = await Conversation.findOneAndUpdate(
      { participants },
      { $set: { [predicate]: blackListFlag } },
      { new: true }
    );
    res.send(chat);
    const interlocutorId = participants.filter(
      participant => participant !== userId
    )[0];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.send(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  const {
    body: { favoriteFlag, participants },
    tokenData: { userId }
  } = req;

  const predicate = 'favoriteList.' + participants.indexOf(userId);
  try {
    const chat = await Conversation.findOneAndUpdate(
      { participants },
      { $set: { [predicate]: favoriteFlag } },
      { new: true }
    );
    res.send(chat);
  } catch (err) {
    res.send(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  const {
    body: { catalogName, chatId },
    tokenData: { userId }
  } = req;

  const catalog = new Catalog({
    userId,
    catalogName,
    chats: [chatId]
  });
  try {
    await catalog.save();
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  const {
    body: { catalogId: _id, catalogName },
    tokenData: { userId }
  } = req;

  try {
    const catalog = await Catalog.findOneAndUpdate(
      {
        _id,
        userId
      },
      { catalogName },
      { new: true }
    );
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  const {
    body: { catalogId: _id, chatId },
    tokenData: { userId }
  } = req;

  try {
    const catalog = await Catalog.findOneAndUpdate(
      {
        _id,
        userId
      },
      { $addToSet: { chats: chatId } },
      { new: true }
    );
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  const {
    body: { catalogId: _id, chatId },
    tokenData: { userId }
  } = req;

  try {
    const catalog = await Catalog.findOneAndUpdate(
      {
        _id,
        userId
      },
      { $pull: { chats: chatId } },
      { new: true }
    );
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  const {
    body: { catalogId: _id },
    tokenData: { userId }
  } = req;

  try {
    await Catalog.remove({
      _id,
      userId
    });
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  const {
    tokenData: { userId }
  } = req;

  try {
    const catalogs = await Catalog.aggregate([
      { $match: { userId } },
      {
        $project: {
          _id: 1,
          catalogName: 1,
          chats: 1
        }
      }
    ]);
    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
