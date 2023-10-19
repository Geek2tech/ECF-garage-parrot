/**
 * @function
 * @description return paginated result for sql request
 *
 * @param req request with optional ?page=X&limit=X
 * @param res response
 * @param table table to query
 * @param query sql query
 * @return {object}  number of rows ,if exist the number of previous and next page  and the result of the query
 */
const logger = require('../services/Logger')
const database = require("../services/db");

async function paginatedResult(req, res,  query) {
try {

    logger.log({
        level: 'info',
        module: 'paginatedSelectQuery',
        message: `Call paginatedResult with params : ${query} `
    })

    // connexion à la base de données

    const database = require('../services/db')


    // on récupère les résultats


    logger.log({
        level: 'info',
        module: 'paginatedSelectQuery',
        message: 'BDD request'
    })


    database.dbconnect.query(query, (err, rows) => {

        if (err) {
            logger.log({
                level:'error',
                module:'paginatedSelectQuery',
                message:`SQL error : ${err}`
            })
            res.status(500)
            res.send(`SQL error : ${err}`)
        }

        //construction des limites d'affichage, si pas précisé on utilise 1 pour la page et le nombre de ligne en limit
        // on récupère le nombre total de lignes
        const totalRowsNumber = rows.length
        let page = parseInt(req.query.page)
        let limit = parseInt(req.query.limit)
        if (!limit) limit = rows.length
        if (!page) page = 1

        //construction des index d'affichage

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        // construction du résultat

        const results = {}
        results.rows = rows.length
        results.pages = Math.ceil(totalRowsNumber / limit)

        if (endIndex < rows.length) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {

            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        // découpe des résultats pour renvoyer uniquement les résultats de la page demandée

        results.results = rows.slice(startIndex, endIndex)

        // envoie du resultat
        logger.log({
            level: 'info',
            module: 'paginatedSelectQuery',
            message: `Process ok : ${results.rows} results in ${results.pages} pages`
        })
        res.send(results)
    })
}catch (err) {
    logger.log({
        level:'error',
        module:'Cars',
        message:`internal error ${err}`
    })

    return res.status(500).send(`Erreur interne ${err}`)


}





}

module.exports = paginatedResult
