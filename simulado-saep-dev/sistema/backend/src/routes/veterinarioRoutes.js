const express = require('express');
const router = express.Router();
const { verifyToken } = require('../controllers/authController');

router.use(verifyToken);

router.get('/', (req, res) => res.json({ message: 'Listar veterinários' }));
router.get('/:id', (req, res) => res.json({ message: 'Buscar veterinário' }));
router.post('/', (req, res) => res.json({ message: 'Cadastrar veterinário' }));
router.put('/:id', (req, res) => res.json({ message: 'Atualizar veterinário' }));
router.delete('/:id', (req, res) => res.json({ message: 'Excluir veterinário' }));

module.exports = router;
