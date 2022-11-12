const twilio = require('twilio');
const ACCOUNT_SID = 'AC293609e1d206d88e8cf06d46015ef6e4';
const AUTH_TOKEN = '05b816c88bc521551a355bb506768b6d';
const TWILIO_SMS_PHONE_NUMBER = '+19702927147';
const TWILIO_WPP_PHONE_NUMBER = '+14155238886';
const ADMIN_PHONE_NUMBER = process.env.ADMIN_PHONE_NUMBER;

async function SendSMSToBuyer(user) {
  const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

  try {
    await client.messages.create({
      body: `Hola ${user.name}! Tu compra en STREET WEAR ha sido procesada.`,
      from: TWILIO_SMS_PHONE_NUMBER,
      to: user.phone,
    });
  } catch (error) {
    throw new Error(error);
  }
}

async function SendWhatsappToAdmin(subject, text) {
  const client = twilio(ACCOUNT_SID, AUTH_TOKEN);
  try {
    await client.messages.create({
      body: `${subject}\b${text}`,
      from: `whatsapp:${TWILIO_WPP_PHONE_NUMBER}`,
      to: `whatsapp:${ADMIN_PHONE_NUMBER}`,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = { SendSMSToBuyer, SendWhatsappToAdmin };
