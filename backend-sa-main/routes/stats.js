const express = require('express');
const router = express.Router();
const StatsController = require('../controllers/statsController');
const { protect } = require('../middleware/auth');

// Rota pública para stats globais
router.get('/global', StatsController.getGlobalStats);

// Rota protegida para stats do usuário
router.get('/user', protect, StatsController.getUserStats);

module.exports = router;