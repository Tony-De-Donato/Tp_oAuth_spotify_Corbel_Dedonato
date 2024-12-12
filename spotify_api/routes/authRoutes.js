const express = require('express');
const { getSpotifyAuthUrl, handleSpotifyCallback } = require('../controllers/authController');

const router = express.Router();

router.get('/login', getSpotifyAuthUrl);
router.get('/callback', handleSpotifyCallback);

module.exports = router;
