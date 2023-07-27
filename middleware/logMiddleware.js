const { decode } = require("jsonwebtoken");
const LogMessage = require("../models/LogMessage");

exports.logger = async (req, res, next) => {
  try {
    let message = "";
    const token = req.get("auth");

    message = message.concat(`IP Address: '${req.socket.remoteAddress}' | `);

    if (token) {
      const currentUser = jwt.decode(token);
      if (currentUser) {
        message = message.concat(
          `Current User: ${JSON.stringify(currentUser)} | `
        );
      }
    }

    message = message.concat(`Request Path: '${req.originalUrl}' | `);
    message = message.concat(`Request Method: '${req.method}' | `);
    message = message.concat(`Request Body: '${JSON.stringify(req.body)}' | `);

    console.log("message: ", message);

    await LogMessage.create({ message: message });

    next();
  } catch (e) {
    next();
  }
};
