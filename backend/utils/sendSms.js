const fetch = require('node-fetch');

const sendSms = async (to, message) => {
  try {
    const response = await fetch('https://api.africastalking.com/version1/messaging', {
      method: 'POST',
      headers: {
        'apiKey': process.env.AFRICASTALKING_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        username: process.env.AFRICASTALKING_USERNAME,
        to,
        message
      })
    });

    const data = await response.json();
    console.log('✅ SMS sent:', data);
    return data;
  } catch (err) {
    console.error('❌ SMS error:', err.message);
    return null;
  }
};

module.exports = sendSms;
