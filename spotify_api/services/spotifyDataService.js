
const { getOrSetCache } = require('./cacheService');
const { spotifyGet } = require('./spotifyApiService');
const log = require('../logger');

/**
 * Récupère les morceaux récemment joués.
 * @param {string} accessToken - Jeton d'accès Spotify.
 * @returns {Promise<object>} - Données des morceaux récemment joués.
 */
const fetchRecentlyPlayed = async (accessToken) => {
  const cacheKey = `recentlyPlayed:${accessToken}`;
  return getOrSetCache(cacheKey, async () => {
    const data = await spotifyGet('/v1/me/player/recently-played', accessToken);
    log.info('Données des morceaux récemment joués récupérées depuis l\'API.');
    return data;
  });
};

/**
 * Recherche des morceaux sur Spotify.
 * @param {string} accessToken - Jeton d'accès Spotify.
 * @param {string} searchQuery - Requête de recherche.
 * @returns {Promise<object>} - Résultats de recherche de morceaux.
 */
const fetchTracks = async (accessToken, searchQuery) => {
  const cacheKey = `searchTracks:${accessToken}:${searchQuery}`;
  return getOrSetCache(cacheKey, async () => {
    const data = await spotifyGet('/v1/search', accessToken, { query: searchQuery, type: 'track', limit: 10 });
    log.info(`Résultats de recherche pour '${searchQuery}' récupérés depuis l'API.`);
    return data;
  });
};



/**
 * Récupère les détails d'un morceau par son ID.
 * @param {string} trackId - ID du morceau.
 * @param {string} accessToken - Jeton d'accès Spotify.
 * @returns {Promise<object>} - Détails du morceau.
 */
const fetchTrackDetails = async (trackId, accessToken) => {
  const cacheKey = `trackDetails:${trackId}`;
  return getOrSetCache(cacheKey, async () => {
    const data = await spotifyGet(`/v1/tracks/${trackId}`, accessToken);
    log.info(`Détails du morceau pour '${trackId}' récupérés depuis l'API.`);
    return data;
  });
};

/**
 * Récupère les détails d'un artiste par son ID.
 * @param {string} artistId - ID de l'artiste.
 * @param {string} accessToken - Jeton d'accès Spotify.
 * @returns {Promise<object>} - Détails de l'artiste.
 */
const fetchArtistDetails = async (artistId, accessToken) => {
  const cacheKey = `artistDetails:${artistId}`;
  return getOrSetCache(cacheKey, async () => {
    const data = await spotifyGet(`/v1/artists/${artistId}`, accessToken);
    log.info(`Détails de l'artiste pour '${artistId}' récupérés depuis l'API.`);
    return data;
  });
};




module.exports = { fetchRecentlyPlayed, fetchTracks, fetchTrackDetails, fetchArtistDetails };
