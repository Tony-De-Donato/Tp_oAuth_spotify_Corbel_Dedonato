const { getAuthorizationUrl, exchangeAuthorizationCode } = require('../services/spotifyAuthService');

exports.getSpotifyAuthUrl = (req, res) => {
  const authUrl = getAuthorizationUrl();
  res.json({ url: authUrl });
};


exports.handleSpotifyCallback = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  try {
    const tokenData = await exchangeAuthorizationCode(code);
    res.json(tokenData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
