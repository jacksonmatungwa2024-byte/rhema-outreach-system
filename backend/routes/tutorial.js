// tutorial.js
import express from 'express';
const router = express.Router();

router.get('/tutorial/:role', async (req, res) => {
  const role = req.params.role;
  let content = '';

  if (role === 'usher') {
    content = `
      <ul>
        <li>✅ Fungua <strong>scan.html</strong></li>
        <li>📍 Sajili waumini kwa mikono au scanner</li>
        <li>📤 Tuma ujumbe kwa admin</li>
      </ul>
    `;
  } else if (role === 'pastor') {
    content = `
      <ul>
        <li>📊 Tazama mahudhurio</li>
        <li>🖼️ Angalia picha za ibada</li>
        <li>🧠 Pata muhtasari wa AI</li>
      </ul>
    `;
  } else if (role === 'admin') {
    content = `
      <ul>
        <li>🔐 Unda akaunti</li>
        <li>⚙️ Sanidi mfumo</li>
        <li>📊 Angalia takwimu</li>
      </ul>
    `;
  } else {
    content = `<p>🚧 Hakuna mafunzo yaliyosanidiwa kwa <strong>${role}</strong> bado.</p>`;
  }

  res.send(content);
});

router.get('/secure-endpoint', verifyAuthToken, async (req, res) => {
  // protected logic
});

export default router;
