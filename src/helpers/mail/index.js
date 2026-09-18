const transport = require("../../config/mail")

const sendDynamicEmail = (from, to, subject, template) => {
    transport.sendMail({
        from: from || "info@khem.com",
        to,
        subject,
        html: template
    }, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
    });
}



module.exports = sendDynamicEmail