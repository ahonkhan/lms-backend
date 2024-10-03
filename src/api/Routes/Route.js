const { Router } = require("express");
const AuthRouter = require("./AuthRoutes");

const router = Router();

router.use("/auth", AuthRouter);

module.exports = router;
