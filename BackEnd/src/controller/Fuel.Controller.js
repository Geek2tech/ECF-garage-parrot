const paginatedResult = require("../helpers/paginatedSelectQuery");
const {suppressSpecialChar} = require("../helpers/fieldControl");
const logger = require("../services/Logger");
const database = require("../services/db");

/**
 * @function
 * @description get the fuel list from database
 * @param req request with optional ?page=X&limit=X
 * @param res response
 * @return paginated list of constructor
 */
function getFuel(req, res) {

    try {
        const query = `SELECT *
                   FROM fuels`

        logger.log({
            level: 'info',
            module: 'Fuel',
            message: `Call getFuel`
        })
        paginatedResult(req, res,query)

    }catch (err) {
        logger.log({
            level:'error',
            module:'Fuel',
            message:`Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }



}


/**
 * @function
 * @description add a fuel in the database
 * @param req request with fuel_name
 * @param res response
 * @return response and id of the insert
 */
function addFuel(req, res) {

    try {

        const database = require('../services/db')
        const fuel_name = suppressSpecialChar(req.body.fuel_name)

        logger.log({
            level: 'info',
            module: 'Fuel',
            message: `Call addFuel with params : ${fuel_name}`
        })

        const query = `INSERT INTO fuels (fuel_name)
                   VALUES (?)`

        logger.log({
            level:'info',
            module:'Fuel',
            message:'BDD request'
        })

        database.dbconnect.query(query, [fuel_name], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    logger.log({
                        level:'error',
                        module:'Fuel',
                        message:`Duplicate Entry`
                    })
                    res.status(204)
                    res.send('Entré déja existant')

                }else {
                    logger.log({
                        level: 'error',
                        module: 'Fuel',
                        message: `SQL error : ${err.sqlMessage}`
                    })
                    res.status(500)
                    res.send(err.sqlMessage)

                }




            } else {
                logger.log({
                    level: 'info',
                    module: 'Fuel',
                    message: `Insert successfully with id : ${result.insertId}`
                })
                res.status(201)
                res.send("ok : " + result.insertId)


            }
        })

    }catch (err) {
        logger.log({
            level:'error',
            module:'Fuel',
            message:`Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }



}

/**
 * @function
 * @description Update a fuel in the database
 * @param req request with id of the fuel to update and new name ( newValue)
 * @param res response
 * @return response message
 */
function updateFuel(req, res) {

    try {
        const database = require('../services/db')

        const fuelName = suppressSpecialChar(req.body.fuelName)
        const newValue = suppressSpecialChar(req.body.newValue)
        const query = "UPDATE ParrotDB.fuels SET fuel_name = ?  WHERE fuel_name = ? "

        logger.log({
            level:'info',
            module:'Fuel',
            message:'BDD request'
        })

        database.dbconnect.query(query, [newValue,fuelName], (err, result) => {
            if (err) {

                logger.log({
                    level: 'error',
                    module: 'Fuel',
                    message: `Update Error : ${err}`
                })

                res.status(500)
                res.send(`SQL error : ${err} `)

            } else {

                if (result.affectedRows === 0) {

                    logger.log({
                        level:'info',
                        module:'Fuel',
                        message:`Nothing to update : ${result.message}`
                    })

                    res.status(204)
                    res.send("aucun élément à supprimer")
                } else {

                    logger.log({
                        level:'info',
                        module:'Fuel',
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
            module:'Fuel',
            message:`Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }


}


module.exports = {
    getFuel,
    addFuel,
    updateFuel
}