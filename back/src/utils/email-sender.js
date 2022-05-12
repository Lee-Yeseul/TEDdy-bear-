import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

const mailSender = process.env.MAIL_SENDER;
const password = process.env.MAIL_PASSWORD;
const callbackurl = process.env.FRONT_URL;

// nodemailer 로 gmail transport 생성하기
const transport = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: mailSender,
      pass: password,
    },
  })
);

const sendMail = (to, message) =>
  new Promise((resolve, reject) => {
    const mailOptions = {
      from: mailSender,
      to: to,
      subject: "TEDdy Bear 이메일 인증",
      html: `<h1>이메일 인증</h1>
                <div>
                  code: ${message}
                </div>`,
      text: "인증메일입니다.",
    };

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(info);
    });
  });

export { sendMail };
