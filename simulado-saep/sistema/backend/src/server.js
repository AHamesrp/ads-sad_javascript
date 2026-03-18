/**
 * SISTEMA DE GESTÃO DE PACIENTES VETERINÁRIOS
 * Backend - Servidor Principal
 * 
 * Arquivo: server.js
 * Descrição: Configuração e inicialização do servidor Express
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/database');

// Importar rotas
const authRoutes = require('./routes/authRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const animalRoutes = require('./routes/animalRoutes');
const consultaRoutes = require('./routes/consultaRoutes');
const veterinarioRoutes = require('./routes/veterinarioRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log de requisições (desenvolvimento)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/tutores', tutorRoutes);
app.use('/api/animais', animalRoutes);
app.use('/api/consultas', consultaRoutes);
app.use('/api/veterinarios', veterinarioRoutes);

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        message: 'API do Sistema de Gestão Veterinária',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            tutores: '/api/tutores',
            animais: '/api/animais',
            consultas: '/api/consultas',
            veterinarios: '/api/veterinarios'
        }
    });
});

// Tratamento de rotas não encontradas
app.use((req, res) => {
    res.status(404).json({
        error: 'Rota não encontrada',
        path: req.path
    });
});

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro:', err.stack);
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`\n🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
    console.log(`🌐 Ambiente: ${process.env.NODE_ENV || 'development'}\n`);
});

// Testar conexão com banco de dados
db.getConnection()
    .then(connection => {
        console.log('✅ Conexão com banco de dados estabelecida');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Erro ao conectar com banco de dados:', err.message);
        console.error('❌ Detalhes completos:', err);
    });
