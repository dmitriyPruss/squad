const { Op } = require("sequelize");
const _ = require("lodash");
// const { Conversation, Message, Catalog } = require("./../models/mongoModels");
const { User, sequelize } = require("../models/postgreModels");
const { Conversation, Message, Catalog } = require("./../models/postgreModels");

const userQueries = require("./queries/userQueries");
const controller = require("../socketInit");

// (bugs ChatSocket) дописать коды статуса при отправке
// ++
module.exports.addMessage = async (req, res, next) => {
  const {
    body: { messageBody, recipient, interlocutor },
    tokenData: { userId, firstName, lastName, displayName, avatar, email },
  } = req;

  const participants = [userId, recipient];

  participants.sort((a, b) => a - b);

  try {
    const [currentConversation, created] = await Conversation.findOrCreate({
      where: { participants },
      defaults: { blackList: [false, false], favoriteList: [false, false] },
    });

    const { id, favoriteList, blackList } = currentConversation.dataValues;

    const { dataValues: message } = await Message.create({
      sender: userId,
      body: messageBody,
      conversation: id,
    });

    message.participants = participants; // обратить внимание - расхождение с Мангусом(*) message._doc.participants = participants;

    const interlocutorId = participants.filter((participant) => participant !== userId)[0];

    const postgresPreview = {
      id,
      sender: userId,
      text: messageBody,
      createdAt: message.createdAt,
      participants,
      blackList,
      favoriteList,
    };

    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        id,
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
          email,
        },
      },
    });

    res.send({
      message,
      preview: Object.assign(postgresPreview, { interlocutor }),
    });
  } catch (err) {
    next(err);
  }
};

