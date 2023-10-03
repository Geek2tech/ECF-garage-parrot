const nodemailer = require('nodemailer')




const transporter = nodemailer.createTransport({
    host: process.env.APP_SMTPSERVER,
    port: process.env.APP_SMTPPORT,
    secure: process.env.APP_SMTPSECURE,
    auth: {
        user: process.env.APP_SMTPUSER,
        pass: process.env.APP_SMTPPASSWORD
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
            res.send("Message envoyé avec success")
        })
        .catch((err) => {
            console.log(err)
            res.status(500)
            res.send(err)
        })


}



module.exports = {
    sendMail
}

