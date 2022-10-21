const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = 4000;

const connection = mongoose.connect("mongodb://localhost:27017/goMobit", {
  useNewUrlParser: true,
});
connection.then(
  (db) => {
    console.log("Connected");
  },
  (err) => {
    console.log(err);
  }
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRouter = require("./routes/users");
app.use("/", userRouter);
app.listen(port, () => {
  console.log("App is running on port: ", port);
});
