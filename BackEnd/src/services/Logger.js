const winston = require('winston')
const dailyRotateFile = require('winston-daily-rotate-file')
const now = new Date()
const time =now.getHours() + ":" + now.getMinutes() + ':' + now.getSeconds()


const logger = winston.createLogger({



    level:'info',
    format: winston.format.json(),
    label:time,

    transports: [
        new dailyRotateFile({
            filename : './log/error-%DATE%.log',
            datePattern:'YYYY-MM-DD',
            zippedArchive :true,
            maxSize:'20m',
            maxFiles :'14d',
            level:'error'
        }),
        new dailyRotateFile({
            filename : './log/combined-%DATE%.log',
            datePattern:'YYYY-MM-DD',
            label: time,
            zippedArchive :true,
            maxSize:'20m',
            maxFiles :'14d',

        }),

    ],
})






if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format:winston.format.simple()
    }))
}

module.exports = logger