require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./src/api/Routes/Route");
const app = express();
const multer = require("multer");
app.use(express.json());
app.use(cors());
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
