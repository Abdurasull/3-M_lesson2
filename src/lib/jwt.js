const jwt = require('jsonwebtoken');

const config = require("config");
const { globalError } = require('../utils/error');
const serverConfig = require('../config');
const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name
    };
    const token = jwt.sign(payload, serverConfig.JWT_KEY, {
        expiresIn: "1h"
});
    return token;
};
const verifyToken = (token) => {
    try{
        const decoded = jwt.verify(token, config.get("SECRET_KEY"));
        return decoded;
    }catch(err){
        globalError(err, res);
    }
}

module.exports = {
    generateToken,
    verifyToken
}