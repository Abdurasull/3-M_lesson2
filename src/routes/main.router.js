const express = require('express');
const authRouter = require('./auth.routers');

const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);

module.exports = mainRouter;