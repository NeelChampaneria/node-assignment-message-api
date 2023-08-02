const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const logMessage = require("../models/LogMessage");

exports.getLogs = async (req, res, next) => {
  try {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      res.status(400).json(validationError);
    } else {
      const defaultStartTime = req.query.StartTime
        ? req.query.StartTime
        : new Date(Date.now() - 1000 * (60 * 5));
      const defaultEndTime = req.query.EndTime
        ? req.query.EndTime
        : new Date(Date.now());
      const logs = await logMessage.findAll({
        where: {
          createdAt: {
            [Op.between]: [defaultStartTime, defaultEndTime],
          },
        },
        order: [["createdAt", "ASC"]],
      });

      if (logs.length > 0) {
        res.status(200).send(logs);
      } else {
        res.status(404).json({ message: "No logs found", logs });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err: err,
    });
  }
};
