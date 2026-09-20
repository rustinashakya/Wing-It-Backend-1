const transport = require("../../config/mail")

const sendDynamicEmail = (from, to, subject, template) => {
    transport.sendMail({
        from: from || "info@rustina.com",
        to,
        subject,
        html: template
    }, (error, info) => {
        if (error) {
            return console.log(error);
        }
        // console.log("Message sent: %s", info.messageId, to);
        console.log(`Message sent to: ${to}`);
    });
}



module.exports = sendDynamicEmail