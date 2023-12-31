
const {suppressSpecialChar} = require("../helpers/fieldControl");
const paginatedResult = require("../helpers/paginatedSelectQuery");
const logger = require('../services/Logger')
const database = require("../services/db");
/**
 * @function
 * @description Mise à jour des horaires d'ouverture
 * @param req request avec le détails des horaires ( morning_open , morning_close ,afternoon_open,afternoon_close and day )
 * @param res
 * @return {Promise<void>}
 */
async function updateOpenningHours(req,res) {

    try {

        const request = req.body
        let morningHours = ""
        let afternoonHours = ""
        if (suppressSpecialChar(request.morning_open) === 'fermé') {
            morningHours = 'fermé'
        }else {
           morningHours = suppressSpecialChar(request.morning_open) + "h - " + suppressSpecialChar(request.morning_close) + "h"

        }
        if (suppressSpecialChar(request.afternoon_open) === 'fermé') {
             afternoonHours = 'fermé'
        }else {
             afternoonHours =  suppressSpecialChar(request.afternoon_open) + "h - " + suppressSpecialChar(request.afternoon_close) + "h"

        }

        logger.log({
            level:'info',
            module:'Openning Hour',
            message:`Call updateOpenningHours with params : ${morningHours} , ${afternoonHours}`
        })


        const query = "UPDATE opening_hours SET morning = ? , afternoon = ?  WHERE day = ? "

        logger.log({
            level:'info',
            module:'Opening Hour',
            message:'BDD request'
        })


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

    }catch (err) {
        logger.log({
            level:'error',
            module:'Opening',
            message:`Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }

}

/**
 * @function
 * @description retourne la liste des horaires d'ouverture paginés
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function getOpeningHours (req,res) {

    try {
        const query = `SELECT * FROM opening_hours WHERE morning !="fermé" or afternoon !="fermé"`

        logger.log({
            level:'info',
            module:'Opening Hours',
            message:'Call getOpeningHours'
        })

        paginatedResult(req, res,query)
    }catch (err) {
        logger.log({
            level:'error',
            module:'Opening',
            message:`Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }

    }
async function geAllOpeningHours (req,res) {

    try {
        const query = `SELECT * FROM opening_hours `

        logger.log({
            level:'info',
            module:'Opening Hours',
            message:'Call getOpeningHours'
        })

        paginatedResult(req, res,query)
    }catch (err) {
        logger.log({
            level:'error',
            module:'Opening',
            message:`Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }

}



module.exports ={
    updateOpenningHours,
    getOpeningHours,
    geAllOpeningHours
}