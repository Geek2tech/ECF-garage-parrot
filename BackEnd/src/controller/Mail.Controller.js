const {suppressSpecialChar} = require("../helpers/fieldControl");
const logger = require('../services/Logger')
const transporter = require('../services/mailTransporter')


async function sendMail(req, res) {

    try {
        const mailInfo = req.body
        logger.log({
            level: 'info',
            module: 'Mail',
            message: `Call sendMail`
        })
        await transporter.sendMail({
            from: {
                name: 'Garage Parrot',
                address: process.env.APP_SMTPUSER
            },
            to: suppressSpecialChar(mailInfo.to),
            subject: suppressSpecialChar(mailInfo.subject),
            text: suppressSpecialChar(mailInfo.message),

        })
            .then(() => {
                logger.log({
                    level: 'info',
                    module: 'Mail',
                    message: 'Mail sent with success'
                })
                res.status(200)
                res.send("Message envoyé avec success")
            })
            .catch((err) => {
                logger.log({
                    level: 'error',
                    module: 'Mail',
                    message: `Error during send mail : ${err} `
                })
                console.log(err)
                res.status(500)
                res.send(err)
            })



    }catch (err) {
        logger.log({
            level:'error',
            module:'Mails',
            message:`Internal error :  ${err}`
        })

        res.status(500)
        res.send('Internal Error')
    }


}


module.exports = {
    sendMail
}

