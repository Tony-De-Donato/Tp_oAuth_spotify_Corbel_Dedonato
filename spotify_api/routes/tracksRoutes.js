const express = require('express');
const { getRecentlyPlayed, searchTracks } = require('../controllers/tracksController');

const router = express.Router();

router.get('/recently-played', getRecentlyPlayed);


router.get('/search', searchTracks);

module.exports = router;


module.exports = router;
