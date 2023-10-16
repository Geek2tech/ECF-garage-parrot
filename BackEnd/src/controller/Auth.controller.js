const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require("crypto");
const {suppressSpecialChar} = require("../helpers/fieldControl");
const SECRET_KEY = process.env.APP_SECRET_KEY
const logger = require('../services/Logger')
const database = require('../services/db')
/**
 * @function
 * @description check email and password in database , if ok send JWT
 * @param req request with email and passwod
 * @param res
 * @return {Promise<*>}
 */
async function authentification(req, res) {


    logger.log({
        level: 'info',
        module: 'Authentification',
        message: 'Authentification request'
    })

    const {email, password} = req.body


    try {
        // recherche de l'utilisateur


        const query = `SELECT u.first_name, u.last_name, u.email, u.password, p.profil_name
                       from users as u
                                join profils as p on u.profil_id = p.profil_id
                       where u.email = ?`

        logger.log({
            level:'info',
            module:'Authentification',
            message:'BDD request'
        })

        await database.dbconnect.query(query, suppressSpecialChar(email), (err, rows, result) => {

            const passwordDb = rows[0].password
            const userFirstName = rows[0].first_name
            const userLastName = rows[0].last_name

            if (rows[0] !== undefined) {
                logger.log({
                    level: 'info',
                    module: 'Authentification',
                    message: `User ${userFirstName} ${userLastName} found `
                })


                const userProfil = rows[0].profil_name

                bcrypt.compare(suppressSpecialChar(password), passwordDb, function (err, response) {
                    if (err) {
                        logger.log({
                            level: 'error',
                            module: 'Authentification',
                            message: `Error when compare decrypted password : ${err} `
                        })
                        throw new Error(err);
                    }

                    if (response) {

                        logger.log({
                            level: 'info',
                            module: 'Authentification',
                            message: 'User password ok'
                        })
// création token xsrf
                        const xsrfToken = crypto.randomBytes(64).toString('hex')
                        logger.log({
                            level: 'info',
                            module: 'Authentification',
                            message: 'xsrf token generated'
                        })

                        const expireIn = 24 * 60 * 60
                        const token = jwt.sign({
                                userFirsname: userFirstName,
                                userLastName: userLastName,
                                profil: userProfil,
                                xsrfToken
                            },
                            SECRET_KEY,
                            {
                                expiresIn: expireIn
                            });
                        res.cookie('token', token, {
                            httpOnly: true,
                            secure: true,
                            maxAge: expireIn
                        })
                        logger.log({
                            level: 'info',
                            module: 'Authentification',
                            message: 'JWT token generated and stocked'
                        })
                        logger.log({
                            level: 'info',
                            module: 'Authentification',
                            message: `user ${userFirstName} ${userLastName} is connected`
                        })
                        res.send({
                            tokenExpiresIn: expireIn,
                            xsrfToken
                        })

                    } else {
                        logger.log({
                            level: 'error',
                            module: 'Authentification',
                            message: `Wrong credentials for ${email}`
                        })
                        return res.status(403).json('wrong_credentials')
                    }


                })
            } else {
                logger.log({
                    level: 'error',
                    module: 'Authentification',
                    message: ` user ${email} not found `
                })
                return res.status(404).json('user_not_found')
            }
        })

    } catch (err) {
        logger.log({
            level: 'error',
            module: 'Authentification',
            message: `Internal error : ${err} `
        })

        return res.status(501).json(err)
    }

}

module.exports = {
    authentification
}
