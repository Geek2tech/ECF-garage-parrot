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
  function paginatedResult(req, res, table, query) {

    // connexion à la base de données

    const database = require('../services/db')

    // on récupère le nombre total de lignes

    let countQuery = `SELECT COUNT(*) AS TOTAL from ${table}`
       database.dbconnect.query(countQuery, (err, rows) => {
        if (err) {
            res.status(500)
            res.send("une erreur est survenu " + err)
        }

        const totalRowsNumber = rows[0]['TOTAL']

        // on récupère les résultats

        dbQuery = ` SELECT * from ${table}`
        database.dbconnect.query(query, (err, rows) => {

            //construction des limites d'affichage, si pas précisé on utilise 1 pour la page et le nombre de ligne en limit

            let page = parseInt(req.query.page)
            let limit = parseInt(req.query.limit)
            if (!limit) limit = rows.length
            if (!page)  page = 1

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

            res.send(results)
        })
    })

}

module.exports = paginatedResult
