// routes/scan.js
import express from 'express';
import db from '../firebase.js';
import { logActivity } from '../utils/logger.js';
import { verifyAuthToken } from './auth.js';

const router = express.Router();

router.post('/register-member', async (req, res) => {
  try {
    const { type, gender, names, location, phone, usher, method } = req.body;
    const memberId = 'RHEMA-' + Math.floor(100000 + Math.random() * 900000);
    const timestamp = new Date();

    await db.collection('members').add({
      memberId,
      type,
      gender,
      names,
      location,
      phone,
      usher,
      method,
      registeredAt: timestamp
    });

    await logActivity({
      username: usher,
      role: 'usher',
      action: `Registered 1 mshiriki (${memberId})`,
      context: 'scan.html'
    });

    res.json({ message: '✅ Mshiriki amesajiliwa', memberId });
  } catch (err) {
    res.status(500).json({ error: 'Tatizo kwenye usajili.' });
  }
});

router.get('/secure-endpoint', verifyAuthToken, async (req, res) => {
  // protected logic
});

export default router;
