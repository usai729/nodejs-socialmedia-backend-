const { Chat, Message } = require("../Models/MessageModel");

exports.newchat = async (req, res) => {
  const { receiver } = req.body;

  let ChatExists = await Chat.findOne({
    $and: [{ of: req.user }, { with: receiver }],
  });

  if (ChatExists) {
    return res.json({
      errors: true,
      msg: "chat/exists",
    });
  }

  try {
    await Chat.create({
      of: req.user,
      with: receiver,
    })
      .then(async (r) => {
        console.log("created chat", r);

        let message = new Message({
          chat_id: r._id,
        });
        await message.save();

        return res.json({
          error: false,
          msg: "chat/created",
        });
      })
      .catch((e) => {
        console.log(e);

        res.json({
          errors: true,
          msg: e,
        });
      });
  } catch (error) {
    console.log(error);
    return res.json({ errors: true, msg: error });
  }
};

exports.sendmessage = async (req, res) => {
  const { content, chat_id } = req.body;

  let chat = await Message.findById(chat_id);

  if (!chat) {
    return res.json({
      errors: true,
      msg: "chat/not-exists",
    });
  }

  try {
    await chat.updateOne({
      $push: { content: { message: content } },
    });

    res.json({
      errors: false,
      msg: "message/sent",
    });
  } catch (e) {
    console.log("err", e);
    return res.json({
      errors: true,
      msg: e,
    });
  }
};

exports.getAllChats = async (req, res) => {
  var allChats = await Chat.find({ of: req.user }).populate({
    path: "with",
    model: "User",
    select: ["displayName", "dp"],
  });

  return res.json({
    errors: false,
    msg: allChats,
  });
};

exports.getChat = async (req, res) => {
  var { id } = req.params;

  if (!id) {
    return res.status(401).json({ errors: true, msg: "chat/invalid-id" });
  }

  try {
    const user = await Message.find({ chat_id: id }).populate({
      path: "chat_id",
      model: "Chat",
      populate: {
        path: "with",
        model: "User",
        select: ["displayName", "dp"],
      },
    });

    if (!user) {
      return res.json({ errors: true, msg: "chat/not-found" });
    }

    res.json({
      errors: false,
      msg: user,
    });
  } catch (e) {
    console.log("err", e);
    res.json({ errors: true, msg: e });
  }
};
