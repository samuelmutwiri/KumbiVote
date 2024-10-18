import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;
      const accessToken  = localStorage.getItem('accessToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };

      // Send log message to Django backend
      const response = await axios.post('http://localhost:8000/api/sys/log/', { message });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to log event' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

