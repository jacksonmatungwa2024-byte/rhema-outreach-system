// firebase.js
import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-firebase-project.appspot.com' // replace with your actual bucket
});

const db = admin.firestore();
export default db;
