const logger = require('../services/Logger')
const paginatedSelectQuery = require('../helpers/paginatedSelectQuery')
const {suppressSpecialChar} = require("../helpers/fieldControl");
const passwordGenerator = require('generate-password')
const bcrypt = require('bcrypt')
const {v4: uuidV4} = require('uuid')
const transporter = require('../services/mailTransporter')
const database = require("../services/db");

/**
 * @function
 * @description Get list of user
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function getUser(req, res) {
    logger.log({
        level: 'info',
        module: 'USer',
        message: `Call getUser`
    })
    const query = "SELECT u.first_name , u.last_name , u.email,p.profil_name FROM users as u JOIN profils as p on u.profil_id = p.profil_id "


    logger.log({
        level: 'info',
        module: 'User',
        message: 'Bdd Request'
    })
    paginatedSelectQuery(req, res, query)
}

/**
 * @function
 * @description Make a user , generate password ( and send it by email ) , use bcrypt to encrypt and store it un database
 * @param req request with first_name , last_name , email ,and profil ID in params
 * @param res
 * @return {Promise<void>}
 */
async function addUser(req, res) {
    const first_name = suppressSpecialChar(req.body.first_name)
    const last_name = suppressSpecialChar(req.body.last_name)
    const email = suppressSpecialChar(req.body.email)
    const UUID = uuidV4()
    const profil_id = suppressSpecialChar(req.body.profil)
    const password = passwordGenerator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        strict: true,
        exclude: "<>?$!&\\/="
    })

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

            const database = require('../services/db')
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
                        subject: 'Votre nouveau password',
                        text: `Voici votre nouveau password : ${password}`,

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


}

async function deleteUser(req, res) {

}

/**
 * @function
 * @description update user informations only to change the password use the dedicated route
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function updateUser(req, res) {

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

    const database = require('../services/db')

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
                level:'error',
                module:'User',
                message:'User not Found'
            })
            res.status(204)
                res.send('User not found')

        }else  {

            logger.log({
                level: 'info',
                module: 'User',
                message: `User found`
            })



            const uuid = result[0]['user_uuid']
            const user = {
                uuid :uuid,
                first_name: first_name,
                last_name: last_name,
                email: newEmail,
                profil:profil
            }
            query = `UPDATE users SET first_name = ? , last_name = ? , email = ? , profil_id = ? WHERE user_uuid = ?`

            logger.log({
                level: 'info',
                module: 'User',
                message: 'Update User'
            })

            database.dbconnect.query(query, [user.first_name, user.last_name, user.email,user.profil,user.uuid], (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        logger.log({
                            level: 'error',
                            module: 'User',
                            message: 'Duplicated email'
                        })

                        res.status(204)
                        res.send('Erreur email déja existant')
                    } else {
                        logger.log({
                            level:'error',
                            module:'User',
                            message:`SQL error : ${err.message}`
                        })
                        res.status(500)
                        res.send(`SQL error ${err.message}`)
                    }


                } else {

                    logger.log({
                        level:'info',
                        module:'User',
                        message:`Update user successfully ${result.message}`
                    })

                    res.status(200)
                    res.send('Update ok')
                }
            })

        }

    })


}

async function updateUserPassword(req, res) {

}

module.exports = {
    getUser,
    addUser,
    deleteUser,
    updateUser,
    updateUserPassword
}