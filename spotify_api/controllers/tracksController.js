
const { fetchRecentlyPlayed, fetchTracks ,fetchTrackDetails, fetchArtistDetails } = require('../services/spotifyApiService');
const log = require('../logger');

/**
 * Récupère les morceaux récemment joués.
 * @param {object} req - Requête HTTP.
 * @param {object} res - Réponse HTTP.
 */
const getRecentlyPlayed = async (req, res) => {
    const accessTokenToMe = req.headers.authorization;
    log.info('Recently played tracks requested');

    if (!accessTokenToMe) {
        log.error('Access token is not provided');
        return res.status(401).json({ error: 'Access token is required' });
    }

    try {
        const tracks = await fetchRecentlyPlayed(accessTokenToMe);
        res.json(tracks);
        log.info('Recently played tracks successfully fetched');
    } catch (error) {
        log.error('Error while fetching recently played tracks', error.response?.data || error.message);
        res.status(500).json({ error: error.message });
    }
};

/**
 * Recherche des morceaux sur Spotify.
 * @param {object} req - Requête HTTP.
 * @param {object} res - Réponse HTTP.
 */
const searchTracks = async (req, res) => {
    const { query } = req.query;
    const accessToken = req.headers.authorization;
    log.info('Search tracks requested');

    if (!query) {
        log.error('Query parameter is not provided');
        return res.status(400).json({ error: 'Query parameter is required.' });
    }
    if (!accessToken) {
        log.error('Access token is not provided');
        return res.status(401).json({ error: 'Access token is required.' });
    }

    try {
        const tracks = await fetchTracks(accessToken, query);
        res.json(tracks);
        log.info('Tracks successfully fetched');
    } catch (error) {
        log.error('Error while searching tracks', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to search tracks.' });
    }
};


/**
 * Récupère des informations sur un morceau.
 * @param {object} req - Requête HTTP.
 * @param {object} res - Réponse HTTP.
 */
const getTrackPreview = async (req, res) => {
    const { track_id } = req.query;
    const accessToken = req.headers.authorization;
    log.info('Track preview requested');

    if (!track_id) {
        log.error('Track ID is not provided');
        return res.status(400).json({ error: 'Track ID is required.' });
    }
    if (!accessToken) {
        log.error('Access token is not provided');
        return res.status(401).json({ error: 'Access token is required.' });
    }

    try {
        const trackDetails = await fetchTrackDetails(track_id, accessToken);

        if (!trackDetails || !trackDetails.album || !trackDetails.artists[0]) {
            log.error('Track details are incomplete.');
            return res.status(404).json({ error: 'Track details not found.' });
        }

        const artistId = trackDetails.artists[0].id;
        const artistDetails = await fetchArtistDetails(artistId, accessToken);
        const response = {
            album_img: trackDetails.album.images[0]?.url || null,
            album_name: trackDetails.album.name,
            release_date: trackDetails.album.release_date,
            artist_img: artistDetails.images[0]?.url || null,
            artist_name: artistDetails.name,
            popularity: trackDetails.popularity
        };

        res.status(200).json(response);
    } catch (error) {
        log.error('Error while fetching track', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch track preview.' });
    }
};

module.exports = { getRecentlyPlayed, searchTracks, getTrackPreview };
