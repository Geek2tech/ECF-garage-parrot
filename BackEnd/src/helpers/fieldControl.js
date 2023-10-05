function suppressSpecialChar (value) {
    /**
     * @function
     * @description Suppress special char and useless space at the beginning and the end
     * @param {string} string to clean
     * @return {string} string cleaned
     */

    const valueToClean = value
    const valueClean = valueToClean.replace(/[\W_]/g, "").trim()
    return valueClean
}

module.exports = {
    suppressSpecialChar
}