require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Client } = require("pg");

const { sq, testDbConnection } = require("./config/db");
const User = require("./models/User");
const Message = require("./models/Message");
const LogMessage = require("./models/LogMessage");

const logMiddleware = require("./middleware/logMiddleware");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const messageRoutes = require("./routes/message");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(logMiddleware.logger);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use("/api", authRoutes);
app.use("/api", usersRoutes);
app.use("/api", messageRoutes);

User.hasMany(Message, {
  foreignKey: {
    name: "senderId",
  },
});
// Message.belongsTo(User);

User.hasMany(Message, {
  foreignKey: {
    name: "receiverId",
  },
});
// Message.belongsTo(User);

async function initialize() {
  try {
    let canMakeConnection = false;
    const client = new Client({
      host: process.env.dbHost,
      user: process.env.dbUsername,
      password: process.env.dbPassword,
      port: process.env.dbPort,
    });

    await client.connect();

    const res = await client.query(
      `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${process.env.dbName}'`
    );

    if (res.rowCount === 0) {
      console.log(`${process.env.dbName} database not found, creating it.`);
      const dbCreated = await client.query(
        `CREATE DATABASE "${process.env.dbName}";`
      );
      console.log(`created database ${process.env.dbName}`);
      if (dbCreated) {
        canMakeConnection = true;
      }
    } else {
      console.log(`${process.env.dbName} database exists.`);
      canMakeConnection = true;
    }

    if (canMakeConnection) {
      sq.sync({
        // force: true,
      })
        .then(() => {
          console.log("synced");
          app.listen(3000);
        })
        .catch((e) => {
          console.log("error in sync: ", e);
        });
    }
  } catch (e) {
    console.log(e);
  }
}

initialize();
