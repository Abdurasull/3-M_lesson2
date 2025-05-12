const path = require('path');
const fs = require(`fs/promises`);
const serverConfig = require('../config');

const model = async (req, res,  next) => {
    req.readFile = async (filename) => {
        const data = await fs.readFile(serverConfig.dbPath(filename), 'utf-8');
        
        return JSON.parse(data);
    },
    req.writeFile = async (filename, data) => {
        await fs.writeFile(serverConfig.dbPath(filename), JSON.stringify(data, null, 4));
    }
    next();
}

module.exports = model;