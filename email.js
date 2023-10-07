const nodemailer = require("nodemailer");
const { promisify } = require('util');
const fs = require("fs");
const EmailLayout = require("./assets/email/emailLayout");



const SendEmail = (reciever, token) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ionos.de',
        port: 587,
        auth: {
            user: 'email@address.com',
            pass: "Password to the address"
        },
        name: "Email Name (e.g. name of company)",
        from: "email@address.com"
    });

    transporter.sendMail({
        from: {
            name: "Email Name (e.g. name of company)",
            address: "email@address.com"
        },
        to: `${reciever}`,
        subject: "Account creation",
        html: EmailLayout(token),
    }, (error, info) => {
        if(error) return console.error(error)
        console.log(info)
    })
}

module.exports = SendEmail
