const  express = require("express");
const registerSchema = require("../meddlewares/JOI");
const authController = require("../controller/authController");
const {valedatorRegister, valedatorLogin} = require("../meddlewares/validator");

const authRouter = express.Router();

authRouter.post("/register", registerSchema, valedatorRegister, authController.register);
authRouter.post("/login", valedatorLogin, authController.login);


module.exports = authRouter;