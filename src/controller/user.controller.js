const { v4: uuid } = require("uuid");
const { hash, compare } = require("bcryptjs");
const createError = require("http-errors");

const userModel = require("../model/user.model");
const generateToken = require("../helper/auth.helper");
const response = require("../helper/response.helper");
const cloudinary = require("../helper/cloudinary");

const userController = {
  register: async (req, res, next) => {
    try {
      const { fullname, email, phone, password } = req.body;

      const { rowCount: check } = await userModel.checkMail(email);

      if (check) {
        return next(createError(404, "email sudah ada"));
      }

      const id = uuid();
      const hashedPassword = await hash(password, 10);
      const date = new Date();

      const data = {
        id,
        fullname,
        email,
        phone,
        password: hashedPassword,
        date,
      };

      await userModel.register(data);

      delete data.password;

      response(res, data, 200, "register succcess");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const result = await userModel.checkMail(email);
      const check = result.rowCount;

      if (!check) {
        return next(createError(404, "data tidak sesuai"));
      }

      const [user] = result.rows;

      const valid = await compare(password, user.password);

      if (!valid) {
        return next(createError(404, "data tidak sesuai"));
      }

      delete user.password;

      const payload = {
        id: user.user_id,
        name: user.fullname,
        email: user.email,
        phone: user.phone,
      };

      user.token = generateToken(payload);

      await userModel.Active(user.user_id);

      response(res, user, 200, "login success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  logout: async (req, res, next) => {
    try {
      const { id } = req.params;
      await userModel.nonActive(id);
      response(res, null, 200, "logout success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  All: async (req, res, next) => {
    try {
      const { id } = req.decoded;
      console.log(id);
      const user = await userModel.getAll(id);

      response(res, user.rows, 200, "get user success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  Detail: async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        rows: [user],
      } = await userModel.detailUser(id);

      response(res, user, 200, "get detail success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { fullname, username, phone, bio } = req.body;
      const date = new Date();
      let avatar = null;

      if (req.file) {
        avatar = await cloudinary.uploader.upload(req.file.path);
      }

      const data = {
        id,
        fullname,
        username,
        phone,
        bio,
        file: avatar.url,
        date,
      };

      console.log(data);

      await userModel.update(data);

      const user = await userModel.detailUser(id);

      response(res, user, 200, "update succcess");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = userController;
