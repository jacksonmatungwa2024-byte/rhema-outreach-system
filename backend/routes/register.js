// routes/register.js
import express from 'express';
import { verifyToken } from './auth.js';
import { addUser } from '../models/User.js';
import { logAction } from '../models/AuditLog.js';

const router = express.Router();

// POST /register — Admin creates new user
router.post('/', verifyToken, async (req, res) => {
  const { username, password, role } = req.body;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  if (!['admin', 'usher'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const userId = await addUser(username, password, role);

    await logAction({
      actor: req.user.username,
      role: req.user.role,
      action: 'registered user',
      details: `Username: ${username}, Role: ${role}`
    });

    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (err) {
    console.error('❌ Register error:', err.message);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});

router.get('/secure-endpoint', verifyAuthToken, async (req, res) => {
  // protected logic
});

export default router;
