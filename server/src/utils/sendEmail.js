const nodemailer = require("nodemailer");

console.log("PASSWORD LENGTH:", process.env.EMAIL_USER)
console.log("SENDER EMAIL:", !!process.env.EMAIL_PASS)
console.log("PASSWORD LENGTH:", process.env.EMAIL_PASS?.length)

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

module.exports = transporter;
