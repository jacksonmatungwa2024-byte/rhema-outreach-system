// routes/members.js
import express from 'express';
import db from '../firebase.js'; // Make sure firebase.js uses export default
import { verifyAuthToken } from './auth.js';

const router = express.Router();

router.get('/members/all', async (req, res) => {
  try {
    const snapshot = await db.collection('members')
      .orderBy('registeredAt', 'desc')
      .get();

    const members = snapshot.docs.map(doc => doc.data());
    res.json(members);
  } catch (err) {
    console.error('Members fetch error:', err);
    res.status(500).json({ error: 'Tatizo kwenye kupata waumini.' });
  }
});

router.get('/secure-endpoint', verifyAuthToken, async (req, res) => {
  // protected logic
});

export default router;
