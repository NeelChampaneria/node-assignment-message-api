const express = require("express");
const { body, validationResult } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  body("name", "Name is required").notEmpty(),
  body("email", "Valid email is required").notEmpty().isEmail(),
  body("password", "Password is required").notEmpty(),
  authController.postRegister
);

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
