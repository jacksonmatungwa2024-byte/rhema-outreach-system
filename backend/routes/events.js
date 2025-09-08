// routes/events.js
import express from 'express';
import db from '../firebase.js';
import { verifyAuthToken } from './auth.js';

const router = express.Router();

router.post('/events/create', async (req, res) => {
  try {
    const { title, time, note, createdBy } = req.body;

    const event = {
      title,
      time: new Date(time),
      note,
      createdBy,
      createdAt: new Date()
    };

    await db.collection('events').add(event);

    // Auto-message to ushers/admins
    await db.collection('messages').add({
      from: createdBy,
      role: 'pastor',
      message: `📅 Ibada mpya: ${title} - ${new Date(time).toLocaleString('sw-TZ')}. ${note || ''}`,
      time: new Date(),
      read: false
    });

    res.json({ message: '✅ Event created and message sent.' });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ error: 'Tatizo kwenye kuunda ibada.' });
  }
});

router.get('/secure-endpoint', verifyAuthToken, async (req, res) => {
  // protected logic
});

export default router;
