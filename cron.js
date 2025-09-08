const cron = require('node-cron');
const dotenv = require('dotenv');
const { getTodaySummary } = require('./models/Attendance');
const { getAllRecipients } = require('./models/SmsRecipient');
const sendSms = require('./utils/sendSms');

dotenv.config();

// ⏰ Schedule: Every Sunday at 18:00 (6 PM)
cron.schedule('0 18 * * 0', async () => {
  console.log('📅 Running weekly attendance summary...');

  try {
    const summary = await getTodaySummary();
    const { adultCount, childCount } = summary;

    const message = `📊 Jumapili Summary:\nWatu Wazima: ${adultCount}\nWatoto: ${childCount}`;

    const recipients = await getAllRecipients();

    for (const r of recipients) {
      if (r.receiveSms) {
        await sendSms(r.phoneNumber, message);
      }
    }

    console.log('✅ Weekly summary sent to leaders');
  } catch (err) {
    console.error('❌ Cron error:', err.message);
  }
});
