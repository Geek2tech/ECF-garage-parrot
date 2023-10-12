const winston = require('winston')
const dailyRotateFile = require('winston-daily-rotate-file')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'HH:mm:ss'
        }),
        winston.format.simple()
    ),
    exitOnError: false,

    transports: [
        new dailyRotateFile({
            filename: './log/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error'
        }),
        new dailyRotateFile({
            filename: './log/combined-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',

        }),

    ],
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize({
                all: true
            })
        )
    }))
}

module.exports = logger