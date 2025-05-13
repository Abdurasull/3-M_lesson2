const express = require('express');
const authRouter = require('./auth.routers');
const getUserRouter = require('./get.userRouter');

const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/get", getUserRouter);




module.exports = mainRouter;