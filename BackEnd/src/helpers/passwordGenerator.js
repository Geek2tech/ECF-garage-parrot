const passwordGenerator = require('generate-password')

function generatePaswword () {
    const password = passwordGenerator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        strict: true,
        exclude: "<>?$!&\\/=,"
    })
    return password
}

module.exports = generatePaswword