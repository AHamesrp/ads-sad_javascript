const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateUserRegistration, validateLogin } = require('../middleware/validation');

// Rotas públicas
router.post('/register', validateUserRegistration, AuthController.register);
router.post('/login', validateLogin, AuthController.login);

// Rotas protegidas
router.get('/profile', protect, AuthController.getProfile);
router.put('/profile', protect, AuthController.updateProfile);

module.exports = router;