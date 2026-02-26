import Retell from 'retell-sdk';

const ALLOWED_AGENTS = [
  'agent_b102f121a6b37b2e6a4b4a1f79',
  'agent_05f11e21300b9eed83d7b4a89e',
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.SECRET_API_KEY_RETELL;
  if (!apiKey) {
    console.error('SECRET_API_KEY_RETELL is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const { agent_id } = req.body;

  if (!agent_id) {
    return res.status(400).json({ error: 'agent_id is required' });
  }

  if (!ALLOWED_AGENTS.includes(agent_id)) {
    return res.status(403).json({ error: 'Agent not allowed' });
  }

  try {
    const retellClient = new Retell({ apiKey });
    const webCallResponse = await retellClient.call.createWebCall({ agent_id });
    res.status(200).json({ access_token: webCallResponse.access_token });
  } catch (err) {
    console.error('Retell API error:', err.message);
    res.status(500).json({ error: 'Failed to create web call' });
  }
}
