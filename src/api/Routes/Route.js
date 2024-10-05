const { Router } = require("express");
const userRouter = require("./UserRouter");
const authRouter = require("./AuthRouter");

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;
