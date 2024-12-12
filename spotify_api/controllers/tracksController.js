const { fetchRecentlyPlayed, fetchTracks } = require('../services/spotifyApiService');
const axios = require('axios');

exports.getRecentlyPlayed = async (req, res) => {
  const accessTokenToMe = req.headers.authorization;

  if (!accessTokenToMe) {
    return res.status(401).json({ error: 'Access token is required' });
  }

  try {
    const tracks = await fetchRecentlyPlayed(accessTokenToMe);
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.searchTracks = async (req, res) => {
    const { query } = req.query;
    const accessToken = req.headers.authorization;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required.' });
    }
    if (!accessToken) {
        return res.status(401).json({ error: 'Access token is required.' });
    }

    try {
       const tracks = await fetchTracks(accessToken, query);
        res.json(tracks);
    } catch (error) {
        console.error('Erreur lors de la recherche de morceaux:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to search tracks.' });
    }
};