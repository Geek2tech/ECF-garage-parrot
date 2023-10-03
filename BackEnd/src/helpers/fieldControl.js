function suppressSpecialChar (value) {
    const valueToClean = value
    const valueClean = valueToClean.replace(/[\W_]/g, "").trim()
    return valueClean
}

module.exports = {
    suppressSpecialChar
}