const express = require('express');
const router = express.Router();
const db = require('../firebase');
const bcrypt = require('bcrypt');

router.post('/users/create', async (req, res) => {
  try {
    const { username, fullName, password, role } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    await db.collection('users').add({
      username,
      fullName,
      passwordHash,
      role,
      createdAt: new Date()
    });

    res.json({ message: '✅ Akaunti imeundwa kwa mafanikio.' });
  } catch (err) {
    console.error('User creation error:', err);
    res.status(500).json({ error: 'Tatizo kwenye kuunda akaunti.' });
  }
});

router.get('/users/all', async (req, res) => {
  try {
    const snapshot = await db.collection('users').orderBy('createdAt', 'desc').get();
    const users = snapshot.docs.map(doc => doc.data());
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Tatizo kwenye kupata watumiaji.' });
  }
});

router.post('/users/update-role', async (req, res) => {
  const { username, role } = req.body;
  const snapshot = await db.collection('users').where('username', '==', username).get();
  if (snapshot.empty) return res.status(404).json({ error: 'User not found' });

  const docId = snapshot.docs[0].id;
  await db.collection('users').doc(docId).update({ role });
  res.json({ message: 'Role updated' });
});

router.post('/users/update-status', async (req, res) => {
  const { username, status } = req.body;
  const snapshot = await db.collection('users').where('username', '==', username).get();
  if (snapshot.empty) return res.status(404).json({ error: 'User not found' });

  const docId = snapshot.docs[0].id;
  await db.collection('users').doc(docId).update({ status });
  res.json({ message: 'Status updated' });
});

router.post('/users/reset-password', async (req, res) => {
  const { username } = req.body;
  const snapshot = await db.collection('users').where('username', '==', username).get();
  if (snapshot.empty) return res.status(404).json({ error: 'User not found' });

  const docId = snapshot.docs[0].id;
  const bcrypt = require('bcrypt');
  const newHash = await bcrypt.hash('rhema123', 10); // default password
  await db.collection('users').doc(docId).update({ passwordHash: newHash });
  res.json({ message: 'Password reset' });
});

router.post('/users/update-role', async (req, res) => {
  const { username, role } = req.body;
  const snapshot = await db.collection('users').where('username', '==', username).get();
  if (snapshot.empty) return res.status(404).json({ error: 'User not found' });

  const docId = snapshot.docs[0].id;
  await db.collection('users').doc(docId).update({ role });
  res.json({ message: 'Role updated' });
});

router.post('/users/update-status', async (req, res) => {
  const { username, status } = req.body;
  const snapshot = await db.collection('users').where('username', '==', username).get();
  if (snapshot.empty) return res.status(404).json({ error: 'User not found' });

  const docId = snapshot.docs[0].id;
  await db.collection('users').doc(docId).update({ status });
  res.json({ message: 'Status updated' });
});

router.post('/users/reset-password', async (req, res) => {
  const { username } = req.body;
  const snapshot = await db.collection('users').where('username', '==', username).get();
  if (snapshot.empty) return res.status(404).json({ error: 'User not found' });

  const docId = snapshot.docs[0].id;
  const bcrypt = require('bcrypt');
  const newHash = await bcrypt.hash('rhema123', 10); // default password
  await db.collection('users').doc(docId).update({ passwordHash: newHash });
  res.json({ message: 'Password reset' });
});

router.post('/users/upload-photo', async (req, res) => {
  const { username, photoURL } = req.body;
  const snapshot = await db.collection('users').where('username', '==', username).get();
  if (snapshot.empty) return res.status(404).json({ error: 'User not found' });

  const docId = snapshot.docs[0].id;
  await db.collection('users').doc(docId).update({ photoURL });
  res.json({ message: 'Photo URL saved.' });
});

router.post('/users/update-permission', async (req, res) => {
  
  const { username, key, value } = req.body;
  const snapshot = await db.collection('users').where('username', '==', username).get();
  if (snapshot.empty) return res.status(404).json({ error: 'User not found' });

  const docId = snapshot.docs[0].id;
  await db.collection('users').doc(docId).update({
    [`permissions.${key}`]: value
  });

  res.json({ message: 'Permission updated' });
});


module.exports = router;