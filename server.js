// server.js
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
console.log('Render sees:', fs.readdirSync('./routes'));
// 🛠️ Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🚀 Initialize Express
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('<h2>✅ Rhema Attendance Backend is Running</h2>');
});


// 🔗 Import Routes (with .js extensions)
import eventRoutes from './routes/events.js';
import setupRoutes from './routes/setup.js';
import configRoutes from './routes/config.js';
import userRoutes from './routes/users.js';
import itemRoutes from './routes/items.js';
import systemRoutes from './routes/system.js';
import mediaRoutes from './routes/media.js';
import aiRoutes from './routes/ai.js';
import scanRoutes from './routes/scan.js';
import memberRoutes from './routes/members.js';
import messageRoutes from './routes/messages.js';
import analyticsRoutes from './routes/analytics.js';
import authRoutes from './routes/auth.js';



// 🧩 Mount Routes
app.use('/', aiRoutes);
app.use('/', mediaRoutes);
app.use('/', systemRoutes);
app.use('/', itemRoutes);
app.use('/', userRoutes);
app.use('/', configRoutes);
app.use('/', setupRoutes);
app.use('/', eventRoutes);
app.use('/', scanRoutes);
app.use('/', memberRoutes);
app.use('/', messageRoutes);
app.use('/', analyticsRoutes);
app.use('/', authRoutes);

// 🏁 Start Server
app.listen(3000, () => {
  console.log('✅ RCEMS backend running at http://localhost:3000');
});
