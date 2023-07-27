const express = require("express");
const { body, validationResult, param } = require("express-validator");

const messageController = require("../controllers/message");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.put(
  "/message/:messageId",
  param("messageId").notEmpty().withMessage("Message Id is required"),
  body("content").notEmpty().withMessage("Message content is required"),
  authMiddleware.authenticatedUser,
  messageController.putEditMessage
);

router.post(
  "/message",
  body("receiverId").notEmpty().withMessage("Receiver Id is required"),
  body("content").notEmpty().withMessage("Content is required"),
  authMiddleware.authenticatedUser,
  messageController.postNewMessage
);

router.delete(
  "/message/:messageId",
  param("messageId").notEmpty().withMessage("Message Id is required"),
  authMiddleware.authenticatedUser,
  messageController.deleteMessage
);

router.get(
  "/message",
  body("userId").notEmpty().withMessage("Receiver Id is required"),
  body("before").optional(),
  body("count").optional().isNumeric(),
  body("sort").optional(),
  authMiddleware.authenticatedUser,
  messageController.getMessageHistory
);

module.exports = router;
