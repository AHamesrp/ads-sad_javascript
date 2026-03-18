const { body, validationResult } = require('express-validator');

// Middleware para verificar erros de validação
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: errors.array()
    });
  }
  next();
};

// Validações para registro de usuário
const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email inválido'),
  
  body('phone')
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)
    .withMessage('Formato de telefone inválido. Use: (11) 99999-9999'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter no mínimo 6 caracteres'),
  
  handleValidationErrors
];

// Validações para login
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email inválido'),
  
  body('password')
    .notEmpty()
    .withMessage('Senha é obrigatória'),
  
  handleValidationErrors
];

// Validações para criação de carona
const validateRideCreation = [
  body('origin.city')
    .trim()
    .notEmpty()
    .withMessage('Cidade de origem é obrigatória'),
  
  body('destination.city')
    .trim()
    .notEmpty()
    .withMessage('Cidade de destino é obrigatória'),
  
  body('departureDate')
    .isISO8601()
    .withMessage('Data de partida inválida'),
  
  body('departureTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Formato de hora inválido (HH:MM)'),
  
  body('availableSeats')
    .isInt({ min: 1, max: 4 })
    .withMessage('Número de assentos deve ser entre 1 e 4'),
  
  body('pricePerSeat')
    .isFloat({ min: 1 })
    .withMessage('Preço deve ser maior que R$ 1'),
  
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validateLogin,
  validateRideCreation,
  handleValidationErrors
};