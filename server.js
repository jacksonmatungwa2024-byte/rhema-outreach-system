// 🛡️ RCEMS Backend Entry Point
// 🇹🇿 Kila route ni lango la huduma. Kila import ni chombo cha urithi.

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// 🛠️ Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔍 Diagnostic: Confirm visibility of routes
console.log('Render sees:', fs.readdirSync('./backend/routes'));

// 🚀 Initialize Express
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 🏠 Root Endpoint
app.get('/', (req, res) => {
  res.send('<h2>✅ Rhema Attendance Backend is Running</h2>');
});

// 🔗 Import Routes (corrected for backend folder)
import eventRoutes from './backend/routes/events.js';
// Add others like:
// import authRoutes from './backend/routes/auth.js';

app.use('/', eventRoutes);
// app.use('/', authRoutes); // Add others as needed

// 🕊️ Start Server
app.listen(3000, () => {
  console.log('✅ RCEMS backend running at http://localhost:3000');
});
