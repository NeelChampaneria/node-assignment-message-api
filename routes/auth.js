const express = require("express");
const { body, validationResult } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    RegisterReqBody:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *
 *    LoginReqBody:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *
 *    RegisterSuccess:
 *      type: object
 *      required:
 *        - userId
 *        - name
 *        - email
 *      properties:
 *        userId:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *      example:
 *        userId: "1234-3456-5678-7890"
 *        name: "John"
 *        email: "john@mailinator.com"
 *
 *    LoginSuccess:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *        profile:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *            name:
 *              type: string
 *            email:
 *              type: string
 *
 *    ValidationObject:
 *      type: object
 *      properties:
 *        "type":
 *          type: string
 *        msg:
 *          type: string
 *        path:
 *          type: string
 *        location:
 *          type: string
 *
 *    SimpleMsgObject:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 */

/**
 *  @swagger
 *  /api/register:
 *    post:
 *      tags: [Auth]
 *      summary: Register new user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterReqBody'
 *      responses:
 *        200:
 *          description: Successfull registration
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RegisterSuccess'
 *        409:
 *          description: Email already registered
 *          content:
 *            applicationn/json:
 *              schema:
 *                $ref: '#/components/schemas/SimpleMsgObject'
 *        400:
 *          description: Validation Error
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ValidationObject'
 */

router.post(
  "/register",
  body("name", "Name is required").notEmpty(),
  body("email", "Valid email is required").notEmpty().isEmail(),
  body("password", "Password is required").notEmpty(),
  authController.postRegister
);

/**
 *  @swagger
 *  /api/login:
 *    post:
 *      tags: [Auth]
 *      summary: Login user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginReqBody'
 *      responses:
 *        200:
 *          description: Successfull Login
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LoginSuccess'
 *        401:
 *          description: Incorrect password
 *          content:
 *            applicationn/json:
 *              schema:
 *                $ref: '#/components/schemas/SimpleMsgObject'
 *        400:
 *          description: Validation Error
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ValidationObject'
 */

router.post(
  "/login",
  body("email")
    .notEmpty()
    .withMessage("Valid email is required")
    .isEmail()
    .withMessage("Please enter valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must have minimum length of 6"),
  authController.postLogin
);

module.exports = router;
