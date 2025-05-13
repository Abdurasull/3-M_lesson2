const { globalError } = require("../utils/error")

const getUserController = async (req, res) => {
    try{
        const user = req.user;
        
        if(!user) throw new ClientError("User not found", 404);
        
        const users = await req.readFile("users.json");      
        
        res.status(200).json({
            status: 200,
            message: "Success",
            data: {
                user: user,
                users: users.filter(user => user.id != req.user.id)
            }
        });
    }catch(err){
        globalError(err, res);
    }
};

module.exports = getUserController;