const AuthService = require('../services/authService');

const protect = async (req, res, next) => {
  try {
    let token;

    // Verificar se o token existe no header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Acesso negado. Token não fornecido.'
      });
    }

    // Verificar token e obter usuário
    const user = await AuthService.verifyToken(token);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido. Usuário não encontrado.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token inválido.'
    });
  }
};

module.exports = { protect };