// routes/statusRoutes.js
const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

router.get('/status', statusController.getStatus);

module.exports = router;