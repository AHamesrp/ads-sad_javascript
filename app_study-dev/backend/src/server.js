const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./database');
const studiesRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Study Tracker API está funcionando!' });
});

// Rotas de estudos
app.use('/api/studies', studiesRoutes);

// Middleware de erro 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Inicializar banco e servidor
async function start() {
  try {
    await initDatabase();
    console.log('✅ Banco de dados inicializado com sucesso!');
    
    app.listen(PORT, () => {
      console.log(`🚀 Study Tracker API rodando na porta ${PORT}`);
      console.log(`📚 Endpoints disponíveis:`);
      console.log(`   GET    /api/health              - Health check`);
      console.log(`   GET    /api/studies             - Listar estudos`);
      console.log(`   GET    /api/studies/:id         - Buscar estudo`);
      console.log(`   POST   /api/studies             - Criar estudo`);
      console.log(`   PUT    /api/studies/:id         - Atualizar estudo`);
      console.log(`   DELETE /api/studies/:id         - Deletar estudo`);
      console.log(`   GET    /api/studies/options/status - Opções de status`);
    });
  } catch (error) {
    console.error('❌ Erro ao inicializar:', error);
    process.exit(1);
  }
}

start();
