const cleaner = require('../helpers/fieldControl')
const {suppressSpecialChar} = require("../helpers/fieldControl");
function addConstructor(req, res) {
    const database = require('../services/db')
    const request = req.body

    const query = `INSERT INTO constructor (constructor_name)
                   VALUES ("${suppressSpecialChar(request.name)}") `

    database.dbconnect.query(query, (err, result) => {
        if (err) {

            res.status(500)
            res.send(err.sqlMessage)
        } else {

            res.send("ok : " + result.insertId)

        }
    })
}

function constructorList(req, res) {

    const database = require('../services/db')
    const query = "SELECT * FROM constructor"
    database.dbconnect.query(query, (err, result) => {
        if (err) {
            console.log('erreur de récupération des données : ' + err)
            res.status(500)
            res.send("ko : " + err)
        } else {
            res.status(200)
            res.send(result)
        }
    })
}

function constructorUpdate(req,res)  {
    const database = require('../services/db')
    const request =  req.body
    const query = `UPDATE ParrotDB.constructor SET constructor_name = "${suppressSpecialChar(request.newValue)}"  WHERE constructor_id = ${suppressSpecialChar(request.id)}`
    database.dbconnect.query(query, (err , result) => {
        if (err) {
            console.log('Erreur lors de la mise à jour ' + err)
            res.status(500)
        }else {
            res.status(200)
            res.send(result.message)
        }
    })
}


module.exports = {
    addConstructor,
    constructorList,
    constructorUpdate
}