const database = require('../services/db')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const crypto = require("crypto");
const SECRET_KEY = process.env.APP_SECRET_KEY

/**
 * @function
 * @description check email and password in database , if ok send JWT
 * @param req request with email and passwod
 * @param res
 * @return {Promise<*>}
 */
async function authentification(req, res) {
    console.log('auth')

    const {email, password} = req.body


    try {
        // recherche de l'utilisateur
        const query = `select *
                       from users
                       where email = ?  `


        await database.dbconnect.query(query, email, (err, rows, result) => {


            if (rows[0] !== undefined) {
                const passwordDb = rows[0].password
                const userFirstName = rows[0].firstName
                const userLastName = rows[0].lastName
                console.log(userFirstName)
                console.log(userLastName)

                const userProfil = rows[0].profil_id

                bcrypt.compare(password, passwordDb, function (err, response) {
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
                            httpOnly:true,
                            secure:true,
                            maxAge:expireIn
                        })
                        res.send({
                            tokenExpiresIn : expireIn,
                            xsrfToken
                        })
                        //res.header('Authorization', 'Bearer ' + token)


                        //return res.status(200).json('auth_ok')
                    }else {
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
