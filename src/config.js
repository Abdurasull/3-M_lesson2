const config = require("config");
const {join} = require("path");
const serverConfig = {
    PORT: config.get("PORT"),
    dbPath: (filename) => join(process.cwd(), 'db', filename),
    avatarSize: config.get("AVATAR_SIZE"),
    fileAvatarPath: (filename) => join(process.cwd(), "uploads", "images", filename),
    JWT_KEY: config.get("SECRET_KEY")
}

module.exports = serverConfig;