const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { Op } = require("sequelize");

const User = require("../models/User");

exports.postRegister = async (req, res, next) => {
  try {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      res.status(400).json(validationError);
    } else {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const userExists = await User.findOne({
        where: { email: { [Op.eq]: email } },
      });

      if (userExists) {
        res.status(409).json({
          message:
            "Email is already registered. Please use different email to register.",
        });
      } else {
        const user = await User.create({
          name: name,
          email: email,
          password: hashedPassword,
        });
        res
          .status(200)
          .json({ userId: user.id, name: user.name, email: user.email });
      }
    }
  } catch (err) {
    if (err) {
      res.status(400).json({ err: err });
    }
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      res.status(400).json(validationError);
    } else {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        res.status(400).json({ message: "User doesn't exist" });
      } else {
        const dbPassword = user.password;

        const passwordValid = await bcrypt.compare(password, dbPassword);

        if (!passwordValid) {
          res.status(401).json({ message: "Password incorrect" });
        } else {
          const userDataToSign = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          const accessToken = sign(
            userDataToSign,
            "Who_I'd_be_if_I_was_happy?"
          );

          res.status(200).json({ token: accessToken, profile: userDataToSign });
        }
      }
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
