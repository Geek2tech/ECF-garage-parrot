const paginatedResult = require("../helpers/paginatedSelectQuery");
const {suppressSpecialChar} = require("../helpers/fieldControl");

/**
 * @function
 * @description get the fuel list from database
 * @param req request with optional ?page=X&limit=X
 * @param res response
 * @return paginated list of constructor
 */
function getFuel (req,res) {

    const table = 'fuels'
    const query = `SELECT * FROM ${table}`

    paginatedResult(req, res,table,query)
}


/**
 * @function
 * @description add a fuel in the database
 * @param req request with fuel_name
 * @param res response
 * @return response and id of the insert
 */
function makeFuel (req,res) {

    const database = require('../services/db')
    const request = req.body

    const query = `INSERT INTO fuels (fuel_name)
                   VALUES (?)`

    database.dbconnect.query(query, [suppressSpecialChar(request.fuel_name)], (err, result) => {
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
 * @description Update a fuel in the database
 * @param req request with id of the fuel to update and new name ( newValue)
 * @param res response
 * @return response message
 */
function updateFuel(req,res) {

    const database = require('../services/db')
    const request = req.body
    const query = "UPDATE ParrotDB.fuels SET fuel_name = ?  WHERE fuel_id = ? "
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
    getFuel,
    makeFuel,
    updateFuel
}