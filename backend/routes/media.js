// routes/media.js
import express from 'express';
import db from '../firebase.js'; // Make sure firebase.js uses export default
import { verifyAuthToken } from './auth.js';

const router = express.Router();

router.get('/media/all', async (req, res) => {
  try {
    const snapshot = await db.collection('media')
      .orderBy('uploadedAt', 'desc')
      .get();

    const media = snapshot.docs.map(doc => doc.data());
    res.json(media);
  } catch (err) {
    console.error('Media fetch error:', err);
    res.status(500).json({ error: 'Tatizo kwenye kupata picha.' });
  }
});

router.get('/secure-endpoint', verifyAuthToken, async (req, res) => {
  // protected logic
});

export default router;
