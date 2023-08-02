const jwt = require("jsonwebtoken");

exports.authenticatedUser = async (req, res, next) => {
  try {
    const accessToken = req.get("Authorization");

    if (!accessToken) {
      res.status(401).json({ message: "Unauthorized Access" });
    } else {
      const validateToken = jwt.verify(
        accessToken,
        "Who_I'd_be_if_I_was_happy?"
      );

      if (validateToken) {
        return next();
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
