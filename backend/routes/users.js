// routes/users.js
import express from 'express';
import db from '../firebase.js';
import { logActivity } from '../utils/logger.js'; // optional logging
import { verifyAuthToken } from './auth.js';

const router = express.Router();

// 🔍 GET /users/all — Fetch all users
router.get('/users/all', async (req, res) => {
  try {
    const snapshot = await db.collection('users').orderBy('createdAt', 'desc').get();
    const users = snapshot.docs.map(doc => doc.data());
    res.json(users);
  } catch (err) {
    console.error('User fetch error:', err);
    res.status(500).json({ error: 'Tatizo kwenye kupata akaunti.' });
  }
});

// 🆕 POST /users/create — Create new user (admin-only)
router.post('/users/create', async (req, res) => {
  try {
    const { username, passwordHash, role, fullName } = req.body;
    const createdAt = new Date();

    await db.collection('users').add({
      username,
      passwordHash,
      role,
      fullName,
      status: 'active',
      createdAt,
      permissions: {
        viewItems: role === 'admin',
        viewAI: role === 'admin' || role === 'pastor',
        viewUsage: role === 'admin'
      }
    });

    await logActivity({
      username,
      role,
      action: 'Created user',
      context: 'admin.html'
    });

    res.json({ message: '✅ Akaunti imeundwa' });
  } catch (err) {
    console.error('User creation error:', err);
    res.status(500).json({ error: 'Tatizo kwenye kuunda akaunti.' });
  }
});

// 🔧 POST /users/update-permission — Update user permission
router.post('/users/update-permission', async (req, res) => {
  try {
    const { username, key, value } = req.body;
    const snapshot = await db.collection('users').where('username', '==', username).get();
    if (snapshot.empty) return res.status(404).json({ error: 'User not found' });

    const docId = snapshot.docs[0].id;
    await db.collection('users').doc(docId).update({
      [`permissions.${key}`]: value
    });

    res.json({ message: '✅ Ruhusa imesasishwa' });
  } catch (err) {
    console.error('Permission update error:', err);
    res.status(500).json({ error: 'Tatizo kwenye kusasisha ruhusa.' });
  }
});

// ❌ Optional: DELETE /users/remove — Delete user
router.delete('/users/remove', async (req, res) => {
  try {
    const { username } = req.body;
    const snapshot = await db.collection('users').where('username', '==', username).get();
    if (snapshot.empty) return res.status(404).json({ error: 'User not found' });

    const docId = snapshot.docs[0].id;
    await db.collection('users').doc(docId).delete();

    res.json({ message: '✅ Akaunti imefutwa' });
  } catch (err) {
    console.error('User deletion error:', err);
    res.status(500).json({ error: 'Tatizo kwenye kufuta akaunti.' });
  }
});

router.get('/secure-endpoint', verifyAuthToken, async (req, res) => {
  // protected logic
});

// models/users.js
export function validateUser(username, password) {
  // Basic validation logic (customize as needed)
  if (!username || !password) return false;
  if (password.length < 6) return false;
  return true;
}


export default router;
