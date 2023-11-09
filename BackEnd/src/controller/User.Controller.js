const logger = require('../services/Logger')
const paginatedSelectQuery = require('../helpers/paginatedSelectQuery')
const {suppressSpecialChar} = require("../helpers/fieldControl");
const database = require('../services/db')
const bcrypt = require('bcrypt')
const {v4: uuidV4} = require('uuid')
const transporter = require('../services/mailTransporter')
const generatePassword = require('../helpers/passwordGenerator')
const deleteItems = require('../helpers/deleteItem')

/**
 * @function
 * @description Get list of user
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function getUser(req, res) {

    try {

        logger.log({
            level: 'info',
            module: 'USer',
            message: `Call getUser`
        })
        const query = "SELECT u.user_uuid,u.first_name , u.last_name , u.email,p.profil_name FROM users as u JOIN profils as p on u.profil_id = p.profil_id "


        logger.log({
            level: 'info',
            module: 'User',
            message: 'Bdd Request'
        })
        paginatedSelectQuery(req, res, query)

    } catch (err) {
        logger.log({
            level: 'error',
            module: 'User',
            message: `Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }

}

/**
 * @function
 * @description Make a user , generate password ( and send it by email ) , use bcrypt to encrypt and store it un database
 * @param req request with first_name , last_name , email ,and profil ID in params
 * @param res
 * @return {Promise<void>}
 */
