const { verifyToken } = require("../lib/jwt");
const { globalError } = require("../utils/error")

const jwtValedator = (req, res, next) => {
    try{
        
        const token = req.headers.authorization.split(" ")[1];
        
        
        const decoded = verifyToken(token);
        
        req.user = decoded;
        
        next();

    }catch(err){
        globalError(err, res);
    }
};

module.exports = jwtValedator;