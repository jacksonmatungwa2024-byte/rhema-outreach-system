// routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../firebase.js';
import { generateToken, verifyToken } from '../utils/jwt.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// 🔐 POST /auth/login — Authenticate user and return token
router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const snapshot = await db.collection('users').where('username', '==', username).get();
    if (snapshot.empty) return res.status(401).json({ error: 'User not found' });

    const user = snapshot.docs[0].data();
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Wrong password' });

    const token = generateToken({ username: user.username, role: user.role });
    res.json({ username: user.username, role: user.role, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Tatizo kwenye kuingia.' });
  }
});

// 🛡️ Middleware: verifyAuthToken
export const verifyAuthToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};


export default router;
