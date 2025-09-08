// routes/analytics.js
import express from 'express';
import db from '../firebase.js';
import { verifyAuthToken } from './auth.js';

const router = express.Router();

router.get('/analytics/summary', async (req, res) => {
  try {
    const snapshot = await db.collection('members').get();
    const members = snapshot.docs.map(doc => doc.data());

    const dailyTotals = {};

    members.forEach(m => {
      const rawDate = m.registeredAt?.toDate?.();
      if (!rawDate) return;

      const date = rawDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      dailyTotals[date] = (dailyTotals[date] || 0) + 1;
    });

    const summary = Object.entries(dailyTotals)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json(summary);
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Tatizo kwenye takwimu.' });
  }
});

router.get('/secure-endpoint', verifyAuthToken, async (req, res) => {
  // protected logic
});

export default router;
