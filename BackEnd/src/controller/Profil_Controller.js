const paginatedResult = require("../helpers/paginatedSelectQuery");
const logger = require('../services/Logger')
function getProfil(req,res) {

    const table = 'profils'
    const query = `SELECT * FROM ${table}`

    logger.log({
        level:'info',
        module:'Profil',
        message:`Call getProfil`
    })
    paginatedResult(req, res,table,query)

}

module.exports = {
    getProfil
}