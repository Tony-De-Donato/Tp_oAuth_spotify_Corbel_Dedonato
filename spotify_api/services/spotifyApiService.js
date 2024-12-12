const axios = require('axios');


exports.fetchRecentlyPlayed = async (accessTokenToMe) => {
  const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
    headers: {
      Authorization: `Bearer ${accessTokenToMe}`
    }
  });
  return response.data;
};

exports.fetchTracks = async (accessTokenToMe, trackId) => {
  const response = await axios.get('https://api.spotify.com/v1/search', {
    headers: {
      Authorization: `Bearer ${accessTokenToMe}`
    },
    params: {
      q: trackId,
      type: 'track',
      limit: 10
    }
  });
  return response.data;
}