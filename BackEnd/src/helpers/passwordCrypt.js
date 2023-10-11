const bcrypt = require('bcrypt')
const logger = require('../services/Logger')

function stringCrypt(value) {
    const now = new Date()
    const time =now.getHours() + ":" + now.getMinutes() + ':' + now.getSeconds()

    logger.log({
        level: 'info',
        module: 'passwordCrypt',
        message: ` ${time}  Call stringCrypt `
    })

    const saltRound = 10
    bcrypt
        .genSalt(saltRound)
        .then(salt => {
            console.log('Salt: ', salt)
            return bcrypt.hash(value, salt)
        })
        .then(hash => {
            console.log('Hash: ', hash)
        })
        .catch(err => console.error(err.message))
}

stringCrypt('test')

