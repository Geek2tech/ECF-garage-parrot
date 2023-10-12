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
dbconnect.connect(function (err) {
    if (err) {

        logger.log({
            level:'error',
            module:'DB',
            message:`Erreur de connection ${err}`
        })


    } else {
        logger.log({
            level:'info',
            module:'DB',
            message:'Connected to BDD'
        })

    }
})
module.exports = {

    dbconnect

}

