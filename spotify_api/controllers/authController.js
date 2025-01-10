const { getAuthorizationCodeUrl, getImplicitGrantUrl, exchangeAuthorizationCode } = require('../services/spotifyAuthService');
const log = require('../logger');
const {getSuccessResponse} = require("../services/responseService");

/**
 * Fournit l'URL pour Authorization Code Grant.
 * @param {object} req - Requête HTTP.
 * @param {object} res - Réponse HTTP.
 */
const getAuthCodeUrl = (req, res) => {
  getSuccessResponse(res, {url: getAuthorizationCodeUrl()})
  log.info('Successfully generated Authorization Code Grant URL');
};

/**
 * Fournit l'URL pour Implicit Grant.
 * @param {object} req - Requête HTTP.
 * @param {object} res - Réponse HTTP.
 */
const getImplicitAuthUrl = (req, res) => {
  getSuccessResponse(res, {url: getImplicitGrantUrl()})
  log.info('Successfully generated Implicit Grant URL');
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
    log.info('Successfully exchanged token data');
    return getSuccessResponse(res, tokenData);
  } catch (error) {
    log.error('Error while exchanging authorization code for token', error.message || error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAuthCodeUrl, getImplicitAuthUrl, handleAuthCodeCallback };