// + +
module.exports.getChat = async (req, res, next) => {
  const {
    params: { interlocutorId },
    tokenData: { userId },
  } = req;

  const participants = [userId, interlocutorId];
  participants.sort((a, b) => a - b);

  try {
    const messages = (
      await Message.findAll({
        include: {
          model: Conversation,
          where: { participants },
        },
        raw: true,
        order: [["createdAt"]],
      })
    ).map((foundMessage) => {
      console.log("foundMessage", foundMessage);
      return _.pick(foundMessage, [
        "id",
        "sender",
        "body",
        "conversation",
        "createdAt",
        "updatedAt",
      ]);
    });

    const interlocutor = await userQueries.findUser({
      id: interlocutorId,
    });

    const { firstName, lastName, displayName, id, avatar } = interlocutor;

    res.send({
      messages,
      interlocutor: {
        firstName,
        lastName,
        displayName,
        id,
        avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

// + +
module.exports.getPreview = async (req, res, next) => {
  const {
    tokenData: { userId },
  } = req;

  console.log("GET PREVIEW userId", userId);

  try {
    // 1 variant - using Eager Loading
    // const conversations = (await Conversation.findAll({
    //   where: {
    //     participants: {
    //       [Op.contains]: [userId]
    //     }
    //   },
    //   include: {
    //     model: Message,
    //     order: [['createdAt', 'DESC']],
    //     limit: 1,
    //     attributes: [
    //       'sender', ['body', 'text'], 'createdAt'
    //     ],
    //   },
    //   attributes: [
    //     'id', 'participants', 'favoriteList', 'blackList'
    //   ],
    // })).map(res => {
    //   const {dataValues, dataValues: {Messages}} = res;
    //   const conversation = _.omit({...dataValues, ...Messages[0].dataValues}, [
    //     'Messages'
    //   ]);

    //   return conversation;
    // });

    // console.log('conversations', conversations);

    // 2 variant - using Lazy Loading (Magic methods)
    const conversations = await Conversation.findAll({
      where: {
        participants: {
          [Op.contains]: [userId],
        },
      },
      attributes: ["id", "participants", "favoriteList", "blackList"],
    }).then(async (results) => {
      const msgs = [];

      for (const result of results) {
        const foundMessage = await result.getMessages({
          order: [["createdAt", "DESC"]],
          attributes: ["sender", ["body", "text"], "createdAt"],
          limit: 1,
          raw: true,
        });

        const newMsg = { ...result.dataValues, ...foundMessage[0] };
        msgs.push(newMsg);
      }

      return msgs;
    });

    const interlocutors = [];
    conversations.forEach((conversation) => {
      interlocutors.push(conversation.participants.find((participant) => participant !== userId));
    });

    const senders = await User.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ["id", "firstName", "lastName", "displayName", "avatar"],
    });

    conversations.forEach((conversation) => {
      senders.forEach((sender) => {
        const {
          dataValues: { id, firstName, lastName, displayName, avatar },
        } = sender;

        if (conversation.participants.includes(id)) {
          conversation.interlocutor = {
            id,
            firstName,
            lastName,
            displayName,
            avatar,
          };
        }
      });
    });

    res.send(conversations);
  } catch (err) {
    next(err);
  }
};

// + +
module.exports.blackList = async (req, res, next) => {
  const {
    body: { blackListFlag, participants },
    tokenData: { userId },
  } = req;

  try {
    const foundConversation = await Conversation.findOne({
      where: { participants },
      raw: true,
    });

    const foundParticipantIndex = foundConversation.participants.indexOf(userId);

    const newBlackList = foundConversation.blackList.map((i, index) =>
      index === foundParticipantIndex ? blackListFlag : i
    );

    const [chatCount, [chat]] = await Conversation.update(
      { blackList: newBlackList },
      {
        where: { participants },
        returning: true,
        raw: true,
      }
    );

    res.send(chat);

    const interlocutorId = participants.filter((participant) => participant !== userId)[0];

    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.send(err);
  }
};

// + +
module.exports.favoriteList = async (req, res, next) => {
  const {
    body: { favoriteFlag, participants },
    tokenData: { userId },
  } = req;

  try {
    const foundConversation = await Conversation.findOne({
      where: { participants },
      raw: true,
    });

    const foundParticipantIndex = foundConversation.participants.indexOf(userId);

    const newFavoriteList = foundConversation.favoriteList.map((i, index) =>
      index === foundParticipantIndex ? favoriteFlag : i
    );

    const [chatCount, [chat]] = await Conversation.update(
      { favoriteList: newFavoriteList },
      {
        where: { participants },
        returning: true,
        raw: true,
      }
    );

    res.send(chat);
  } catch (err) {
    res.send(err);
  }
};

// + +
module.exports.createCatalog = async (req, res, next) => {
  const {
    body: { catalogName, chatId },
    tokenData: { userId },
  } = req;

  try {
    const { dataValues: catalog } = await Catalog.create({
      userId,
      catalogName,
      chats: [chatId],
    });

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

// + +
module.exports.updateNameCatalog = async (req, res, next) => {
  const {
    query: { catalogName },
    params: { catalogId: id },
    tokenData: { userId },
  } = req;

  try {
    const [catalogCount, [catalog]] = await Catalog.update(
      { catalogName },
      {
        where: { id, userId },
        returning: true,
        raw: true,
      }
    );

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

// + +
module.exports.addNewChatToCatalog = async (req, res, next) => {
  const {
    params: { catalogId: id, chatId },
    tokenData: { userId },
  } = req;

  console.log('id, chatId', id, chatId);

  try {
    const { chats } = await Catalog.findOne({
      where: { id, userId },
      raw: true,
      attributes: ["chats"],
    });

    chats.push(chatId);

    const [catalogCount, [catalog]] = await Catalog.update(
      { chats },
      {
        where: { id, userId },
        returning: true,
        raw: true,
      }
    );

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

// + +
module.exports.removeChatFromCatalog = async (req, res, next) => {
  const {
    params: { catalogId: id, chatId },
    tokenData: { userId },
  } = req;

  try {
    const { chats } = await Catalog.findOne({
      where: { id, userId },
      raw: true,
      attributes: ["chats"],
    });

    const newChats = chats.filter((chat) => chat !== +chatId);

    const [catalogCount, [catalog]] = await Catalog.update(
      { chats: newChats },
      {
        where: { id, userId }, // test
        returning: true,
        raw: true,
      }
    );

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

// + +
module.exports.deleteCatalog = async (req, res, next) => {
  const {
    params: { catalogId: id },
    tokenData: { userId },
  } = req;

  console.log("req.params", req.params);
  console.log("req.body", req.body);

  try {
    await Catalog.destroy({
      where: {
        id,
        userId,
      },
    });

    res.end();
  } catch (err) {
    next(err);
  }
};

// + +
module.exports.getCatalogs = async (req, res, next) => {
  const {
    tokenData: { userId },
  } = req;

  try {
    const catalogs = await Catalog.findAll({
      where: {
        userId,
      },
      raw: true,
      attributes: ["id", "catalogName", "chats"], // alternate variant
    });

    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
