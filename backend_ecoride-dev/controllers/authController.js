const AuthService = require('../services/authService');
const User = require('../models/User');

class AuthController {
  // Registrar usuário
  async register(req, res, next) {
    try {
      const result = await AuthService.register(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Usuário registrado com sucesso',
        data: {
          user: result.user,
          token: result.token
        }
      });
    } catch (error) {
      if (error.message.includes('já existe')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  // Login
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      
      res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
        data: {
          user: result.user,
          token: result.token
        }
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }

  // Obter perfil atual
  async getProfile(req, res, next) {
    try {
      res.status(200).json({
        success: true,
        data: {
          user: req.user
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Atualizar perfil
  async updateProfile(req, res, next) {
    try {
      const allowedFields = ['name', 'phone', 'preferences'];
      const updates = {};
      
      Object.keys(req.body).forEach(key => {
        if (allowedFields.includes(key)) {
          updates[key] = req.body[key];
        }
      });

      // Adicionar timestamp de atualização
      updates.updated_at = new Date().toISOString();

      const user = await User.findByIdAndUpdate(
        req.user.id,
        updates,
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: 'Perfil atualizado com sucesso',
        data: { user: User.sanitizeUser(user) }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();