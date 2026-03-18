const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
require('dotenv').config();

// Importar middleware personalizado
const errorHandler = require('./middleware/errorHandler');

// Importar rotas
const authRoutes = require('./routes/auth');
const rideRoutes = require('./routes/rides');
const statsRoutes = require('./routes/stats');

const app = express();

// Middlewares de segurança
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000 || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: {
    success: false,
    message: 'Muitas requisições. Tente novamente em alguns minutos.'
  }
});
app.use('/api', limiter);

// Middlewares gerais
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use('/uploads', express.static('uploads'));

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'EcoRide API está funcionando!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/stats', statsRoutes);

// Rota para endpoints não encontrados
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Rota ${req.originalUrl} não encontrada`
//   });
// });

// Middleware de tratamento de erros
app.use(errorHandler);

module.exports = app;