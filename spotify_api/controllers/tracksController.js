const { fetchRecentlyPlayed, fetchTracks } = require('../services/spotifyApiService');
const axios = require('axios');
const log = require('../logger');

exports.getRecentlyPlayed = async (req, res) => {
  const accessTokenToMe = req.headers.authorization;
  log.info('Recently played tracks requested');

  if (!accessTokenToMe) {
    log.error('Access token is not provided');
    return res.status(401).json({ error: 'Access token is required' });
  }

  try {
    const tracks = await fetchRecentlyPlayed(accessTokenToMe);
    res.json(tracks);
    log.info(`Recently played tracks successfully fetched`);
  } catch (error) {
    log.error('Error while fetching recently played tracks', error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
};


exports.searchTracks = async (req, res) => {
    const { query } = req.query;
    const accessToken = req.headers.authorization;
    log.info('Search tracks requested');

    if (!query) {
        log.error('Query parameter is not provided');
        return res.status(400).json({ error: 'Query parameter is required.' });
    }
    if (!accessToken) {
        log.error('Access token is not provided');
        return res.status(401).json({ error: 'Access token is required.' });
    }

    try {
       const tracks = await fetchTracks(accessToken, query);
       res.json(tracks);
       log.info(`Tracks successfully fetched`);
    } catch (error) {
        console.error('Error while searching tracks', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to search tracks.' });
    }
};