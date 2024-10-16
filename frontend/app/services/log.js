import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;

      // Send log message to Django backend
      await axios.post('http://localhost:8000/api/sys/log/', { message });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to log event' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

