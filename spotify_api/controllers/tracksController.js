
const { fetchRecentlyPlayed, fetchTracks ,fetchTrackDetails, fetchArtistDetails } = require('../services/spotifyDataService');
const log = require('../logger');
const {getSuccessResponse, getErrorResponse} = require("../services/responseService");


const getRecentlyPlayed = async (req, res) => {
    const accessToken = req.headers.authorization?.replace(/bearer /i, "")
    console.log(accessToken)
    log.info('Requested recently played tracks');

    if (!accessToken) {
        log.error('Access token is not provided');
        return getErrorResponse(res, 401, 'Access token is not provided')
    }

    try {
        const tracks = await fetchRecentlyPlayed(accessToken);
        return getSuccessResponse(res, tracks);
    } catch (error) {
        log.error('Error while fetching recently played tracks', error.response?.data || error.message);
        if (error.status ===  401) {
            return getErrorResponse(res, error.status, 'Access token or user scope is not valid')
        }
        return getErrorResponse(res, error.status, 'Failed to fetch recently played tracks: ' + error.message)
    }
};

const searchTracks = async (req, res) => {
    let { query } = req.query;
    const accessToken = req.headers.authorization?.replace(/bearer /i, "")
    console.log(accessToken)
    log.info('Requested track searching...');

    if (!query) {
        log.error('Query parameter is not provided');
        return getErrorResponse(res, 400, 'Query parameter is required.')
    }
    if (!accessToken) {
        log.error('Access token is not provided');
        return getErrorResponse(res, 401, 'Access token is required.')
    }

    try {
        const tracks = await fetchTracks(accessToken, query);
        log.info('Successfully fetched searched tracks.');
        return getSuccessResponse(res, tracks);
    } catch (error) {
        log.error('Error while searching tracks', error.response?.data || error.message);
        if (error.status ===  401) {
            return getErrorResponse(res, error.status, 'Access token or user scope is not valid')
        }
        return getErrorResponse(res, error.status, 'Error while searching tracks: ' + error.message)
    }
};


const getTrackPreview = async (req, res) => {
    const { track_id } = req.query;
    const accessToken = req.headers.authorization?.replace(/bearer /i, "")
    console.log(accessToken)
    log.info('Requested track preview data...');

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
            track_name: trackDetails.name,
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
        if (error.status ===  401) {
            return getErrorResponse(res, error.status, 'Access token or user scope is not valid')
        }
        return getErrorResponse(res, error.status, 'Error while fetching track preview: ' + error.message)
    }
};

module.exports = { getRecentlyPlayed, searchTracks, getTrackPreview };
