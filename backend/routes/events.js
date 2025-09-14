// 🛡️ RCEMS Ibada Route
// 🇹🇿 Hii route inaunda ibada mpya na kutuma ujumbe kwa wachungaji na wasimamizi.
// Kila ibada ni agizo la kiroho. Kila ujumbe ni mwito wa huduma.

import express from 'express';
import db from '../firebase.js';

// 🔐 Auth middleware (adjust if exported as default)
import { verifyAuthToken } from './auth.js'; // or: import verifyAuthToken from './auth.js';

const router = express.Router();

// 📅 Create Event
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

    // 📣 Auto-message to ushers/admins
    await db.collection('messages').add({
      from: createdBy,
      role: 'pastor',
      message: `📅 Ibada mpya: ${title} - ${new Date(time).toLocaleString('sw-TZ')}. ${note || ''}`,
      time: new Date(),
      read: false
    });

    res.json({ message: '✅ Ibada imeundwa na ujumbe umetumwa.' });
  } catch (err) {
    console.error('🚨 Error creating event:', err);
    res.status(500).json({ error: 'Tatizo kwenye kuunda ibada.' });
  }
});

// 🔐 Protected Endpoint Example
router.get('/secure-endpoint', verifyAuthToken, async (req, res) => {
  res.json({ message: '✅ Umefikia sehemu salama ya huduma.' });
});

export default router;
