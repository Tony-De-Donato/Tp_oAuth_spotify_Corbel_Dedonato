
const { getAuthorizationUrl, exchangeAuthorizationCode } = require('../services/spotifyAuthService');
const log = require('../logger');

/**
 * Fournit l'URL d'autorisation Spotify.
 * @param {object} req - Requête HTTP.
 * @param {object} res - Réponse HTTP.
 */
const getSpotifyAuthUrl = (req, res) => {
  const authUrl = getAuthorizationUrl();
  res.json({ url: authUrl });
  log.info('Spotify authorization URL sent');
};

/**
 * Gère le callback de Spotify après l'autorisation.
 * @param {object} req - Requête HTTP.
 * @param {object} res - Réponse HTTP.
 */
const handleSpotifyCallback = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    log.error('Authorization code not provided');
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  try {
    const tokenData = await exchangeAuthorizationCode(code);
    res.json(tokenData);
    log.info('Token data received successfully');
  } catch (error) {
    log.error('Error while exchanging authorization code for token', error.message || error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getSpotifyAuthUrl, handleSpotifyCallback };
