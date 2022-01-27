const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    participants: {
      type: [Number],
      required: true
    },
    blackList: {
      type: [Boolean],
      required: true
    },
    favoriteList: {
      type: [Boolean],
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;
