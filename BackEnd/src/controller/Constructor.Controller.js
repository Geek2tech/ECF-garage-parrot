const {suppressSpecialChar} = require("../helpers/fieldControl");
const paginatedResult = require("../helpers/paginatedSelectQuery")

/**
 * @function
 * @description add a constructor in the database
 * @param req request with constructor_name
 * @param res response
 * @return response and id of the insert
 */
async function addConstructor(req, res) {
    const database = require('../services/db')
    const request = req.body

    const query = `INSERT INTO constructor (constructor_name)
                   VALUES (?)`

    await database.dbconnect.query(query, [suppressSpecialChar(request.contructor_name)], (err, result) => {
        if (err) {

            res.status(500)
            res.send(err.sqlMessage)

        } else {

            res.send("ok : " + result.insertId)


        }
    })
}

/**
 * @function
 * @description get the constructor list from database
 * @param req request with optional ?page=X&limit=X
 * @param res response
 * @return paginated list of constructor
 */
async function getContructor(req, res) {

    const table = 'constructor'
    const query = `SELECT * FROM ${table}`

    paginatedResult(req, res,table,query)
}

/**
 * @function
 * @description Update a constructor in the database
 * @param req request with id of the constructor to update and new name ( newValue)
 * @param res response
 * @return response message
 */
async function updateConstructor(req, res) {
    const database = require('../services/db')
    const request = req.body
    const query = "UPDATE constructor SET constructor_name = ?  WHERE constructor_id = ? "
    await database.dbconnect.query(query, [suppressSpecialChar(request.newValue), suppressSpecialChar(request.id)], (err, result) => {
        if (err) {
            console.log('Erreur lors de la mise à jour ' + err)
            res.status(500)
            res.send('Erreur lors de la mise à jour ' + err)

        } else {
            res.status(200)
            res.send(result.message)

        }
    })
}






module.exports = {
    addConstructor,
    getContructor,
    updateConstructor,
     }