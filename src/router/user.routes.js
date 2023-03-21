const express = require("express");
const router = express.Router();
const {
  register,
  All,
  login,
  Detail,
  update,
  logout,
} = require("../controller/user.controller");
const jwtAuth = require("../middleware/auth.middleware");
const avatarUpload = require("../middleware/multer.middleware");

router
  .post("/register", register)
  .post("/login", login)
  .get("/", jwtAuth, All)
  .get("/:id", Detail)
  .put("/offline/:id", logout)
  .put("/:id", avatarUpload.single("avatar"), update);

module.exports = router;
