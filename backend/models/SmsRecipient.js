const mongoose = require('mongoose');

const smsRecipientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^\+255\d{9}$/ // Validates Tanzanian format
  },
  receiveSms: {
    type: Boolean,
    default: true
  },
  receiveWhatsapp: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['pastor', 'elder', 'admin', 'usher'],
    default: 'pastor'
  },
  addedBy: {
    type: String, // username of admin who added this recipient
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SmsRecipient', smsRecipientSchema);
