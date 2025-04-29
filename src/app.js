// app.js
const express = require('express');
const app = express();
const statusRoutes = require('./routes/statusRoutes');

app.use(express.json());

// Monta as rotas
app.use('/', statusRoutes); // Ou um prefixo como '/api'

module.exports = app;