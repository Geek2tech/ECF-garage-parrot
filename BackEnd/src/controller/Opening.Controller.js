
const {suppressSpecialChar} = require("../helpers/fieldControl");
const paginatedResult = require("../helpers/paginatedSelectQuery");

async function updateOpenningHours(req,res) {
    const database = require('../services/db')
    const request = req.body
    const morningHours = suppressSpecialChar(request.morning_open) + " - " + suppressSpecialChar(request.morning_close)
    const afternoonHours =  suppressSpecialChar(request.afternoon_open) + " - " + suppressSpecialChar(request.afternoon_close)
    console.log(morningHours + " - " + afternoonHours)
    const query = "UPDATE ParrotDB.opening_hours SET morning = ? , afternoon = ?  WHERE day = ? "
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

async function getOpeningHours (req,res) {
    const table = 'opening_hours'
    const query = `SELECT * FROM ${table}`

    paginatedResult(req, res,table,query)
}

module.exports ={
    updateOpenningHours,
    getOpeningHours
}