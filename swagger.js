const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Skillup API",
    description: "skillup",
  },
  host: "localhost:5000",
};

const outputFile = "./swagger.json";
const routes = ["./index.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc).then(() => {
  require("./index.js"); // Your project's root file
});
