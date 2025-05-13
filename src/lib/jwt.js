const jwt = require('jsonwebtoken');

const config = require("config");
const { globalError, ClientError } = require('../utils/error');
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
        
        const decoded = jwt.verify(token, serverConfig.JWT_KEY, (err, decoded) => {
            if (err) {
              throw new ClientError("Token noto‘g‘ri yoki muddati o‘tgan", 401);
            } 
            
            
            return decoded;
          });
          return decoded;
        
    }catch(err){        
        globalError(err, res);
    }
}

module.exports = {
    generateToken,
    verifyToken
}