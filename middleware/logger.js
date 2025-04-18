const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../server.log');

const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${req.method} ${req.url}\n`;
    
    fs.appendFile(logFile, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
    
    next();
};

module.exports = logger; 