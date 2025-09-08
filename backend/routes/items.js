// routes/items.js
import express from 'express';
import db from '../firebase.js';
import { verifyAuthToken } from './auth.js';

const router = express.Router();

// 🆕 POST /items/create — Save new item
router.post('/items/create', async (req, res) => {
  try {
    const item = { ...req.body, createdAt: new Date() };
    await db.collection('items').add(item);
    res.json({ message: '✅ Item saved.' });
  } catch (err) {
    console.error('Item creation error:', err);
    res.status(500).json({ error: 'Tatizo kwenye kuhifadhi kitu.' });
  }
});

// 🔍 GET /items/all — Public or unrestricted view
router.get('/items/all', async (req, res) => {
  try {
    const snapshot = await db.collection('items')
      .orderBy('createdAt', 'desc')
      .get();

    const items = snapshot.docs.map(doc => doc.data());
    res.json(items);
  } catch (err) {
    console.error('Item fetch error:', err);
    res.status(500).json({ error: 'Tatizo kwenye kupata vitu.' });
  }
});

// 🔐 GET /items/secure — Role-based restricted view
router.get('/items/secure', async (req, res) => {
  const user = req.user; // assumes auth middleware is applied
  if (!user?.permissions?.viewItems) {
    return res.status(403).json({ error: 'Access denied to item configuration.' });
  }

  try {
    const snapshot = await db.collection('items').get();
    const items = snapshot.docs.map(doc => doc.data());
    res.json(items);
  } catch (err) {
    console.error('Secure item fetch error:', err);
    res.status(500).json({ error: 'Tatizo kwenye kupata vitu kwa ruhusa maalum.' });
  }
});

router.get('/secure-endpoint', verifyAuthToken, async (req, res) => {
  // protected logic
});

export default router;
