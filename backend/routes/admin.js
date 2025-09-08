// routes/admin.js
import express from 'express';
import { verifyToken } from './auth.js';
import { getTodaySummary } from '../models/Attendance.js';
import { getRecentLogs } from '../models/AuditLog.js';
import { getAllRecipients } from '../models/SmsRecipient.js';
import protect from '../middleware/auth.js'; // assuming this is a default export

const router = express.Router();

// 🔐 POST /admin/scan — placeholder for protected scan logic
router.post('/scan', protect, async (req, res) => {
  // req.user is now available
  res.json({ message: '✅ Scan route protected and ready.' });
});

// 📊 GET /admin/summary — today's attendance summary
router.get('/summary', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const summary = await getTodaySummary();
    res.json({ summary });
  } catch (err) {
    console.error('❌ Summary error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 📋 GET /admin/audit — recent activity logs
router.get('/audit', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const logs = await getRecentLogs();
    res.json({ logs });
  } catch (err) {
    console.error('❌ Audit error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 📱 GET /admin/recipients — SMS recipient list
router.get('/recipients', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const recipients = await getAllRecipients();
    res.json({ recipients });
  } catch (err) {
    console.error('❌ Recipient error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/secure-endpoint', verifyAuthToken, async (req, res) => {
  // protected logic
});

export default router;
