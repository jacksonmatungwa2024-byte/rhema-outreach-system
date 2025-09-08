// utils/jwt.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET || 'rhema_secret_key';

// 🔐 Generate JWT token
export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role
    },
    secret,
    { expiresIn: '1d' }
  );
}

// 🛡️ Verify JWT token
export function verifyToken(token) {
  return jwt.verify(token, secret);
}
