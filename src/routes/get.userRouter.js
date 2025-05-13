const express = require('express');
const jwtValedator = require('../meddlewares/jwtValedator');
const getUserController = require('../controller/getUserController');
const getUserRouter = express.Router();

getUserRouter.get("/user", jwtValedator, getUserController);

module.exports = getUserRouter;