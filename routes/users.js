const express = require("express");
const { body, validationResult } = require("express-validator");

const authMiddleware = require("../middleware/auth");

const userController = require("../controllers/users");

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 */

/**
 * @swagger
 * tags:
 *  name: User
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Get user list
 *    tags: [User]
 *    responses:
 *      200:
 *        description: List
 *        content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/User'
 */

router.get(
  "/users",
  authMiddleware.authenticatedUser,
  userController.getUsersList
);

module.exports = router;
