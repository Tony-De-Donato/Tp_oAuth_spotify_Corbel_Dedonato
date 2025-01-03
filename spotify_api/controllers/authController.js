const { getAuthorizationCodeUrl, getImplicitGrantUrl, exchangeAuthorizationCode } = require('../services/spotifyAuthService');
const log = require('../logger');

/**
 * Fournit l'URL pour Authorization Code Grant.
 * @param {object} req - Requête HTTP.
 * @param {object} res - Réponse HTTP.
 */
const getAuthCodeUrl = (req, res) => {
  const url = getAuthorizationCodeUrl();
  res.json({ url });
  log.info('Authorization Code Grant URL sent');
};

/**
 * Fournit l'URL pour Implicit Grant.
 * @param {object} req - Requête HTTP.
 * @param {object} res - Réponse HTTP.
 */
const getImplicitAuthUrl = (req, res) => {
  const url = getImplicitGrantUrl();
  res.json({ url });
  log.info('Implicit Grant URL sent');
};

/**
 * Gère le callback pour Authorization Code Grant.
 * @param {object} req - Requête HTTP.
 * @param {object} res - Réponse HTTP.
 */
const handleAuthCodeCallback = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    if (req.url.toString().includes('access_token')) {
        log.info('Implicit Grant token received successfully');
        // return res.json(res.url);
    } else {
      log.error('Authorization code not provided');
      return res.status(400).json({error: 'Authorization code is required'});
    }
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
