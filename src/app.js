// app.js
const express = require('express');
const app = express();
const dispositivosRoutes = require('./routes/dispositivosRoutes');

app.use(express.json());

// Monta as rotas
app.use('/', dispositivosRoutes); // Ou um prefixo como '/api'

module.exports = app;