const { sq } = require("../config/db");

const { DataTypes, Sequelize } = require("sequelize");

const LogMessage = sq.define("logMessage", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = LogMessage;
