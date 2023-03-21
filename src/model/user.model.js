const pool = require("../config/db");

const userModel = {
  register: (data) => {
    return pool.query(
      `
        INSERT INTO users (user_id, fullname, email, phone, password, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
      [data.id, data.fullname, data.email, data.phone, data.password, data.date]
    );
  },

  checkMail: (email) => {
    return pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  },

  Active: (id) => {
    return pool.query(`UPDATE users SET status = 1 WHERE user_id = $1`, [id]);
  },

  nonActive: (id) => {
    return pool.query(`UPDATE users SET status = 0 WHERE user_id = $1`, [id]);
  },

  getAll: (id) => {
    return pool.query("SELECT * FROM users WHERE user_id <> $1", [id]);
  },

  detailUser: (id) => {
    return pool.query(`SELECT * FROM users WHERE user_id = $1`, [id]);
  },

  update: (data) => {
    return pool.query(
      `
    UPDATE users SET 
    fullname = COALESCE($1, fullname),
    username = COALESCE($2, username),
    phone = COALESCE($3, phone),
    bio = COALESCE($4, bio),
    avatar  = COALESCE($5, avatar),
    updated_at = COALESCE($6, updated_at)
    WHERE user_id = $7
    `,
      [
        data.fullname,
        data.username,
        data.phone,
        data.bio,
        data.file,
        data.date,
        data.id,
      ]
    );
  },
};

module.exports = userModel;
