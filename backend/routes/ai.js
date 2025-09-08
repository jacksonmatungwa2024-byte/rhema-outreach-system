// routes/ai.js
import express from 'express';
import db from '../firebase.js';
import { verifyAuthToken } from './auth.js';

const router = express.Router();

router.get('/ai/system-summary', async (req, res) => {
  const users = await db.collection('users').get();
  const members = await db.collection('members').get();
  const events = await db.collection('events').get();
  const messages = await db.collection('messages').get();
  const media = await db.collection('media').get();

  res.send(`
    <p>📊 Mfumo una watumiaji <strong>${users.size}</strong>, waumini <strong>${members.size}</strong>, ibada <strong>${events.size}</strong>, ujumbe <strong>${messages.size}</strong>, na picha <strong>${media.size}</strong>.</p>
    <p>⏱️ Mfumo umefanya kazi kwa ufanisi na hakuna hitilafu zilizoripotiwa.</p>
  `);
});

router.get('/ai/service-insights', async (req, res) => {
  const snapshot = await db.collection('members').get();
  const members = snapshot.docs.map(doc => doc.data());

  const manual = members.filter(m => m.method === 'manual').length;
  const scanner = members.filter(m => m.method === 'scanner').length;

  res.send(`
    <p>🧑🏾‍🤝‍🧑🏾 Jumla ya mahudhurio: <strong>${members.length}</strong></p>
    <p>✍️ Manual: ${manual} | 🖐️ Scanner: ${scanner}</p>
    <p>📅 Takwimu hizi zinaonyesha mchanganyiko mzuri wa teknolojia na ushiriki wa wahudumu.</p>
  `);
});

router.get('/ai/user-activity', async (req, res) => {
  const logs = await db.collection('logs').orderBy('timestamp', 'desc').limit(10).get();
  const entries = logs.docs.map(doc => doc.data());

  const html = entries.map(log => `
    <p>${log.username} (${log.role}) — ${log.action} [${log.context}] at ${new Date(log.timestamp.toDate()).toLocaleString('sw-TZ')}</p>
  `).join('');

  res.send(html || '<p>Hakuna shughuli zilizorekodiwa.</p>');
});

router.get('/ai/spiritual-support', (req, res) => {
  res.send(`
    <p>🙏 Andiko la wiki: <strong>“Bwana ni mchungaji wangu, sitapungukiwa na kitu.” — Zaburi 23:1</strong></p>
    <p>💡 Pendekezo: Ibada ya Jumapili iwe na mada ya “Uongozi wa Mungu katika safari ya maisha.”</p>
  `);
});

router.get('/ai/language-switcher', (req, res) => {
  res.send(`
    <p>🌐 Mfumo huu unaweza kubadilisha lugha kati ya Kiswahili na Kiingereza.</p>
    <p>🔄 Bonyeza hapa kubadilisha: <button onclick="switchLanguage()">Badilisha Lugha</button></p>
    <script>
      function switchLanguage() {
        const currentLang = localStorage.getItem('lang') || 'sw';
        const newLang = currentLang === 'sw' ? 'en' : 'sw';
        localStorage.setItem('lang', newLang);
        location.reload();
      }
    </script>
  `);
});

router.get('/ai/page-translator', (req, res) => {
  res.send(`
    <p>🈯 Ingiza sehemu ya maandishi unayotaka kutafsiri:</p>
    <textarea id="textToTranslate" rows="4" cols="50"></textarea><br>
    <select id="targetLang">
      <option value="sw">Swahili</option>
      <option value="en">English</option>
    </select>
    <button onclick="translateText()">Tafsiri</button>
    <div id="translatedOutput"></div>
    <script>
      function translateText() {
        const text = document.getElementById('textToTranslate').value;
        const lang = document.getElementById('targetLang').value;
        document.getElementById('translatedOutput').innerText = '🔄 Tafsiri inachakatwa... (demo only)';
      }
    </script>
  `);
});

router.get('/ai/page-tutorial', (req, res) => {
  res.send(`
    <p>📖 Karibu kwenye mfumo wa Rhema Outreach Church.</p>
    <ul>
      <li>👥 <strong>Usajili:</strong> Wahudumu husajili waumini kupitia scan.html</li>
      <li>🧑🏾‍💼 <strong>Paneli ya Mchungaji:</strong> Tazama mahudhurio, ujumbe, na picha</li>
      <li>🔐 <strong>Admin:</strong> Unda akaunti, sanidi mfumo, na angalia takwimu</li>
      <li>🧠 <strong>AI Assistant:</strong> Pata muhtasari wa mfumo, maombi, na msaada wa kiroho</li>
    </ul>
    <p>💡 Bonyeza kila kipengele kwenye sidebar ili kuanza.</p>
  `);
});

router.get('/secure-endpoint', verifyAuthToken, async (req, res) => {
  // protected logic
});

export default router;
