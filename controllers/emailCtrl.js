const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ID,

      pass: process.env.M_P,
    },
  });
  console.log(process.env.EMAIL_ID, process.env.M_P);
  let info = await transporter.sendMail({
    from: '"akanksha Loya" <bbc@gmail.com.com>', // sender address
    to: data.to, // list of receivers
    subject: data.subject, //"hello veda",  Subject line
    text: data.text, //"hi i miss you i found a new way lets chat using mail", // plain text body
    html: data.html, // html body
  });

  console.log("Message sent: %s", info.messageId);
});

module.exports = sendEmail;
