const nodemailer = require('nodemailer')
const environments = require('./environment')

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: environments.mailtrapUserId,
        pass: environments.mailtrapPassword
    }
});


module.exports = transport