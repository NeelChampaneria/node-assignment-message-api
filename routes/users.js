const express = require("express");
const { body, validationResult } = require("express-validator");

const authMiddleware = require("../middleware/auth");

const userController = require("../controllers/users");

const router = express.Router();

router.get(
  "/users",
  authMiddleware.authenticatedUser,
  userController.getUsersList
);

module.exports = router;
