const mysql = require('mysql')
const logger = require('./Logger')

logger.log({
    level:'info',
    module:'DB',
    message:'Call DB service'
})

const dbconnect = mysql.createConnection({
    host: process.env.APP_DBHOST,
    user: process.env.APP_DBUSER,
    password: process.env.APP_DBPASSWORD,
    database: process.env.APP_DB,
    multipleStatements: false
})

module.exports = {

    dbconnect

}

