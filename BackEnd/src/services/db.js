const mysql = require('mysql')

const config = require ("../config/config")

const dbconnect = mysql.createConnection({
    host: config.envs['APP_DBHOST'],
    user: config.envs['APP_DBUSER'],
    password: config.envs['APP_DBPASSWORD'],
    database: config.envs['APP_DB']
})
dbconnect.connect(function (err) {
    if (err) {
        console.log(err)
        console.log("une erreur est survenue")
    } else {
        console.log("Connecté à la base de données MySQL!")
    }
})
module.exports = {

    dbconnect

}

