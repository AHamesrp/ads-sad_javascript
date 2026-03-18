// Importação das dependências necessárias para o funcionamento do servidor
const express = require('express')
const dotenv = require('dotenv')
const routes = require('./routes')

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config()
// Inicializa a aplicação Express
const app = express()
// Habilita o parse automático de requisições com corpo JSON
app.use(express.json())
// Conecta todas as rotas definidas no arquivo routes.js
app.use(routes)
// Define a porta do servidor a partir da variável de ambiente ou usa 3000 como padrão
const PORT = process.env.PORT || 3000

// Inicia o servidor e exibe mensagem no console
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})