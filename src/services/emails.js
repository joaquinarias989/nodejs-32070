const nodemailer = require('nodemailer');

const TEST_MAIL = 'guadalupe63@ethereal.email';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: 'psSzCr7zepNra5y5Bw',
  },
});

async function SendEmailToAdmin(subject, html) {
  const mailOptions = {
    from: 'StreetWear API',
    to: TEST_MAIL,
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
    to: TEST_MAIL,
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
