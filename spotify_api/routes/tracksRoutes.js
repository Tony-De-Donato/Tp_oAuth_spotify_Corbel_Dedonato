const express = require('express');
const { getRecentlyPlayed, searchTracks, getTrackPreview } = require('../controllers/tracksController');

const router = express.Router();

router.get('/recently-played', getRecentlyPlayed);
router.get('/search', searchTracks);
router.get('/preview', getTrackPreview);

module.exports = router;
