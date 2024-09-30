require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./src/api/Routes/Route");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", router);

mongoose
  .connect("mongodb://127.0.0.1:27017/lms-app")
  .then(() => {
    app.listen(5000, () => {
      console.log("server is running at port @5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
