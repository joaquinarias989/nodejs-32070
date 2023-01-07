const nodemailer = require('nodemailer');

const HOST_MAIL = process.env.HOST_MAIL;
const PORT_MAIL = process.env.PORT_MAIL;
const MAIL_ADRESS = process.env.MAIL_ADRESS;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  host: HOST_MAIL,
  port: PORT_MAIL,
  auth: {
    user: MAIL_ADRESS,
    pass: MAIL_PASSWORD,
  },
});

async function SendEmailToAdmin(subject, html) {
  const mailOptions = {
    from: 'StreetWear API',
    to: MAIL_ADRESS,
    subject: `${subject} | STREET WEAR`,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error);
  }
}

async function SendEmailNewUser(user) {
  const mailOptions = {
    from: 'StreetWear API',
    to: MAIL_ADRESS,
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
