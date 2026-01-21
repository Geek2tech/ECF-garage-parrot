const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require("crypto")
const util = require('util')
const {suppressSpecialChar} = require("../helpers/fieldControl")
const SECRET_KEY = process.env.APP_SECRET_KEY
const logger = require('../services/Logger')
const database = require('../services/db')

// Promisify database query
const dbQuery = util.promisify(database.dbconnect.query).bind(database.dbconnect)

/**
 * @function
 * @description check email and password in database, if ok send JWT
 * @param req request with email and password
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

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' })
    }

    try {
        const query = `SELECT u.first_name, u.last_name, u.email, u.password, p.profil_name
                       FROM users AS u
                       JOIN profils AS p ON u.profil_id = p.profil_id
                       WHERE u.email = ?`

        logger.log({
            level: 'info',
            module: 'Authentification',
            message: 'BDD request'
        })

        const rows = await dbQuery(query, [suppressSpecialChar(email)])

        if (!rows || rows.length === 0) {
            logger.log({
                level: 'warn',
                module: 'Authentification',
                message: 'Authentication failed'
            })
            // Use same message for both cases to prevent user enumeration
            return res.status(401).json('wrong_credentials')
        }

        const user = rows[0]
        const passwordDb = user.password
        const userFirstName = user.first_name
        const userLastName = user.last_name
        const userProfil = user.profil_name

        // Compare passwords using promisified bcrypt
        const passwordMatch = await bcrypt.compare(suppressSpecialChar(password), passwordDb)

        if (!passwordMatch) {
            logger.log({
                level: 'warn',
                module: 'Authentification',
                message: 'Authentication failed'
            })
            return res.status(401).json('wrong_credentials')
        }

        logger.log({
            level: 'info',
            module: 'Authentification',
            message: 'User password ok'
        })

        // Create XSRF token
        const xsrfToken = crypto.randomBytes(64).toString('hex')
        logger.log({
            level: 'info',
            module: 'Authentification',
            message: 'xsrf token generated'
        })

        // JWT expires in 1 hour (was 100 days!)
        const expireIn = 60 * 60
        const token = jwt.sign(
            {
                userFirsname: userFirstName,
                userLastName: userLastName,
                profil: userProfil,
                xsrfToken
            },
            SECRET_KEY,
            { expiresIn: expireIn }
        )

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: expireIn * 1000 // maxAge is in milliseconds
        })

        logger.log({
            level: 'info',
            module: 'Authentification',
            message: 'JWT token generated and stored'
        })
        logger.log({
            level: 'info',
            module: 'Authentification',
            message: 'User connected successfully'
        })

        return res.status(200).json({
            tokenExpiresIn: expireIn,
            xsrfToken,
            userProfil,
            userFirstName,
            userLastName
        })

    } catch (err) {
        logger.log({
            level: 'error',
            module: 'Authentification',
            message: `Internal error: ${err.message}`
        })

        return res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = {
    authentification
}
