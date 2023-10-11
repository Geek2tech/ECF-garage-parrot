
const {suppressSpecialChar} = require("../helpers/fieldControl");
const paginatedResult = require("../helpers/paginatedSelectQuery");
const logger = require('../services/Logger')
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

    logger.log({
        level:'info',
        module:'Openning Hour',
        message:`Call updateOpenningHours with params : ${morningHours} , ${afternoonHours}`
    })


    const query = "UPDATE opening_hours SET morning = ? , afternoon = ?  WHERE day = ? "
    await database.dbconnect.query(query, [morningHours ,afternoonHours,
        suppressSpecialChar(request.day)], (err, result) => {
        if (err) {

            logger.log({
                level: 'error',
                module: 'Opening Hours',
                message: `Update Error : ${err}`
            })


            res.status(500)
            res.send('Erreur lors de la mise à jour ' + err)

        } else {

            if (result.affectedRows === 0) {

                logger.log({
                    level:'info',
                    module:'Openning Hours',
                    message:`Nothing to update : ${result.message}`
                })

                res.status(204)
                res.send("aucun élément à supprimer")
            } else {

                logger.log({
                    level:'info',
                    module:'Opening Hours',
                    message:`Update successfully : ${result.message}`
                })

                res.status(200)
                res.send(result.message)
            }

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

    logger.log({
        level:'info',
        module:'Opening Hours',
        message:'Call getOpeningHours'
    })

    paginatedResult(req, res,table,query)
}

module.exports ={
    updateOpenningHours,
    getOpeningHours
}