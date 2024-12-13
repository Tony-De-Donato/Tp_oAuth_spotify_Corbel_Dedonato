const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const tracksRoutes = require('./routes/tracksRoutes');
const rateLimit = require('express-rate-limit');
require('dotenv').config();


const app = express();

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requêtes max par IP par fenêtre
    message: 'Too many requests from this IP, please try again after 15 minutes',
    headers: true,
});

app.use(cors());
app.use(apiLimiter);

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/tracks', tracksRoutes);

module.exports = app;
