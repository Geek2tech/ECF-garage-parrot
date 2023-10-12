const logger = require('../services/Logger')
const paginatedResult = require("../helpers/paginatedSelectQuery")

/**
 * @function
 * @description return list of tranmission types
 * @param req
 * @param res return paginated result
 * @return {Promise<void>}
 */
async function getTransmission(req,res) {
    const table = 'transmission_types'
    const query = `SELECT * FROM ${table}`

    logger.log({
        level:'info',
        module:'Transmisssion',
        message:`Call getTransmission`
    })


    paginatedResult(req,res,table,query)

}

module.exports ={
    getTransmission
}