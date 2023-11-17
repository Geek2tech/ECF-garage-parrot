const paginatedResult = require("../helpers/paginatedSelectQuery");
const logger = require('../services/Logger')
function getProfil(req,res) {

    try {
        const query = `SELECT * FROM profils`

        logger.log({
            level:'info',
            module:'Profil',
            message:`Call getProfil`
        })
        paginatedResult(req, res,query)

    }catch (err) {
        logger.log({
            level:'error',
            module:'Profil',
            message:`Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }



}

module.exports = {
    getProfil
}