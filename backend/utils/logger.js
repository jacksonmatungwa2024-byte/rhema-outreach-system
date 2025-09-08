// utils/logger.js
import db from '../firebase.js';

export async function logActivity({ username, role, action, context }) {
  const timestamp = new Date();
  await db.collection('logs').add({
    username,
    role,
    action,
    context,
    timestamp
  });
}
