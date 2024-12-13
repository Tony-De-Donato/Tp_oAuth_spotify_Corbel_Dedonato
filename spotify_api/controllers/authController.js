const { getAuthorizationUrl, exchangeAuthorizationCode } = require('../services/spotifyAuthService');
const log = require('../logger');

exports.getSpotifyAuthUrl = (req, res) => {
  const authUrl = getAuthorizationUrl();
  res.json({ url: authUrl });
};


exports.handleSpotifyCallback = async (req, res) => {
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
    res.status(500).json({ error: error.message });
    log.error('Error while exchanging authorization code for token', error);
  }
};
