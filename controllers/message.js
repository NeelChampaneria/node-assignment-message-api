const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const User = require("../models/User");
const Message = require("../models/Message");

exports.postNewMessage = async (req, res, next) => {
  try {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      res.status(400).json(validationError);
    } else {
      const currentUser = jwt.decode(req.get("Authorization"));
      const { receiverId, content } = req.body;
      const message = await Message.create({
        senderId: currentUser.id,
        receiverId: receiverId,
        content: content,
      });
      res.status(200).json({
        messageId: message.id,
        senderId: message.senderId,
        receiverId: message.receiverId,
        content: message.content,
        timestamp: message.createdAt,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err: err,
    });
  }
};

exports.putEditMessage = async (req, res, next) => {
  try {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      res.status(400).json(validationError);
    } else {
      const currentUser = jwt.decode(req.get("Authorization"));
      const messageId = req.params.messageId;
      const { content } = req.body;

      const message = await Message.findByPk(messageId);

      if (!message) {
        res.status(404).json({ message: "Message not found" });
      } else {
        if (message.senderId !== currentUser.id) {
          res
            .status(401)
            .json({ message: "You have no access to edit message" });
        } else {
          message.content = content;
          await message.save();

          res.status(200).json({ message: "Message edited successfully" });
        }
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err: err,
    });
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty) {
      res.status(400).json(validationError);
    } else {
      const currentUser = jwt.decode(req.get("Authorization"));
      const messageId = req.params.messageId;

      const message = await Message.findByPk(messageId);

      if (!message) {
        res.status(404).json({ message: "Message not found" });
      } else {
        if (message.senderId !== currentUser.id) {
          res
            .status(401)
            .json({ message: "You have no access to edit message" });
        } else {
          await message.destroy();

          res.status(200).json({ message: "Message deleted successfully" });
        }
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err: err,
    });
  }
};

exports.messageHistory = async (req, res, next) => {
  try {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      res.status(400).json(validationError);
    } else {
      const currentUser = jwt.decode(req.get("Authorization"));
      const { userId, before, count, sort } = req.body;

      const messages = await Message.findAll({
        where: {
          senderId: { [Op.in]: [currentUser.id, userId] },
          receiverId: { [Op.in]: [userId, currentUser.id] },
          createdAt: {
            [Op.lt]: before ? before : Date.now(),
            // "2023-07-27 14:48:00.000 +00:00",
            // new Date("25 July 2023 14:48 UTC")
          },
        },
        order: [["createdAt", sort === "DESC" ? sort : "ASC"]],
        limit: count ? count : 20,
      });

      res.status(200).json({ messages: messages });
    }
  } catch (err) {
    res.status(500).json({ messages: "Something went wrong", err: err });
  }
};
