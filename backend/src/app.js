const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const { registerRoutes } = require("./routes/index.js");

//load the config file
dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

//routes

registerRoutes(app);

module.exports = app;
