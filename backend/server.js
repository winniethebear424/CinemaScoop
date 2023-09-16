

const mongoose = require("mongoose");
const app = require("./src/app.js");


//get the port from the env files.
const port = process.env.PORT || 3000;
//get the DB connection string from the env files.
const DB = process.env.DATABASE;
//connecnt the db
mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});

const server = app.listen(port, () => {
  console.log(`App run on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("unhandled rejection! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log("unhandled exception! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});