async function addUser(req, res) {

    try {

        const first_name = suppressSpecialChar(req.body.first_name)
        const last_name = suppressSpecialChar(req.body.last_name)
        const email = suppressSpecialChar(req.body.email)
        const UUID = uuidV4()
        const profil_id = suppressSpecialChar(req.body.profil)
        const password = generatePassword()

        logger.log({
            level: "info",
            module: 'User',
            message: `Call addUser`
        })

        const saltRounds = 10
        await bcrypt.hash(password, saltRounds, (err, encrypted) => {
            if (err) {

                logger.log({
                    level: 'error',
                    module: 'User',
                    message: `Bcrypt error : ${err}`
                })
                res.status(500)
                res.send(`Erreur de chiffrement : ${err}`)

            } else {
                const newUser = {
                    uuid: UUID,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: encrypted,
                    profil: profil_id
                }


                const query = 'INSERT INTO users (user_uuid,first_name,last_name,email,password,profil_id) (VALUES (?,?,?,?,?,?))'

                logger.log({
                    level: 'info',
                    module: 'User',
                    message: `Bdd Request`
                })

                database.dbconnect.query(query, [newUser.uuid, newUser.first_name, newUser.last_name, newUser.email, newUser.password, newUser.profil], (err, result) => {
                    if (err) {

                        if (err.code === 'ER_DUP_ENTRY') {
                            logger.log({
                                level: 'error',
                                module: 'User',
                                message: `Email ${newUser.email} déja utilisé`
                            })
                            res.status(204)
                            res.send('Utilisateur déja existant')
                        } else {

                            logger.log({
                                level: 'error',
                                module: 'User',
                                message: `Sql Error : ${err}`
                            })
                        }


                    } else {

                        logger.log({
                            level: 'info',
                            module: 'User',
                            message: `User successfully created : ${result.message}`
                        })
                        transporter.sendMail({
                            from: {
                                name: 'Garage Parrot',
                                address: process.env.APP_SMTPUSER
                            },
                            to: newUser.email,
                            subject: 'Votre nouveau mot de passe',
                            text: ` Votre compte vient d'être créé , voici votre password : ${password}`,
                            html: `<h1> Garage Parrot </h1><br><strong>Bonjour ${newUser.first_name} ${newUser.last_name}</strong><br><br><strong>Votre commpte pour l'accès au site</strong>
<br><strong>vient d'être créé . Voici le mot de passe</strong>
<br>
<br>
<strong>${password}</strong>
 <br>
 <p>Cette information est sensible merci de la garder confidentielle</p>
 <br
 ><p>En vous souhaitant une bonne journée</p>`

                        }).then(() => {

                                logger.log({
                                    level: 'info',
                                    module: 'User',
                                    message: 'Mail sent'
                                })

                            }
                        ).catch((err) => {

                            logger.log({
                                level: 'error',
                                module: 'User',
                                message: `Error during sending email : ${err}`
                            })
                            res.status(200)
                            res.send('Error with email')

                        })


                        res.status(201)
                        res.send('User created successfully')

                    }


                })

            }

        })


    } catch (err) {
        logger.log({
            level: 'error',
            module: 'User',
            message: `Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }


}

/**
 * @function
 * @description delete user , if user is admin we check if there is another one to authorize the delete
 * @param req request with user email in params
 * @param res
 * @return {Promise<void>}
 */
async function deleteUser(req, res) {

    try {

        const email = suppressSpecialChar(req.body.email)

        logger.log({
            level: 'info',
            module: 'User',
            message: `Call deleteUser with params ${email}`
        })

        let query = "SELECT p.profil_name FROM users as u   JOIN profils as p  on p.profil_id = u.profil_id WHERE u.email = ? "

        logger.log({
            level: 'info',
            module: 'User',
            message: ` Bdd request`
        })
        database.dbconnect.query(query, [email], (err, result) => {

            if (err) {
                logger.log({
                    level: 'error',
                    module: 'Users',
                    message: ` SQL error ${err}`
                })
                res.status(500)
                res.send(`SQL Error : ${err}`)
            } else if (result.length === 0) {
                logger.log({
                    level: 'error',
                    module: 'Users',
                    message: `User not found`
                })
                res.status(204)
                res.send("User not found")
            } else {

                if (result[0].profil_name === "administrateur") {

                    query = `SELECT COUNT(*) as nb_admin
                             FROM users as u
                                      JOIN profils as p on p.profil_id = u.profil_id
                             WHERE p.profil_name = "administrateur"`

                    logger.log({
                        level: "info",
                        module: 'User',
                        message: 'Bdd request'
                    })

                    database.dbconnect.query(query, (err, result) => {
                            if (err) {
                                logger.log({
                                    level: 'error',
                                    module: 'Users',
                                    message: `SQL Error : ${err}`
                                })
                                res.status(500)
                                res.send(`Sql Error : ${err}`)


                            } else if (result[0].nb_admin === 1) {

                                logger.log({
                                    level: 'info',
                                    module: 'Users',
                                    message: `It's the last admin you can't delete him`
                                })

                                res.status(304)
                                res.send(`Impossible de supprimer le dernier admin`)

                            } else {
                                deleteItems(res, 'users', 'email', email)
                            }

                        }
                    )
                } else {
                    deleteItems(res, 'users', 'email', email)
                }


            }


        })
    } catch (err) {
        logger.log({
            level: 'error',
            module: 'User',
            message: `Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }

}

/**
 * @function
 * @description update user informations only to change the password use the dedicated route
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function updateUser(req, res) {
    try {

        const first_name = suppressSpecialChar(req.body.first_name)
        const last_name = suppressSpecialChar(req.body.last_name)
        const profil = suppressSpecialChar(req.body.profil)
        const email = suppressSpecialChar(req.body.email)
        const newEmail = suppressSpecialChar(req.body.new_email)

        logger.log({
            level: 'info',
            module: 'User',
            message: `Call updateUser with params  ${first_name} , ${last_name} , ${email} , ${newEmail}, ${profil}`
        })


        let query = `SELECT user_uuid
                     FROM users
                     where email = ?`

        logger.log({
            level: 'info',
            module: 'User',
            message: 'Bdd request'
        })

        logger.log({
            level: 'info',
            module: 'User',
            message: `Request uuid user for ${email}`
        })

        await database.dbconnect.query(query, [email], (err, result) => {
            if (err) {

                logger.log({
                    level: 'info',
                    module: 'User',
                    message: `Sql error during search user : ${err.message}`
                })

                res.status(500)
                res.send(`Internal error ${err.message}`)

            } else if (result.length === 0) {
                logger.log({
                    level: 'error',
                    module: 'User',
                    message: 'User not Found'
                })
                res.status(204)
                res.send('User not found')

            } else {

                logger.log({
                    level: 'info',
                    module: 'User',
                    message: `User found`
                })


                const uuid = result[0]['user_uuid']
                const user = {
                    uuid: uuid,
                    first_name: first_name,
                    last_name: last_name,
                    email: newEmail,
                    profil: profil
                }
                query = `UPDATE users
                         SET first_name = ?,
                             last_name  = ?,
                             email      = ?,
                             profil_id  = ?
                         WHERE user_uuid = ?`

                logger.log({
                    level: 'info',
                    module: 'User',
                    message: 'Update User'
                })

                database.dbconnect.query(query, [user.first_name, user.last_name, user.email, user.profil, user.uuid], (err, result) => {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            logger.log({
                                level: 'error',
                                module: 'User',
                                message: 'Duplicated email'
                            })

                            res.status(304)
                            res.send('Erreur email déja existant')
                        } else {
                            logger.log({
                                level: 'error',
                                module: 'User',
                                message: `SQL error : ${err.message}`
                            })
                            res.status(500)
                            res.send(`SQL error ${err.message}`)
                        }


                    } else {

                        logger.log({
                            level: 'info',
                            module: 'User',
                            message: `Update user successfully ${result.message}`
                        })

                        res.status(200)
                        res.send('Update ok')
                    }
                })

            }

        })


    } catch (err) {
        logger.log({
            level: 'error',
            module: 'User',
            message: 'Internal error :  $err'
        })

        res.status(500)
        res.send('Internal Error')
    }


}

/**
 * @function
 * @description générate a new password and send it by email
 * @param req
 * @param res if 204 user not found
 * @return {Promise<void>}
 */
async function updateUserPassword(req, res) {
    try {
        const email = suppressSpecialChar(req.body.email)

        logger.log({
            level: 'info',
            module: 'User',
            message: `Call updateUserPassword with params ${email}`
        })


        const password = generatePassword()


        const saltRounds = 10
        await bcrypt.hash(password, saltRounds, (err, encrypted) => {
                if (err) {

                    logger.log({
                        level: 'error',
                        module: 'User',
                        message: `Bcrypt error : ${err}`
                    })
                    res.status(500)
                    res.send(`Erreur de chiffrement : ${err}`)

                } else {
                    const user = {
                        email: email,
                        password: encrypted,

                    }


                    const query = `UPDATE users
                                   SET password = ?
                                   WHERE email = ?`

                    logger.log({
                        level: 'info',
                        module: 'User',
                        message: `Bdd Request`
                    })

                    database.dbconnect.query(query, [user.password, user.email], (err, result) => {
                            if (err) {


                                logger.log({
                                    level: 'error',
                                    module: 'User',
                                    message: `Sql Error : ${err}`
                                })
                            } else {

                                if (result.affectedRows === 0) {
                                    logger.log({
                                        level: 'info',
                                        module: 'User',
                                        message: 'User not found'
                                    })
                                    res.status(204)
                                    res.send()
                                } else {
                                    logger.log({
                                        level: 'info',
                                        module: 'User',
                                        message: `User password  successfully update : ${result.message}`
                                    })
                                    transporter.sendMail({
                                        from: {
                                            name: 'Garage Parrot',
                                            address: process.env.APP_SMTPUSER
                                        },
                                        to: user.email,
                                        subject: 'Votre nouveau password',
                                        text: `Voici votre nouveau password : ${password}`,
                                        html: `<h1> Garage Parrot </h1><br><strong>Voici votre nouveau mot de passe</strong>
<br><>pour l'accès au site du garage Parrot
<br>
<br>
<strong>${password}</strong>
 <br>
 <p>Cette information est sensible merci de la garder <strong>confidentielle</strong></p>
 <br
 ><p>En vous souhaitant une bonne journée</p>`

                                    }).then(() => {

                                            logger.log({
                                                level: 'info',
                                                module: 'User',
                                                message: 'Mail sent'
                                            })

                                        }
                                    ).catch((err) => {

                                        logger.log({
                                            level: 'error',
                                            module: 'User',
                                            message: `Error during sending email : ${err}`
                                        })
                                        res.status(200)
                                        res.send('Error with email')

                                    })


                                    res.status(201)
                                    res.send('User password successfully updated')

                                }


                            }
                        }
                    )

                }

            }
        )


    } catch (err) {
        logger.log({
            level: 'error',
            module: 'User',
            message: 'Internal error :  $err'
        })

        res.status(500)
        res.send('Internal Error')
    }


}

module.exports = {
    getUser,
    addUser,
    deleteUser,
    updateUser,
    updateUserPassword
}