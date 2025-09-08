// routes/config.js
import express from 'express';
import db from '../firebase.js'; // Ensure firebase.js uses export default
import { verifyAuthToken } from './auth.js';

const router = express.Router();

// 🛠️ POST /config/setup — Save church configuration
router.post('/config/setup', async (req, res) => {
  try {
    const config = req.body;
    await db.collection('config').doc('church').set(config);
    res.json({ message: '✅ Church configuration saved.' });
  } catch (err) {
    console.error('Config error:', err);
    res.status(500).json({ error: 'Tatizo kwenye kuhifadhi taarifa.' });
  }
});

// 🔍 GET /config/church — Retrieve church configuration
router.get('/config/church', async (req, res) => {
  try {
    const doc = await db.collection('config').doc('church').get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Hakuna taarifa za kanisa.' });
    }
    res.json(doc.data());
  } catch (err) {
    console.error('Config fetch error:', err);
    res.status(500).json({ error: 'Tatizo kwenye kupata taarifa.' });
  }
});

router.get('/secure-endpoint', verifyAuthToken, async (req, res) => {
  // protected logic
});

export default router;
