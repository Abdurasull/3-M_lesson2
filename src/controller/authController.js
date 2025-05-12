const moment = require("moment");
const sha256 = require("sha256");
const avatarFileName = require("../utils/FileNames");
const serverConfig = require("../config");
const { generateToken } = require("../lib/jwt");
const authController = {
    login: async (req, res) => {
        res.status(200).json({
            message: "user login in successfully",
            data: {
                token: generateToken(req.user),
                userInfo: {
                    id: req.user.id,
                    name: req.user.name,
                    email: req.user.email,
                    avatar: req.user.avatar,
                }
                
            },
            status: 200,
        })
        
    },
    register: async (req, res) => {
        
        
        const data = req.body;
        const filename = avatarFileName(req);
        req.files.avatar.mv(serverConfig.fileAvatarPath(filename))
        
        const users = await req.readFile('users.json');

        const id = users.length ? users.at(-1).id + 1 : 1;
        const newUser = {
            id: id,
            name: data.name,
            email: data.email,
            password: sha256(data.password),
            avatar: "/images/" + filename,
            createdAt: moment().format('YYYY:MM:DD HH:mm'),
            updatedAt: null
        }

        users.push(newUser);
        await req.writeFile('users.json', users);

        res.status(201).json({
            message: 'User registered successfully',
            status: 201,
            user: newUser,
        });
    },

    index: async (req, res) => {
        res.send('Index page');
    },
}
module.exports = authController;