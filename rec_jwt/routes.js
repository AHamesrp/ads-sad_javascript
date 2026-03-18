const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

// Array que simula um banco de dados em memória para armazenar usuários
const usuarios = []

// Função middleware para verificar a validade do token JWT
const verificarToken = (req, res, next) => {
  // Extrai o token do cabeçalho Authorization
  const token = req.headers['authorization']
  // Verifica se o token foi fornecido na requisição
  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' })
  }
  // Tenta validar o token usando a chave secreta
  jwt.verify(token, process.env.JWT_SECRET, (erro, decoded) => {
    // Se houver erro na validação, retorna status 401
    if (erro) {
      return res.status(401).json({ erro: 'Token inválido ou expirado' })
    }
    // Armazena os dados do usuário decodificados na requisição
    req.usuarioEmail = decoded.email
    // Prossegue para a próxima função na cadeia de middlewares
    next()
  })
}
// Rota inicial que retorna uma mensagem de boas-vindas
router.get('/', (req, res) => {
  res.json({ mensagem: 'Bem-vindo à API!' })
})
// Rota para cadastrar novos usuários no sistema
router.post('/cadastro', (req, res) => {
  // Desestrutura os dados enviados no corpo da requisição
  const { nome, email, senha } = req.body
  // Valida se todos os campos obrigatórios foram preenchidos
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' })
  }
  // Verifica se já existe um usuário com o email informado
  const usuarioExistente = usuarios.find(u => u.email === email)
  if (usuarioExistente) {
    return res.status(400).json({ erro: 'Usuário já cadastrado' })
  }
  // Cria objeto com os dados do novo usuário
  const novoUsuario = { nome, email, senha }
  // Adiciona o usuário ao array de usuários
  usuarios.push(novoUsuario)
  // Retorna confirmação de cadastro realizado
  res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' })
})
// Rota para autenticar usuários e gerar token de acesso
router.post('/login', (req, res) => {
  // Extrai email e senha do corpo da requisição
  const { email, senha } = req.body  
  // Busca o usuário no array com base no email e senha fornecidos
  const usuario = usuarios.find(u => u.email === email && u.senha === senha)
  // Se não encontrar o usuário, retorna erro de credenciais inválidas
  if (!usuario) {
    return res.status(401).json({ erro: 'Email ou senha incorretos' })
  }  
  // Gera um token JWT contendo o email do usuário com validade de 1 hora
  const token = jwt.sign(
    { email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )  
  // Retorna o token gerado para o cliente
  res.json({ token })
})
// Rota protegida que só pode ser acessada com token válido
router.get('/perfil', verificarToken, (req, res) => {
  // Retorna mensagem confirmando autenticação bem-sucedida
  res.json({ mensagem: 'Você está autenticado!' })
})

// Exporta o router para ser usado no arquivo principal
module.exports = router