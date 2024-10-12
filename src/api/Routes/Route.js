const { Router } = require("express");
const userRouter = require("./UserRouter");
const authRouter = require("./AuthRouter");
const adminRouter = require("./AdminRouter");
const Auth = require("../Middlewares/Auth");
const Admin = require("../Middlewares/Admin");
const publicRouter = require("./PublicRouter");

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/admin", Auth, Admin, adminRouter);
router.use("/public", publicRouter);

module.exports = router;
