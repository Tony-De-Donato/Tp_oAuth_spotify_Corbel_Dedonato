const axios = require('axios');
require('dotenv').config();
const log = require('../logger');

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

/**
 * Génère une URL pour le flux Authorization Code Grant.
 * @returns {string} URL d'autorisation.
 */
const getAuthorizationCodeUrl = () => {
  const params = new URLSearchParams({
    response_type: 'code', // Authorization Code Grant
    client_id: process.env.SPOTIFY_CLIENT_ID,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    scope: 'user-read-recently-played',
  });

  log.info('Authorization Code Grant URL generated');
  return `${SPOTIFY_AUTH_URL}?${params.toString()}`;
};

/**
 * Génère une URL pour le flux Implicit Grant.
 * @returns {string} URL d'autorisation.
 */
const getImplicitGrantUrl = () => {
  const params = new URLSearchParams({
    response_type: 'token', // Implicit Grant
    client_id: process.env.SPOTIFY_CLIENT_ID,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    scope: 'user-read-recently-played',
  });

  log.info('Implicit Grant URL generated');
  return `${SPOTIFY_AUTH_URL}?${params.toString()}`;
};

/**
 * Échange un code d'autorisation pour obtenir un token Spotify.
 * @param {string} code - Code d'autorisation reçu.
 * @returns {Promise<object>} Données du token.
 */
const exchangeAuthorizationCode = async (code) => {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  log.info('Exchanging authorization code for token');
  const response = await axios.post(SPOTIFY_TOKEN_URL, params);
  return response.data;
};

module.exports = { getAuthorizationCodeUrl, getImplicitGrantUrl, exchangeAuthorizationCode };
