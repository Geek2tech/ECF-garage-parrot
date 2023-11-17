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
    try {
        const query = `SELECT * FROM transmission_types`

        logger.log({
            level:'info',
            module:'Transmisssion',
            message:`Call getTransmission`
        })


        paginatedResult(req,res,query)
    }catch (err) {
        logger.log({
            level:'error',
            module:'Transmission',
            message:`Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }



}

module.exports ={
    getTransmission
}