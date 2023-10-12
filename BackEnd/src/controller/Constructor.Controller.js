const {suppressSpecialChar} = require("../helpers/fieldControl");
const paginatedResult = require("../helpers/paginatedSelectQuery")
const logger = require('../services/Logger')

/**
 * @function
 * @description add a constructor in the database
 * @param req request with constructor_name
 * @param res response
 * @return response and id of the insert
 */
async function addConstructor(req, res) {
    const database = require('../services/db')

    const constructorName = suppressSpecialChar(req.body.constructor_name)

    logger.log({
        level: 'info',
        module: 'Constructor',
        message: `Call addConstructor with params : ${constructorName}`
    })

    const query = `INSERT INTO constructor (constructor_name)
                   VALUES (?)`

    logger.log({
        level:'info',
        module:'Constructor',
        message:'BDD request'
    })

    await database.dbconnect.query(query, [constructorName], (err, result) => {
        if (err) {
            logger.log({
                level: 'error',
                module: 'Constructor',
                message: `SQL error : ${err.sqlMessage}`
            })
            res.status(500)
            res.send(err.sqlMessage)

        } else {
            logger.log({
                level: 'info',
                module: 'Constructor',
                message: `Insert successfully with id : ${result.insertId}`
            })
            res.status(201)
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
    const query = `SELECT *
                   FROM ${table}`

    logger.log({
        level: 'info',
        module: 'Constructor',
        message: 'Call getConstructor'
    })

    paginatedResult(req, res, table, query)
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
    const constructorName = suppressSpecialChar(req.body.constructorName)
    const newValue = suppressSpecialChar(req.body.newValue)

    logger.log({
        level: 'info',
        module: 'Constructor',
        message: `Call updateContructor with param : ${constructorName} , ${newValue}`
    })

    const query = "UPDATE constructor SET constructor_name = ?  WHERE constructor_name = ? "

    logger.log({
        level:'info',
        module:'Constructor',
        message:'BDD request'
    })

    await database.dbconnect.query(query, [newValue, constructorName], (err, result) => {
        if (err) {

            logger.log({
                level: 'error',
                module: 'Constructor',
                message: `Update Error : ${err}`
            })

            res.status(500)
            res.send('Erreur lors de la mise à jour ' + err)

        } else {


            if (result.affectedRows === 0) {

                logger.log({
                    level:'info',
                    module:'Constructor',
                    message:`Nothing to update : ${result.message}`
                })

                res.status(204)
                res.send("aucun élément à supprimer")
            } else {

                logger.log({
                    level:'info',
                    module:'Constructor',
                    message:`Update successfully : ${result.message}`
                })

                res.status(200)
                res.send(result.message)
            }


        }
    })
}


module.exports = {
    addConstructor,
    getContructor,
    updateConstructor,
}