const db = require('../firebase');

// ✅ Log an action
const logAction = async ({ actor, role, action, details }) => {
  const entry = {
    actor,
    role,
    action,
    details,
    timestamp: new Date()
  };

  const docRef = await db.collection('auditLogs').add(entry);
  return docRef.id;
};

// 📁 Get recent audit logs
const getRecentLogs = async (limit = 100) => {
  const snapshot = await db.collection('auditLogs')
    .orderBy('timestamp', 'desc')
    .limit(limit)
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// 🔍 Filter logs by actor or role (optional)
const filterLogs = async ({ actor, role }) => {
  let query = db.collection('auditLogs');

  if (actor) query = query.where('actor', '==', actor);
  if (role) query = query.where('role', '==', role);

  const snapshot = await query.orderBy('timestamp', 'desc').get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

module.exports = {
  logAction,
  getRecentLogs,
  filterLogs
};
