const axios = require('axios');

/**
 * Effectue une requête GET à l'API Spotify.
 * @param {string} endpoint - Endpoint de l'API Spotify (ex. '/v1/me/player/recently-played').
 * @param {string} accessToken - Jeton d'accès pour l'utilisateur.
 * @param {object} [params={}] - Paramètres optionnels de la requête.
 * @returns {Promise<object>} - Données renvoyées par l'API Spotify.
 */
const spotifyGet = async (endpoint, accessToken, params = {}) => {
    const response = await axios.get(`https://api.spotify.com${endpoint}`, {
        headers: {
            Authorization: accessToken,
        },
        params
    });
    return response.data;
};

module.exports = { spotifyGet };
