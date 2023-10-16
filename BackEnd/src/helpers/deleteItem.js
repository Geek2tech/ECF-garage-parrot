const logger = require('../services/Logger')

/**
 * @function
 * @description supprime un élément en base en fonction d'une seule condition where
 * @param res response donnant le résultat de l'execution de la requete
 * @param table name of table
 * @param whereField where condition field
 * @param whereValue where condition value
 * @return {Promise<void>}
 */
async function deleteItem(res, table, whereField, whereValue) {
    const database = require('../services/db')

    const query = `DELETE
                   FROM ${table}
                   where ${whereField} = ? `

    logger.log({
        level: 'info',
        module: 'DeleteItems',
        message: `Call deleteItem with params : ${table} , ${whereField} , ${whereValue}`
    })

    await database.dbconnect.query(query, [whereValue], (err, result) => {
        if (err) {

            logger.log({
                level:'error',
                module:'DeleteItems',
                message:`SQL error : ${err.sqlMessage}`
            })

            res.status(500)
            res.send(err.sqlMessage)

        } else {
            if (result.affectedRows === 0) {

                logger.log({
                    level:'info',
                    module:'DeleteItems',
                    message:`Nothing to update : ${result.message}`
                })

                res.status(204)
                res.send("aucun élément à supprimer")
            } else {

                logger.log({
                    level:'info',
                    module:'DeleteItems',
                    message:`Delete successfully : ${result.message}`
                })

                res.status(200)
                res.send("Suppression ok ")
            }


        }
    })

}

module.exports = deleteItem


