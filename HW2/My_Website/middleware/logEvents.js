const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

//create a log event with date, time, uuid and message
const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {    
        //if logs dir does not exist, create dir.
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        //append will create logName if it does not exist
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

//custom middleware logger
const logger = (req, res, next) => {    
    console.log(`${req.method}\t${req.headers.origin}\t${req.url}`);
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt');
    next();
};

module.exports = {logger, logEvents};