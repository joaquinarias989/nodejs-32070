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

async function SendEmail(subject, html) {
  const mailOptions = {
    from: 'StreetWear API',
    to: TEST_MAIL,
    subject: subject,
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>',
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

module.exports = { SendEmail, SendEmailNewUser };
