const express = require('express');
const router = express.Router();
const { verifyToken } = require('../controllers/authController');

router.use(verifyToken);

router.get('/', (req, res) => res.json({ message: 'Listar tutores' }));
router.get('/:id', (req, res) => res.json({ message: 'Buscar tutor' }));
router.post('/', (req, res) => res.json({ message: 'Criar tutor' }));
router.put('/:id', (req, res) => res.json({ message: 'Atualizar tutor' }));
router.delete('/:id', (req, res) => res.json({ message: 'Excluir tutor' }));

module.exports = router;
