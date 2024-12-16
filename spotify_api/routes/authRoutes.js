const express = require('express');
const { getAuthCodeUrl, getImplicitAuthUrl, handleAuthCodeCallback } = require('../controllers/authController');

const router = express.Router();

// Authorization Code Grant
router.get('/authcode', getAuthCodeUrl);
router.get('/callback', handleAuthCodeCallback);

// Implicit Grant
router.get('/implicit', getImplicitAuthUrl);

module.exports = router;

