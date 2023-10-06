const paginatedResult = require("../helpers/paginatedSelectQuery");

function getProfil(req,res) {

    const table = 'profils'
    const query = `SELECT * FROM ${table}`

    paginatedResult(req, res,table,query)

}

module.exports = {
    getProfil
}