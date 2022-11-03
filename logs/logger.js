const winston = require('winston')


const infoLogger = winston.createLogger({
    transports : [
        new winston.transports.Console({ level:'info'}),
    ]
 })




 const warnLogger = winston.createLogger({
    level: 'warn',
    transports : [
        new winston.transports.Console({ level:'warn'}),
        new winston.transports.File({ filename: 'warn.log', level:'warn'}),
    ]
 })



 const errorLogger = winston.createLogger({
    transports : [
        new winston.transports.Console({ level:'error'}),
        new winston.transports.File({ filename: 'error.log', level:'error'}),
    ]
 })


 module.exports = { infoLogger, warnLogger, errorLogger }