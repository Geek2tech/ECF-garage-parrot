const nodemailer = require('nodemailer')
const util = require("util")



const transporter = nodemailer.createTransport({
    host: 'smtp-zose.yulpa.io',
    port: 465,
    secure: true,
    auth: {
        user: 'smtp@geek2tech.fr',
        pass: 'g%DKz26XELRG5=bky3[FVM'
    }
})

async function sendMail(req,res) {

    const mailInfo = req.body

    const info = await transporter.sendMail( {
        from : "smtp@geek2tech.fr",
        to:'demuylder.herve@gmail.com',
        subject: 'Demande d information',
        text: mailInfo.message,

    })
        .then(() => {

            res.status(200)
            res.send("ok")
        })
        .catch((err) => {
            console.log(err)
            res.status(500)
            res.send('ko')
        })


}

const sendMailMiddleware = util.promisify(sendMail)

module.exports =  sendMailMiddleware

