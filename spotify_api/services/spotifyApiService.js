const axios = require('axios');
const log = require("../logger");

exports.fetchRecentlyPlayed = async (accessTokenToMe) => {
  const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
    headers: {
      Authorization: `Bearer ${accessTokenToMe}`
    }
  });
  return response.data;
};

exports.fetchTracks = async (accessTokenToMe, searchQuery) => {
  const response = await axios.get('https://api.spotify.com/v1/search', {
    headers: {
      Authorization: `Bearer ${accessTokenToMe}`
    },
    params: {
      q: searchQuery,
      type: 'track',
      limit: 10
    }
  });
  log.info(`Searching tracks by title or artist : ${searchQuery}`);
  return response.data;
}