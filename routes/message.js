const express = require("express");
const { body, validationResult, param } = require("express-validator");

const messageController = require("../controllers/message");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    PostMessageReqBody:
 *      type: object
 *      properties:
 *        receiverId:
 *          type: string
 *        content:
 *          type: string
 *
 *    PostMessageSuccess:
 *      type: object
 *      properties:
 *        messageId:
 *          type: string
 *        senderId:
 *          type: string
 *        receiverId:
 *          type: string
 *        content:
 *          type: string
 *        timestamp:
 *          type: string
 *
 *    EditMessageReqBody:
 *      type: object
 *      properties:
 *        content:
 *          type: string
 *
 *    MessageHistoryReqBody:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *        before:
 *          type: string
 *        count:
 *          type: integer
 *        sort:
 *          type: string
 *      example:
 *        userId: "2b8b5f98-07ae-46ae-b055-e96675372cef"
 *        before: "2023-07-27T15:03:15.504Z (value returned by Date.now() in JS) (optional)"
 *        count: 3 (optional)
 *        sort: "ASC (value should be ASC or DESC) (optional)"
 *
 *    Message:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        content:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        senderId:
 *          type: string
 *        receiverId:
 *          type: string
 */

/**
 * @swagger
 * tags:
 *  name: Message
 */

/**
 * @swagger
 * /api/message/{messageId}:
 *  put:
 *    summary: Edit message
 *    tags: [Message]
 *    parameters:
 *      - in: path
 *        name: messageId
 *        schema:
 *          type: string
 *        required: true
 *        description: Message Id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/EditMessageReqBody'
 *    responses:
 *      200:
 *        description: Edited Successfully
 *        content:
 *            applicationn/json:
 *              schema:
 *                $ref: '#/components/schemas/SimpleMsgObject'
 *      401:
 *        description: Unauthorized
 *        content:
 *            applicationn/json:
 *              schema:
 *                $ref: '#/components/schemas/SimpleMsgObject'
 *      404:
 *        description: Message Not Found
 *        content:
 *            applicationn/json:
 *              schema:
 *                $ref: '#/components/schemas/SimpleMsgObject'
 *      400:
 *          description: Validation Error
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ValidationObject'
 */

router.put(
  "/message/:messageId",
  param("messageId").notEmpty().withMessage("Message Id is required"),
  body("content").notEmpty().withMessage("Message content is required"),
  authMiddleware.authenticatedUser,
  messageController.putEditMessage
);

/**
 * @swagger
 * /api/message:
 *  post:
 *    summary: New message
 *    tags: [Message]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostMessageReqBody'
 *
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *            applicationn/json:
 *              schema:
 *                $ref: '#/components/schemas/PostMessageSuccess'
 *      400:
 *          description: Validation Error
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ValidationObject'
 */

router.post(
  "/message",
  body("receiverId").notEmpty().withMessage("Receiver Id is required"),
  body("content").notEmpty().withMessage("Content is required"),
  authMiddleware.authenticatedUser,
  messageController.postNewMessage
);

/**
 * @swagger
 * /api/message/{messageId}:
 *  delete:
 *    summary: Delete message
 *    tags: [Message]
 *    parameters:
 *      - in: path
 *        name: messageId
 *        schema:
 *          type: string
 *        required: true
 *        description: Message Id
 *    responses:
 *      200:
 *        description: Deleted Successfully
 *        content:
 *            applicationn/json:
 *              schema:
 *                $ref: '#/components/schemas/SimpleMsgObject'
 *      401:
 *        description: Unauthorized
 *        content:
 *            applicationn/json:
 *              schema:
 *                $ref: '#/components/schemas/SimpleMsgObject'
 *      404:
 *        description: Message Not Found
 *        content:
 *            applicationn/json:
 *              schema:
 *                $ref: '#/components/schemas/SimpleMsgObject'
 *      400:
 *          description: Validation Error
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ValidationObject'
 */

router.delete(
  "/message/:messageId",
  param("messageId").notEmpty().withMessage("Message Id is required"),
  authMiddleware.authenticatedUser,
  messageController.deleteMessage
);

/**
 * @swagger
 * /api/messages:
 *  post:
 *    summary: Get message history
 *    tags: [Message]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MessageHistoryReqBody'
 *
 *    responses:
 *      200:
 *        description: Deleted Successfully
 *        content:
 *            applicationn/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Message'
 *      400:
 *          description: Validation Error
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ValidationObject'
 */
router.post(
  "/messages",
  body("userId").notEmpty().withMessage("Receiver Id is required"),
  body("before").optional(),
  body("count").optional().isNumeric(),
  body("sort").optional(),
  authMiddleware.authenticatedUser,
  messageController.messageHistory
);

module.exports = router;
