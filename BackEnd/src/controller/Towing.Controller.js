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

    try {
        const query =  `SELECT * From towing_modes`

        logger.log({
            level:'info',
            module:'Towing ',
            message:`Call getTowing`
        })

        await  paginatedResult(req,res,query)

    }catch (err) {
        logger.log({
            level:'error',
            module:'Towing',
            message:`Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }




}

module.exports = {
    getTowing
}