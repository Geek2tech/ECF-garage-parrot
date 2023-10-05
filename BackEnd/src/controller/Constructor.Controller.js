const {suppressSpecialChar} = require("../helpers/fieldControl");
const paginatedResult = require("../helpers/paginatedSelectQuery")

function addConstructor(req, res) {
    const database = require('../services/db')
    const request = req.body

    const query = `INSERT INTO constructor (constructor_name)
                   VALUES (?)`

    database.dbconnect.query(query, [suppressSpecialChar(request.name)], (err, result) => {
        if (err) {

            res.status(500)
            res.send(err.sqlMessage)

        } else {

            res.send("ok : " + result.insertId)


        }
    })
}

function constructorList(req, res) {

    const table = 'constructor'
    const query = `SELECT * FROM ${table}`

    paginatedResult(req, res,table,query)
}

function constructorUpdate(req, res) {
    const database = require('../services/db')
    const request = req.body
    const query = "UPDATE ParrotDB.constructor SET constructor_name = ?  WHERE constructor_id = ? "
    database.dbconnect.query(query, [suppressSpecialChar(request.newValue), suppressSpecialChar(request.id)], (err, result) => {
        if (err) {
            console.log('Erreur lors de la mise à jour ' + err)
            res.status(500)

        } else {
            res.status(200)
            res.send(result.message)

        }
    })
}






module.exports = {
    addConstructor,
    constructorList,
    constructorUpdate,
     }