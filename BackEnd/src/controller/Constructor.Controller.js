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

function constructorList(req, res) {

    const database = require('../services/db')

    database.dbconnect.query("SELECT * from constructor", (err, result) => {
        if (err) {
            console.log('erreur de récupération des données')
            res.status(500)

        } else {

            res.status(200)
            res.send(result)

        }

    })

}

module.exports = {
    addConstructor,
    constructorList
}