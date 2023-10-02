const send = require("../middleware/mail")

const sendmail = async (req,res) => {
    try {

        await send(req, res);



        res.status(200).send({
            message: "Mail send ",
        });
    } catch (err) {
        res.status(500).send({
            message: `Could not send mail ${err}`,
        })
    }

}

module.exports = {
    sendmail
}