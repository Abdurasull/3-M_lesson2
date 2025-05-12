const avatarFileName = (req) => {
    return Date.now() + req.files.avatar.name;
}
module.exports = avatarFileName;