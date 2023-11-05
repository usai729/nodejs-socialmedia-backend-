const mongoose = require("mongoose");

const Chat = new mongoose.Schema({
  of: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  with: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const ChatModel = mongoose.model("Chat", Chat);

const messages = new mongoose.Schema({
  chat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  content: [
    {
      message: {
        type: String,
      },
      sent: {
        type: Date,
        default: Date.now,
        timestamp: true,
      },
    },
  ],
});
const MessagesModel = mongoose.model("Message", messages);

module.exports = {
  Chat: ChatModel,
  Message: MessagesModel,
};
