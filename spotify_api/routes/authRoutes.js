const express = require('express');
const { getAuthCodeUrl, getImplicitAuthUrl, handleAuthCodeCallback } = require('../controllers/authController');

const router = express.Router();

router.get('/callback', handleAuthCodeCallback);

// Authorization Code Grant
router.get('/authcode', getAuthCodeUrl);

// Implicit Grant
router.get('/implicit', getImplicitAuthUrl);

module.exports = router;

