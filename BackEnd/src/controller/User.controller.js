const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require("crypto");
const {suppressSpecialChar} = require("../helpers/fieldControl");
const SECRET_KEY = process.env.APP_SECRET_KEY

/**
 * @function
 * @description check email and password in database , if ok send JWT
 * @param req request with email and passwod
 * @param res
 * @return {Promise<*>}
 */
async function authentification(req, res) {
    const database = require('../services/db')
    console.log('auth')

    const {email, password} = req.body
    console.log(req.body)
    console.log('email : ', email)
    console.log('password : ', password)

    try {
        // recherche de l'utilisateur
        const query = `select *
                       from users
                       where email = ?  `


        await database.dbconnect.query(query, suppressSpecialChar(email), (err, rows, result) => {


            if (rows[0] !== undefined) {
                const passwordDb = rows[0].password
                const userFirstName = rows[0].firstName
                const userLastName = rows[0].lastName
                console.log(userFirstName)
                console.log(userLastName)

                const userProfil = rows[0].profil_id

                bcrypt.compare(suppressSpecialChar(password), passwordDb, function (err, response) {
                    if (err) {
                        throw new Error(err);
                    }

                    if (response) {
// création token xsrf
                        const xsrfToken = crypto.randomBytes(64).toString('hex')
                        console.log(xsrfToken)

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

                        res.send({
                            tokenExpiresIn: expireIn,
                            xsrfToken
                        })

                    } else {
                        return res.status(403).json('wrong_credentials')
                    }


                })
            } else {
                return res.status(404).json('user_not_found')
            }
        })

    } catch (err) {
        console.log(err)
        return res.status(501).json(err)
    }

}

module.exports = {
    authentification
}
