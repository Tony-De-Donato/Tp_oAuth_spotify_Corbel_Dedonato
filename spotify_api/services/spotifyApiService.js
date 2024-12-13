
const { getOrSetCache } = require('./cacheService');
const { spotifyGet } = require('./spotifyApi');
const log = require('../logger');

/**
 * Récupère les morceaux récemment joués.
 * @param {string} accessTokenToMe - Jeton d'accès Spotify.
 * @returns {Promise<object>} - Données des morceaux récemment joués.
 */
exports.fetchRecentlyPlayed = async (accessTokenToMe) => {
  const cacheKey = `recentlyPlayed:${accessTokenToMe}`;
  return getOrSetCache(cacheKey, async () => {
    const data = await spotifyGet('/v1/me/player/recently-played', accessTokenToMe);
    log.info('Données des morceaux récemment joués récupérées depuis l\'API.');
    return data;
  });
};

/**
 * Recherche des morceaux sur Spotify.
 * @param {string} accessTokenToMe - Jeton d'accès Spotify.
 * @param {string} searchQuery - Requête de recherche.
 * @returns {Promise<object>} - Résultats de recherche de morceaux.
 */
exports.fetchTracks = async (accessTokenToMe, searchQuery) => {
  const cacheKey = `searchTracks:${accessTokenToMe}:${searchQuery}`;
  return getOrSetCache(cacheKey, async () => {
    const data = await spotifyGet('/v1/search', accessTokenToMe, { q: searchQuery, type: 'track', limit: 10 });
    log.info(`Résultats de recherche pour '${searchQuery}' récupérés depuis l'API.`);
    return data;
  });
};
