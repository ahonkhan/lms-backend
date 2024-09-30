const { Router } = require("express");
const userRouter = require("./UserRoutes");

const router = Router();

router.use("/users", userRouter);

module.exports = router;
