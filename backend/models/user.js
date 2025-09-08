const db = require('../firebase');

// Add a new user
const addUser = async (username, password, role) => {
  const existing = await db.collection('users').where('username', '==', username).get();
  if (!existing.empty) throw new Error('Username already exists');

  const newUser = {
    username,
    password,
    role,
    createdAt: new Date()
  };

  const docRef = await db.collection('users').add(newUser);
  return docRef.id;
};

// Find user by username
const findUserByUsername = async (username) => {
  const snapshot = await db.collection('users').where('username', '==', username).get();
  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

// Validate login
const validateUser = async (username, password) => {
  const user = await findUserByUsername(username);
  if (!user || user.password !== password) return null;
  return user;
};

module.exports = {
  addUser,
  findUserByUsername,
  validateUser
};
