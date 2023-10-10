
const {suppressSpecialChar} = require("../helpers/fieldControl");
const paginatedResult = require("../helpers/paginatedSelectQuery");

/**
 * @function
 * @description Mise à jour des horaires d'ouverture
 * @param req request avec le détails des horaires ( morning_open , morning_close ,afternoon_open,afternoon_close and day )
 * @param res
 * @return {Promise<void>}
 */
async function updateOpenningHours(req,res) {
    const database = require('../services/db')
    const request = req.body
    const morningHours = suppressSpecialChar(request.morning_open) + " - " + suppressSpecialChar(request.morning_close)
    const afternoonHours =  suppressSpecialChar(request.afternoon_open) + " - " + suppressSpecialChar(request.afternoon_close)
    console.log(morningHours + " - " + afternoonHours)
    const query = "UPDATE opening_hours SET morning = ? , afternoon = ?  WHERE day = ? "
    await database.dbconnect.query(query, [morningHours ,afternoonHours,
        suppressSpecialChar(request.day)], (err, result) => {
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

/**
 * @function
 * @description retourne la liste des horaires d'ouverture paginés
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function getOpeningHours (req,res) {
    const table = 'opening_hours'
    const query = `SELECT * FROM ${table}`

    paginatedResult(req, res,table,query)
}

module.exports ={
    updateOpenningHours,
    getOpeningHours
}