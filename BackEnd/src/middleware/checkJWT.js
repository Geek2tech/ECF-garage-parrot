const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.APP_SECRET_KEY


/**
 * @function
 * @description check if JWT is present and ok , if ok refresh the token
 *
 * @param req
 * @param res
 * @param next
 * @return {Promise<*>}
 */
async function checkJWT (req,res,next) {
let token = req.headers['x-access-token'] || req.headers['authorization']
    if (!!token && token.startsWith('Bearer')) {
        token = token.slice(7,token.length)
    }

    if (token) {
        jwt.verify(token,SECRET_KEY,(err,decoded) => {
            if (err) {
                return res.status(401).json('Token_invalide')
            }else {
                req.decoded = decoded

                const expiresIn = 25 *60 *60
                const newToken = jwt.sign({
                    userFirstName : decoded.userFirstName,
                    userLastName : decoded.userLastName,
                    profil : decoded.profil
                },
                    SECRET_KEY,
                    {
                        expiresIn:expiresIn
                    })
                res.header('Authorization','Bearer ' + newToken)
                next()
            }
        })
    }else {
        return res.status(401).json('token_required')
    }

}

module.exports = checkJWT