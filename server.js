import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Retell from 'retell-sdk';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const retellClient = new Retell({ apiKey: process.env.RETELL_API_KEY });

const ALLOWED_AGENTS = [
  process.env.RETELL_AGENT_ID_1,
  process.env.RETELL_AGENT_ID_2,
].filter(Boolean);

app.post('/api/create-web-call', async (req, res) => {
  const { agent_id } = req.body;

  if (!agent_id) {
    return res.status(400).json({ error: 'agent_id is required' });
  }

  if (ALLOWED_AGENTS.length > 0 && !ALLOWED_AGENTS.includes(agent_id)) {
    return res.status(403).json({ error: 'Agent not allowed' });
  }

  try {
    const webCallResponse = await retellClient.call.createWebCall({ agent_id });
    res.json({ access_token: webCallResponse.access_token });
  } catch (err) {
    console.error('Retell API error:', err.message);
    res.status(500).json({ error: 'Failed to create web call' });
  }
});

app.use(express.static(join(__dirname, 'dist')));
app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
