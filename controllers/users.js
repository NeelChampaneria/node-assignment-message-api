const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const User = require("../models/User");

exports.getUsersList = async (req, res, next) => {
  try {
    const currentUser = jwt.decode(req.get("auth"));
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      where: {
        id: {
          [Op.ne]: currentUser.id,
        },
      },
    });

    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong",
      err: err,
    });
  }
};
