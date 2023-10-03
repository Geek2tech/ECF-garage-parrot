const mysql = require('mysql')

const connexion = mysql.createConnection({
    host: "srvbdd",
    user: "parrotuser",
    password: "m2VXn8MZfAeFYy6DjsubEt",
    database: "ParrotDB"
})
connexion.connect(function (err) {
    if (err) {
        console.log(err)
        console.log("une erreur est survenue")
    } else {
        console.log("Connecté à la base de données MySQL!")
    }
})
module.exports = {

    connexion

}

