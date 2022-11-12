const twilio = require('twilio');
const ACCOUNT_SID = 'AC293609e1d206d88e8cf06d46015ef6e4';
const AUTH_TOKEN = '37e0908ab2aeeb894f0c27e2d0f4ef65';
const TWILIO_PHONE_NUMBER = '+19702927147';

async function SendSMSToBuyer(user) {
  const client = twilio(ACCOUNT_SID, AUTH_TOKEN);
  console.log(user);
  try {
    await client.messages.create({
      body: `Hola ${user.name}! Tu compra en STREET WEAR ha sido procesada. Revisa tu email para mas info.`,
      from: TWILIO_PHONE_NUMBER,
      to: user.phone,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.name);
  }
}

module.exports = { SendSMSToBuyer };
