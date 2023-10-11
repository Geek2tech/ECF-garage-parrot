const paginatedResult = require("../helpers/paginatedSelectQuery");
const {suppressSpecialChar} = require("../helpers/fieldControl");
const deleteItem = require('../helpers/deleteItem')
const logger = require('../services/Logger')


/**
 * @function
 * @description Retourne la liste des services
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function getServices(req, res) {
    const table = 'services'
    const query = `SELECT *
                   FROM ${table}`
    logger.log({
        level: 'info',
        module: 'Services',
        message: `Call getServices with param :  ${table}`
    })

    paginatedResult(req, res, table, query)
}

/**
 * @function
 * @description mise à jour d'un service
 * @param req request avec les paramètres json : Name - newValue - description
 * @param res
 * @return
 */
async function updateServices(req, res) {
    const database = require('../services/db')

    const serviceName = suppressSpecialChar(req.body.name)
    const newValue = suppressSpecialChar(req.body.newValue)
    const serviceDescription = suppressSpecialChar(req.body.description)
    const query = "UPDATE services SET service_name = ? , service_description = ?  WHERE service_name = ? "

    logger.log({
        level: 'info',
        module: 'Services',
        message: `Call updateServices with param ${serviceName} , ${newValue} , ${serviceDescription} `
    })

    await database.dbconnect.query(query, [newValue, serviceDescription, serviceName], (err, result) => {
        if (err) {

            logger.log({
                level: 'error',
                module: 'Services',
                message: `Update Error : ${err}`
            })
            res.status(500)
            res.send('Erreur lors de la mise à jour ' + err)

        } else {

            if (result.affectedRows === 0) {

                logger.log({
                    level: 'info',
                    module: 'Services',
                    message: `Nothing to update : ${result.message}`
                })

                res.status(204)
                res.send("aucun élément à supprimer")
            } else {

                logger.log({
                    level: 'info',
                    module: 'Services',
                    message: `Update successfully : ${result.message}`
                })

                res.status(200)
                res.send(result.message)
            }

        }
    })
}

/**
 * @function
 * @description Ajout un nouveau service
 *
 * @param req requete avec les données name et description
 * @param res response renvoi le résultat de la requete et l'id du nouveau service
 * @return
 */
async function addServices(req, res) {

    const database = require('../services/db')
    const serviceName = suppressSpecialChar(req.body.name)
    const serviceDescription = suppressSpecialChar(req.body.description)

    logger.log({
        level: 'info',
        module: 'Services',
        message: `Call addServices with params : ${serviceName} , ${serviceDescription}`
    })

    const query = `INSERT INTO services (service_name, service_description)
                   VALUES (?, ?)`

    await database.dbconnect.query(query, [serviceName, serviceDescription], (err, result) => {
        if (err) {
            logger.log({
                level: 'error',
                module: 'Services',
                message: `SQL error : ${err.sqlMessage}`
            })
            res.status(500)
            res.send(err.sqlMessage)

        } else {
            logger.log({
                level: 'info',
                module: 'Services',
                message: `Insert successfull : id = ${result.insertId}`
            })
            res.status(201)
            res.send("ok : " + result.insertId)


        }
    })
}

async function deleteServices(req, res) {
    const table = "services"
    const whereField = "service_name"
    const whereValue = req.body.whereValue

    logger.log({
        level: 'info',
        module: 'Services',
        message: `Call deleteServices with params : ${table} , ${whereField} , ${whereValue} `
    })

    deleteItem(res, table, whereField, whereValue)
}

module.exports = {
    getServices,
    updateServices,
    addServices,
    deleteServices
}