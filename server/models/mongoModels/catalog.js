const mongoose = require('mongoose');
const { Schema } = mongoose;

const catalogSchema = new Schema({
  userId: {
    type: 'Number',
    required: true
  },
  catalogName: {
    type: 'String',
    required: true
  },
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: false,
      unique: false
    }
  ]
});

const Catalog = mongoose.model('Catalog', catalogSchema);
module.exports = Catalog;
