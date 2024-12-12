const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const tracksRoutes = require('./routes/tracksRoutes');

require('dotenv').config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/tracks', tracksRoutes);

module.exports = app;
