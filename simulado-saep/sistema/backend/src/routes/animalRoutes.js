/**
 * Rotas de Animais (Pacientes)
 */

const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const { verifyToken } = require('../controllers/authController');

// Todas as rotas requerem autenticação
router.use(verifyToken);

// GET /api/animais - Listar todos os animais
router.get('/', animalController.listar);

// GET /api/animais/:id - Buscar animal por ID
router.get('/:id', animalController.buscarPorId);

// GET /api/animais/:id/historico - Buscar histórico de consultas do animal
router.get('/:id/historico', animalController.buscarHistorico);

// POST /api/animais - Cadastrar novo animal
router.post('/', animalController.criar);

// PUT /api/animais/:id - Atualizar dados do animal
router.put('/:id', animalController.atualizar);

// DELETE /api/animais/:id - Excluir animal (soft delete)
router.delete('/:id', animalController.excluir);

module.exports = router;
