const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'seu_secret_super_seguro_aqui'; // Em produção, use variável de ambiente

// Middleware para parsing JSON
app.use(express.json());

// Array para armazenar usuários em memória
let usuarios = [];

// 1. Rota GET / - Página inicial
app.get('/', (req, res) => {
  res.json({ "mensagem": "Bem-vindo à API!" });
});

// 2. Rota POST /cadastro - Cadastro de usuário
app.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Validação básica
    if (!nome || !email || !senha) {
      return res.status(400).json({ 
        erro: "Nome, email e senha são obrigatórios" 
      });
    }

    // Verificar se email já existe
    const usuarioExistente = usuarios.find(user => user.email === email);
    if (usuarioExistente) {
      return res.status(400).json({ 
        erro: "Email já cadastrado" 
      });
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar novo usuário
    const novoUsuario = {
      id: usuarios.length + 1,
      nome,
      email,
      senha: senhaHash
    };

    usuarios.push(novoUsuario);

    res.status(201).json({ 
      mensagem: "Usuário cadastrado com sucesso!",
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email
      }
    });

  } catch (error) {
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

// 3. Rota POST /login - Login e geração de token
app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validação básica
    if (!email || !senha) {
      return res.status(400).json({ 
        erro: "Email e senha são obrigatórios" 
      });
    }

    // Encontrar usuário
    const usuario = usuarios.find(user => user.email === email);
    if (!usuario) {
      return res.status(401).json({ 
        erro: "Credenciais inválidas" 
      });
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ 
        erro: "Credenciais inválidas" 
      });
    }

    // 6. Gerar token com expiração de 1 hora
    const token = jwt.sign(
      { 
        id: usuario.id, 
        email: usuario.email 
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      mensagem: "Login realizado com sucesso!",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });

  } catch (error) {
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

// 4. Middleware para verificar token
const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Verificar se token está presente
  if (!authHeader) {
    return res.status(401).json({ 
      erro: "Token não fornecido" 
    });
  }

  // Extrair token (formato: "Bearer token")
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      erro: "Formato de token inválido" 
    });
  }

  try {
    // Validar token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        erro: "Token expirado" 
      });
    }
    return res.status(401).json({ 
      erro: "Token inválido" 
    });
  }
};

// 5. Rota GET /perfil - Rota protegida
app.get('/perfil', verificarToken, (req, res) => {
  res.json({ 
    mensagem: "Você está autenticado!",
    usuario: {
      id: req.usuario.id,
      email: req.usuario.email
    }
  });
});

// Rota adicional para listar usuários (apenas para teste)
app.get('/usuarios', verificarToken, (req, res) => {
  const usuariosSemSenha = usuarios.map(user => ({
    id: user.id,
    nome: user.nome,
    email: user.email
  }));
  
  res.json({ usuarios: usuariosSemSenha });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});