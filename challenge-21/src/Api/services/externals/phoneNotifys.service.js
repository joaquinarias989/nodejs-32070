const twilio = require('twilio');
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
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
    console.log(error);
  }
}

async function SendWhatsappToAdmin(subject, text) {
  const client = twilio(ACCOUNT_SID, AUTH_TOKEN);
  try {
    await client.messages.create({
      body: `${subject}
      
      ${text}`,
      from: `whatsapp:${TWILIO_WPP_PHONE_NUMBER}`,
      to: `whatsapp:${ADMIN_PHONE_NUMBER}`,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { SendSMSToBuyer, SendWhatsappToAdmin };
