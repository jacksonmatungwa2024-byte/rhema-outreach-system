const db = require('../firebase');

// ✅ Log a new attendance record
const logAttendance = async ({ fingerprintId, category, scannedBy, serviceType }) => {
  const record = {
    fingerprintId,
    category,
    scannedBy,
    serviceType,
    timestamp: new Date()
  };

  const docRef = await db.collection('attendance').add(record);
  return docRef.id;
};

// 📊 Get today's attendance summary
const getTodaySummary = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const snapshot = await db.collection('attendance')
    .where('timestamp', '>=', today)
    .get();

  let adultCount = 0;
  let childCount = 0;

  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.category === 'adult') adultCount++;
    if (data.category === 'child') childCount++;
  });

  return { adultCount, childCount };
};

// 📁 Get all attendance records (optional for admin dashboard)
const getAllAttendance = async () => {
  const snapshot = await db.collection('attendance')
    .orderBy('timestamp', 'desc')
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

module.exports = {
  logAttendance,
  getTodaySummary,
  getAllAttendance
};
