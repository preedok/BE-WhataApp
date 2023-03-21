const response = require("../helper/response.helper");
const createError = require("http-errors");

const chatModel = require("../model/chat.model");

const chatController = {
  AllChat: async (req, res, next) => {
    try {
      const { id: receiver } = req.params;
      const { id: sender } = req.decoded;

      const { rows: chats } = await chatModel.all(sender, receiver);
      res.json({
        msg: "all chat berhasil",
        data: chats,
      });
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = chatController;
