const app = require('./app');
const { connectDB } = require('./config/database');

// Conectar ao Supabase
connectDB();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚗 EcoRide API rodando na porta ${PORT}`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🗄️ Database: Supabase`);
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});