const logger = require('../services/Logger')

function suppressSpecialChar (value) {
    /**
     * @function
     * @description Suppress special char and useless space at the beginning and the end
     * @param {string} string to clean
     * @return {string} string cleaned
     */

    logger.log({
        level:'info',
        module:'fieldControl',
        message:`Call fielControl with params : ${value}`
    })

    const valueToClean = value
    const valueClean = valueToClean.replace(/\<|\>|\?|\$|\&|\"|\!|\|\=/g, "").trim()

    return valueClean
}

module.exports = {
    suppressSpecialChar
}