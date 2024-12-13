
const axios = require('axios');
require('dotenv').config();
const log = require('../logger');

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

/**
 * Génère une URL d'autorisation Spotify.
 * @returns {string} - URL d'autorisation Spotify.
 */
const getAuthorizationUrl = () => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    scope: 'user-read-recently-played'
  });
  log.info('Auth URL requested for client ID: ' + process.env.SPOTIFY_CLIENT_ID);
  log.info('Redirecting to Spotify authorization URL: ' + `${SPOTIFY_AUTH_URL}?${params.toString()}`);
  return `${SPOTIFY_AUTH_URL}?${params.toString()}`;
};

/**
 * Échange un code d'autorisation contre un token Spotify.
 * @param {string} code - Code d'autorisation reçu de Spotify.
 * @returns {Promise<object>} - Données d'authentification (token).
 */
const exchangeAuthorizationCode = async (code) => {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET
  });

  log.info('Exchanging authorization code for token of client ID: ' + process.env.SPOTIFY_CLIENT_ID);

  const response = await axios.post(SPOTIFY_TOKEN_URL, params);
  return response.data;
};

module.exports = { getAuthorizationUrl, exchangeAuthorizationCode };
