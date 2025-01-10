const { getAuthorizationCodeUrl, getImplicitGrantUrl, exchangeAuthorizationCode } = require('../services/spotifyAuthService');
const log = require('../logger');


const getAuthCodeUrl = (req, res) => {
  const url = getAuthorizationCodeUrl();
  res.json({ url });
  log.info('Authorization Code Grant URL sent');
};


const getImplicitAuthUrl = (req, res) => {
  const url = getImplicitGrantUrl();
  res.json({ url });
  log.info('Implicit Grant URL sent');
};


const handleAuthCodeCallback = async (req, res) => {
  const code = req.query.code;

    if (!code) {
      res.status(200).json({ info: 'Token in url' });
      return;
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

module.exports = { getAuthCodeUrl, getImplicitAuthUrl, handleAuthCodeCallback };
