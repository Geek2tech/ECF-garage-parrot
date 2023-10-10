const database = require("../services/db");

/**
 * @function
 * @description supprime un élément en base en fonction d'une seule condition where
 * @param res response donnant le résultat de l'execution de la requete
 * @param table
 * @param whereField champs de la condition where
 * @param whereValue valeur de la condition where
 * @return {Promise<void>}
 */
async function deleteItem(res,table,whereField,whereValue) {
    const database = require('../services/db')

    const  query = `DELETE FROM ${table} where ${whereField} = ? `

    await database.dbconnect.query(query, [whereValue], (err, result) => {
        if (err) {

            res.status(500)
            res.send(err.sqlMessage + err.sql)

        } else {
if (result.affectedRows === 0 ){
    res.send("aucun élément à supprimer")
}else {
    res.send("Suppression ok " )
}



        }
    })

}

module.exports = deleteItem


