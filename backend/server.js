// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors()); // Allow frontend to call backend

app.get('/api/data', async (req, res) => {
  try {
    let { playlist, pageToken } = req.query;
    if (!playlist) {
      return res.status(400).json({ error: 'Playlist ID is required' });
    }
    if (!pageToken) {
        pageToken = '';
    }
    const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${process.env.API_KEY}&playlistId=${playlist}&maxResults=50&pageToken=${pageToken}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
