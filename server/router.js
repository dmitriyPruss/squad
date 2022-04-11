const { Router } = require("express");
const contestRouter = require("./routes/contestRouter");
const userRouter = require("./routes/userRouter");
const chatRouter = require("./routes/chatRouter");
const offerRouter = require("./routes/offerRouter");

const router = Router();

router.use("/users", userRouter);
router.use("/contests", contestRouter);
router.use("/chats", chatRouter);
router.use("/offers", offerRouter);

module.exports = router;
