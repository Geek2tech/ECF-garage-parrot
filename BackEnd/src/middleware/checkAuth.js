const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.APP_SECRET_KEY
const logger = require('../services/Logger')


/**
 * @function
 * @description vérifie la cohérence entre le token JWT et le token XSRF
 * @param req
 * @param res
 * @param next
 * @return {Promise<*>}
 */
async function checkAuth(req, res, next) {

    logger.log({
        level: 'info',
        module: 'chekcAuth',
        message: 'Call checkAuth'

    })

    try {
        const headers  = req.headers



        /* On vérifie que le JWT est présent dans les cookies de la requête */
        if (!headers['cookie']) {

            logger.log({
                level: 'error',
                module: 'checkAuth',
                message: `Missing token in cookie when try to access to ${req.url}`
            })

            return res.status(401).json({message: 'Missing token in cookie'})
        }
        const cookies = headers['cookie'].split("token=")
        const cookie = cookies[1]
        const accessToken = cookie

        /* On vérifie que le token CSRF est présent dans les en-têtes de la requête */
        if (!headers || !headers['x-xsrf-token']) {

            logger.log({
                level: 'error',
                module: 'checkAuth',
                message: `Missing XSRF token in headers when try to access ${req.url}`
            })

            return res.status(401).json({message: 'Missing XSRF token in headers'})
        }

        let xsrfToken = headers['x-xsrf-token']

        /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
        const decodedToken = jwt.verify(accessToken, SECRET_KEY)

        /* On vérifie que le token CSRF correspond à celui présent dans le JWT  */
        if (xsrfToken !== decodedToken.xsrfToken) {

            logger.log({
                level: 'error',
                module: 'checkAuth',
                message: 'Bad xsrf token'
            })

            return res.status(401).json({message: 'Bad xsrf token'})
        }

        return next()
    } catch (err) {

        logger.log({
            level:'error',
            module:'checkAuth',
            message:`Internal error ${err}`
        })

        return res.status(500).json({message: 'Internal error ' + err})
    }
}

module.exports = checkAuth