// routes/setup.js
import { verifyAuthToken } from './auth.js';
import express from 'express';
import db from '../firebase.js'; // Ensure firebase.js uses export default
const router = express.Router();

router.get('/setup/init', async (req, res) => {
  try {
    // Create placeholder documents
    await db.collection('members').add({
      memberId: 'INIT-000',
      type: 'mtu mzima',
      gender: 'me',
      names: 'Placeholder',
      location: 'Init',
      phone: '',
      usher: 'system',
      method: 'manual',
      registeredAt: new Date()
    });

    await db.collection('messages').add({
      from: 'system',
      role: 'admin',
      message: 'Mfumo umeanzishwa.',
      time: new Date(),
      read: true
    });

    await db.collection('events').add({
      title: 'Mfano wa Ibada',
      time: new Date(),
      note: 'Hii ni ibada ya mfano.',
      createdBy: 'system',
      createdAt: new Date()
    });

    await db.collection('users').add({
      username: 'admin',
      passwordHash: 'init',
      role: 'admin',
      fullName: 'System Admin',
      createdAt: new Date()
    });

    await db.collection('roster').add({
      name: 'Placeholder Usher',
      role: 'greeter',
      time: '08:00',
      checkedIn: false
    });

    await db.collection('media').add({
      filename: 'init.jpg',
      caption: 'Mfano wa picha',
      uploadedBy: 'system',
      uploadedAt: new Date()
    });

    res.json({ message: '✅ All collections initialized with placeholder documents.' });
  } catch (err) {
    console.error('Setup error:', err);
    res.status(500).json({ error: 'Tatizo kwenye kuanzisha mfumo.' });
  }
});

router.get('/secure-endpoint', verifyAuthToken, async (req, res) => {
  // protected logic
});

export default router;
