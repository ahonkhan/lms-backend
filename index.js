require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./src/api/Routes/Route");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const app = express();
const userAgent = require("./src/api/Middlewares/UserAgent");
const path = require("path");
const EnrollController = require("./src/api/Controllers/EnrollController");
app.use(express.json());

app.use(cors());
app.use("/static", express.static(path.join(__dirname, "uploads")));

app.use(userAgent);
app.use("/api", router);
app.post("/payment/init", EnrollController.redirect);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const db_url = process.env.db_url;

mongoose
  .connect(db_url)
  .then(() => {
    app.listen(5000, () => {
      console.log("server is running at port @5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
