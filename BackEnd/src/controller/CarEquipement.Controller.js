const logger = require('../services/Logger')
const {suppressSpecialChar} = require("../helpers/fieldControl");
const paginatedSelectQuery = require('../helpers/paginatedSelectQuery')



/**
 * @function
 * @description Get list of equipement for a car
 * @param req request with car_id in body
 * @param res
 * @return {Promise<void>}
 */
async function getCarEquipements(req, res) {

    try {
        const car_id = suppressSpecialChar(req.body.car_id)

        logger.log({
            level: 'info',
            module: 'CarEquipement',
            message: `Call getCarEquipement with params : ${car_id}  `
        })

        const query = `SELECT equipement_name
                   FROM car_equipements_view
                   WHERE car_id = ${car_id}`

        paginatedSelectQuery(req, res, query)


    }catch (err) {
        logger.log({
            level:'error',
            module:'CarEquipements',
            message:`Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }

}

/**
 * @function
 * @description Add a car equipement
 * @param req request with car_id and equipement_id
 * @param res
 * @return {Promise<void>}
 */
async function addCarEquipements(req, res) {

    try {
        const car_id = suppressSpecialChar(req.body.car_id)
        const equipement_id = suppressSpecialChar(req.body.equipement_id)

        logger.log({
            level: 'info',
            module: 'CarEquipement',
            message: `Call addCarEquipements with params : ${car_id} , ${equipement_id}`
        })

        const database = require('../services/db')
        const query = 'INSERT INTO cars_equipements (car_id , equipement_id) VALUES ( ? , ? )'

        logger.log({
            level: 'info',
            module: 'CarEquipement',
            message: 'Bdd Request'
        })

        database.dbconnect.query(query, [car_id, equipement_id], (err, result) => {
            if (err) {

                if (err.code === 'ER_DUP_ENTRY') {
                    logger.log({
                        level: 'error',
                        module: 'carEquipement',
                        message: 'Element déja existant'
                    })
                    res.status(204)
                    res.send('duplication entry')
                } else {
                    logger.log({
                        level: 'error',
                        module: 'CarEquipement',
                        message: `INSERT Error : ${err.code}`

                    })
                    res.status(500)
                    res.send(`INSERT Error : ${err}`)
                }


            } else {
                logger.log({
                    level: 'info',
                    module: 'CarEquipement',
                    message: `INSERT OK `
                })
                res.status(201)
                res.send(`ok`)
            }
        })

    }catch (err) {
        logger.log({
            level:'error',
            module:'CarEquipements',
            message:`Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }



}

/**
 * @function
 * @description suppress car_equipement
 * @param req request with car_id and equipement_id
 * @param res
 * @return {Promise<void>}
 */
async function deleteCarEquipements(req, res) {

    try {

        const car_id = suppressSpecialChar(req.body.car_id)
        const equipement_id = suppressSpecialChar(req.body.equipement_id)

        logger.log({
            level:'info',
            module:'CarEquipements',
            message:`Call deleteCarEquipement with params : ${car_id} , ${equipement_id}`
        })

        const database = require('../services/db')
        const query = 'DELETE FROM cars_equipements WHERE car_id = ? and equipement_id = ?'

        logger.log({
            level:'info',
            module:'CarEquipement',
            message:'BDD request'
        })

        await database.dbconnect.query(query,[car_id,equipement_id],(err,result) => {

            if (err) {
                logger.log({
                    level:'error',
                    module:'CarEquipement',
                    message:`Suppress failed error : ${err}`
                })
                res.status(500)
                res.send(`Suppress failed : ${err}`)
            }else {
                logger.log({
                    level:'info',
                    module:'CarEquipement',
                    message:`Suppress successfully : ${result.message}`
                })
                res.status(200)
                res.send('Suppression ok')
            }


        })


    }catch (err) {
        logger.log({
            level:'error',
            module:'CarEquipements',
            message:`Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }

}

module.exports = {
    getCarEquipements,
    addCarEquipements,
    deleteCarEquipements
}