const express = require("express");
const { AllChat } = require("../controller/chat.controller");
const jwtAuth = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/:id", jwtAuth, AllChat);

module.exports = router;
