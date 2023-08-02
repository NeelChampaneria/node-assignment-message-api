const express = require("express");
const { query } = require("express-validator");

const logController = require("../controllers/log");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    LogBody:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        message:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

/**
 * @swagger
 * tags:
 *  name: Log
 */

/**
 * @swagger
 * /api/log:
 *  get:
 *    summary: Get logs
 *    security:
 *      - bearerAuth: []
 *    tags: [Log]
 *    parameters:
 *      - in: query
 *        name: StartTime
 *        schema:
 *          type: string
 *        description: Date Time (Optional, By default start time is (current time - 5 minutes))
 *        example: 2023-07-27T15:03:15.504Z
 *      - in: query
 *        name: EndTime
 *        schema:
 *          type: string
 *        description: Date Time (Optional, By default end time is current time)
 *        example: 2023-08-02T11:59:35.957Z
 *    responses:
 *      200:
 *          description: Successful
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/LogBody'
 *      401:
 *        description: Unauthorized
 *        content:
 *            applicationn/json:
 *              schema:
 *                $ref: '#/components/schemas/SimpleMsgObject'
 *      404:
 *        description: Log Not Found
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

router.get(
  "/log",
  query("StartTime").optional(),
  query("EndTime").optional(),
  authMiddleware.authenticatedUser,
  logController.getLogs
);

module.exports = router;
