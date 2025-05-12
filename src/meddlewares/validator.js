
const serverConfig = require("../config");
const { ClientError, globalError } = require("../utils/error");
const sha256 = require("sha256");


const valedatorRegister = async (req, res, next) => {
    try{
        const data = req.body;        

        console.log(req.files);
        
        if(req.files.avatar.size > serverConfig.avatarSize * 1024 * 1024) throw new ClientError("Avatar size is too large", 400);  

        const users = await req.readFile('users.json');
        
        const user = users.find(user => user.email == data.email);
        if(user) throw new ClientError("User already exists", 400);

        next();
}catch(err) {
    globalError(err, res);
}
};

const valedatorLogin = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        const users = await req.readFile("users.json");
        const user = users.find(user => user.email == email && user.password == sha256(password));
        req.user = user;
        if(!user) throw new ClientError("Invalid email or password", 400);
    
        next();
    }catch(err){
        globalError(err, res);

    }
}
module.exports = {valedatorRegister, valedatorLogin};
