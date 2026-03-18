const express = require('express');
const router = express.Router();
const RideController = require('../controllers/rideController');
const { protect } = require('../middleware/auth');
const { validateRideCreation } = require('../middleware/validation');

// Rotas públicas
router.get('/search', RideController.searchRides);
router.get('/popular', RideController.getPopularRides);
router.get('/:id', RideController.getRide);

// Rotas protegidas
router.post('/', protect, validateRideCreation, RideController.createRide);
router.post('/:id/book', protect, RideController.bookRide);
router.get('/user/rides', protect, RideController.getUserRides);

module.exports = router;