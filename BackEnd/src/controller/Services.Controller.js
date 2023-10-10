const paginatedResult = require("../helpers/paginatedSelectQuery");
const {suppressSpecialChar} = require("../helpers/fieldControl");
const deleteItem = require('../helpers/deleteItem')


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

    await database.dbconnect.query(query, [newValue, serviceDescription, serviceName], (err, result) => {
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

    const query = `INSERT INTO services (service_name, service_description)
                   VALUES (?, ?)`

    await database.dbconnect.query(query, [serviceName, serviceDescription], (err, result) => {
        if (err) {

            res.status(500)
            res.send(err.sqlMessage)

        } else {

            res.send("ok : " + result.insertId)


        }
    })
}

async function deleteServices(req, res) {
    const table = "services"
    const whereField = "service_name"
    const whereValue = req.body.whereValue

    deleteItem(res, table, whereField, whereValue)
}

module.exports = {
    getServices,
    updateServices,
    addServices,
    deleteServices
}