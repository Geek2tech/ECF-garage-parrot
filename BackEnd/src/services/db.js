const mysql = require('mysql')

const dbconnect = mysql.createConnection({
    host: process.env.APP_DBHOST,
    user: process.env.APP_DBUSER,
    password: process.env.APP_DBPASSWORD,
    database: process.env.APP_DB
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

