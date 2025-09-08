const db = require('../firebase');

// ✅ Update system configuration
const updateConfig = async ({ enableSmsAlerts, enableWhatsappAlerts, showCountdown, currentServiceType, updatedBy }) => {
  const config = {
    enableSmsAlerts,
    enableWhatsappAlerts,
    showCountdown,
    currentServiceType,
    updatedBy,
    updatedAt: new Date()
  };

  const docRef = await db.collection('systemConfig').add(config);
  return docRef.id;
};

// 📥 Get latest system configuration
const getLatestConfig = async () => {
  const snapshot = await db.collection('systemConfig')
    .orderBy('updatedAt', 'desc')
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

// 📁 Get all config history (optional)
const getConfigHistory = async () => {
  const snapshot = await db.collection('systemConfig')
    .orderBy('updatedAt', 'desc')
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

module.exports = {
  updateConfig,
  getLatestConfig,
  getConfigHistory
};
