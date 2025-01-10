const { getAuthorizationCodeUrl, getImplicitGrantUrl, exchangeAuthorizationCode } = require('../services/spotifyAuthService');
const log = require('../logger');
const {getSuccessResponse} = require("../services/responseService");


const getAuthCodeUrl = (req, res) => {
  getSuccessResponse(res, {url: getAuthorizationCodeUrl()})
  log.info('Successfully generated Authorization Code Grant URL');
};


const getImplicitAuthUrl = (req, res) => {
  getSuccessResponse(res, {url: getImplicitGrantUrl()})
  log.info('Successfully generated Implicit Grant URL');
};


const handleAuthCodeCallback = async (req, res) => {
  const code = req.query.code;

    if (!code) {
      res.status(200).json({ info: 'Token in url' });
      return;
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
