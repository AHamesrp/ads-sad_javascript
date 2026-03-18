const express = require('express');
const router = express.Router();
const { verifyToken } = require('../controllers/authController');

router.use(verifyToken);

router.get('/', (req, res) => res.json({ message: 'Listar consultas' }));
router.get('/:id', (req, res) => res.json({ message: 'Buscar consulta' }));
router.post('/', (req, res) => res.json({ message: 'Agendar consulta' }));
router.put('/:id', (req, res) => res.json({ message: 'Atualizar consulta' }));
router.delete('/:id', (req, res) => res.json({ message: 'Cancelar consulta' }));

module.exports = router;
