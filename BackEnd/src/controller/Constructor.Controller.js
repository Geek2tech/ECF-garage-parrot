const addConstructor = require("../middleware/constructor")

const newConstructor = async (req,res) => {

    try {

        await addConstructor(req, res);


    } catch (err) {
        res.status(500).send({
            message: `Could not create new constructor not bdd error  ${err}`,
        })
    }

}
module.exports = {
    newConstructor
}