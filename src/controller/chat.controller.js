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
  
   deleteChat: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { id: sender } = req.decoded;

      const result = await chatModel.deleteChat(id, sender);

      if (result.rowCount === 0) {
        return next(new createError.NotFound());
      }
      res.json({
        msg: "chat berhasil dihapus",
        data: {
          chatId: id,
        },
      });
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = chatController;
