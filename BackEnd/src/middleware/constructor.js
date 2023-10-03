const util = require("util")

function addConstructor(req, res) {
    const database = require('../services/db')
    let request = req.body

    const query = `INSERT INTO constructor (constructor_name)
                   VALUES ("${request.name}") `

    database.dbconnect.query(query, (err, result) => {
        if (err) {

            res.status(500)
            res.send(err.sqlMessage)
        } else {

            res.send("ok : " + result.insertId)

        }
    })
}


const addConstructorMiddleware = util.promisify(addConstructor)
module.exports = addConstructorMiddleware
