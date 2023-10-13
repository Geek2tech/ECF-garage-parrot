const paginatedResult = require("../helpers/paginatedSelectQuery");
const logger = require('../services/Logger')
function getProfil(req,res) {


    const query = `SELECT * FROM profils`

    logger.log({
        level:'info',
        module:'Profil',
        message:`Call getProfil`
    })
    paginatedResult(req, res,query)

}

module.exports = {
    getProfil
}