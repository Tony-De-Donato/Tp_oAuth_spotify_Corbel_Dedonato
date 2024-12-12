const axios = require('axios');
require('dotenv').config();

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

exports.getAuthorizationUrl = () => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    scope: 'user-read-recently-played'
  });
  console.log(`${SPOTIFY_AUTH_URL}?${params.toString()}`);
  return `${SPOTIFY_AUTH_URL}?${params.toString()}`;
};

exports.exchangeAuthorizationCode = async (code) => {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET
  });

  const response = await axios.post(SPOTIFY_TOKEN_URL, params);
  return response.data;
};
