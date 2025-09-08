// routes/system.js
import { verifyAuthToken } from './auth.js';

import express from 'express';
import db from '../firebase.js'; // Make sure firebase.js uses export default
const router = express.Router();

router.get('/system/usage', async (req, res) => {
  try {
    const users = await db.collection('users').get();
    const members = await db.collection('members').get();
    const messages = await db.collection('messages').get();
    const media = await db.collection('media').get();

    res.json({
      userCount: users.size,
      memberCount: members.size,
      messageCount: messages.size,
      mediaCount: media.size
    });
  } catch (err) {
    res.status(500).json({ error: 'Tatizo kwenye kupata takwimu.' });
  }
});

// Optional: Add a scoped summary route for scanner-based attendance
router.get('/system/scanner-summary', async (req, res) => {
  try {
    const startOfWeek = new Date(); // Replace with actual logic
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Sunday

    const snapshot = await db.collection('members')
      .where('registeredAt', '>=', startOfWeek)
      .where('method', '==', 'scanner')
      .get();

    res.json({ scannerCount: snapshot.size });
  } catch (err) {
    res.status(500).json({ error: 'Tatizo kwenye kupata takwimu za scanner.' });
  }
});

router.get('/secure-endpoint', verifyAuthToken, async (req, res) => {
  // protected logic
});

export default router;
