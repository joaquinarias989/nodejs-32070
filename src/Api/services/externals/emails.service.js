const nodemailer = require('nodemailer');

const HOST_MAIL = process.env.HOST_MAIL;
const MAILS_FROM = process.env.MAILS_FROM;
const PASSWORD = process.env.MAILS_PASSWORD;

const transporter = nodemailer.createTransport({
  host: HOST_MAIL,
  port: 587,
  auth: {
    user: MAILS_FROM,
    pass: PASSWORD,
  },
});

async function SendEmailToAdmin(subject, html) {
  const mailOptions = {
    from: 'StreetWear API',
    to: MAILS_FROM,
    subject: `${subject} | STREET WEAR`,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function SendEmailNewUser(user) {
  const mailOptions = {
    from: 'StreetWear API',
    to: MAILS_FROM,
    subject: 'Nuevo Usuario Registrado | STREET WEAR',
    html: `¡Se ha registrado un nuevo usuario en la Web! <br /> 
    Nombre y Apellido: ${user.name} <br /> 
    Email: ${user.email} <br /> 
    Dirección: ${user.address} <br /> 
    Nº Teléfono: ${user.phone} <br />`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { SendEmailToAdmin, SendEmailNewUser };
