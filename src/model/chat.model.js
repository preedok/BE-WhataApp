const pool = require("../config/db");

const chatModel = {
  newChat: ({ sender, receiver, message }) => {
    return pool.query(
      `
    INSERT INTO messages (sender, receiver, message)
    VALUES ($1, $2, $3)        
    `,
      [sender, receiver, message]
    );
  },

  all: (sender, receiver) => {
    return pool.query(
      `
        SELECT * FROM messages
        WHERE (sender = $1 AND receiver = $2)
        OR (sender = $3 AND receiver = $4)
        `,
      [sender, receiver, receiver, sender]
    );
  },
  
   deleteChat: (chatId, sender) => {
    return pool.query(
      `
      DELETE FROM messages
      WHERE message_id = $1 AND sender = $2
      `,
      [chatId, sender]
    );
  },
};

module.exports = chatModel;
