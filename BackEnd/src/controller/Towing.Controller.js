const logger = require('../services/Logger')
const paginatedResult = require("../helpers/paginatedSelectQuery")

/**
 * @function
 * @description return towing liste
 * @param req
 * @param res return paginated list
 * @return {Promise<void>}
 */
async function getTowing(req,res) {

    const table = 'towing_modes'
    const query =  `SELECT * From ${table}`

    logger.log({
        level:'info',
        module:'Towing ',
        message:`Call getTowing with params : ${table} , ${query}`
    })

   await  paginatedResult(req,res,table,query)

}

module.exports = {
    getTowing
}