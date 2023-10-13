const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: process.env.APP_SMTPSERVER,
    port: process.env.APP_SMTPPORT,
    secure: process.env.APP_SMTPSECURE,
    auth: {
        user: process.env.APP_SMTPUSER,
        pass: process.env.APP_SMTPPASSWORD
    }
})

module.exports =transporter