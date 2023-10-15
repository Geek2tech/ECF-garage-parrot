const logger = require('../services/Logger')

/**
 * @function
 * @description Middleware function to Check if there is the api Key in the header
 * @param req
 * @param res
 * @param next
 * @return {*}
 */
function checkApiKey(req, res, next) {
    logger.log({
        level: 'info',
        module: 'checkApiKey',
        message: `call checkApiKey`
    })
    if (req.headers['x-api-key'] !== process.env.APP_APIKEY) {
        logger.log({
            level: 'error',
            module: 'checkApiKey',
            message: 'No api key or api key incorrect'
        })
        return res.status(401).json({status: 'No API KEY'})
    }
    logger.log({
        level: 'info',
        module: 'checkApiKey',
        message: 'Api Key OK'
    })

    next()
}

module.exports = checkApiKey