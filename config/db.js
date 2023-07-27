const dotenv = require("dotenv");
dotenv.config();
const { Sequelize } = require("sequelize");

// Connection parameters
const sequelize = new Sequelize(
  process.env.dbName,
  process.env.dbUsername,
  process.env.dbPassword,
  {
    host: process.env.dbHost,
    port: process.env.dbPort,
    dialect: "postgres",
    dialectOptions: {
      useUTC: true,
    },
  }
);

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sq: sequelize, testDbConnection };
