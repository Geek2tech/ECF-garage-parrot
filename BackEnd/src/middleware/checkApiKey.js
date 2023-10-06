/**
 * @function
 * @description Middleware function to Check if there is the api Key in the header
 * @param req
 * @param res
 * @param next
 * @return {*}
 */
 function checkApiKey (req,res,next) {

    if (req.headers['x-api-key'] !== process.env.APP_APIKEY) {
        return res.status(401).json({status: 'No API KEY'})
    }
    console.log('API KEY OK')
    next()
}

module.exports = checkApiKey