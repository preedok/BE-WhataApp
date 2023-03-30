const express = require("express");
const { AllChat, deleteChat } = require("../controller/chat.controller");
const jwtAuth = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/:id", jwtAuth, AllChat);
router.delete("/:id", jwtAuth, deleteChat);

module.exports = router;
