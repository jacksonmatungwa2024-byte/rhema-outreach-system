// routes/messages.js
import express from 'express';
import db from '../firebase.js'; // Make sure firebase.js uses export default
import { verifyAuthToken } from './auth.js';

const router = express.Router();

router.get('/messages/all', async (req, res) => {
  try {
    const snapshot = await db.collection('messages').orderBy('time', 'desc').get();
    const messages = snapshot.docs.map(doc => doc.data());
    res.json(messages);
  } catch (err) {
    console.error('Message fetch error:', err);
    res.status(500).json({ error: 'Tatizo kwenye ujumbe.' });
  }
});

router.get('/secure-endpoint', verifyAuthToken, async (req, res) => {
  // protected logic
});

export default router;
