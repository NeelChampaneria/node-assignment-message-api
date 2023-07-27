const { sq } = require("../config/db");

const { DataTypes, Sequelize } = require("sequelize");

const Message = sq.define("message", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Message;
