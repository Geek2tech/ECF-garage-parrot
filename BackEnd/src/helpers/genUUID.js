const { v4: uuidV4 } = require('uuid')
const logger = require('../services/Logger')

function genUUID(){

    const v4Options = {
        offset:10
    }

    logger.log({
        level:'info',
        module:'genUUID',
        message:'Call genUUID'
    })

    const uuid = uuidV4(v4Options)
    return uuid
}

module.exports= genUUID