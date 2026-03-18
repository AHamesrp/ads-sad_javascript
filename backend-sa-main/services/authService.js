const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { supabase } = require('../config/database');

class AuthService {
  // Gerar JWT token
  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
  }

  // Registrar usuário
  async register(userData) {
    const { name, email, phone, password } = userData;

    // Verificar se usuário já existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('Usuário já existe com este email');
    }

    // Criar usuário no Supabase
    const user = await User.create({
      name,
      email,
      phone,
      password
    });

    // Gerar token próprio (além do Supabase Auth)
    const token = this.generateToken(user.id);

    return {
      user: User.sanitizeUser(user),
      token
    };
  }

  // Login
  async login(email, password) {
    try {
      // Login com Supabase Auth
      const result = await User.signIn(email, password);
      
      if (!result.user) {
        throw new Error('Credenciais inválidas');
      }

      // Gerar token próprio
      const token = this.generateToken(result.user.id);

      return {
        user: User.sanitizeUser(result.user),
        token
      };
    } catch (error) {
      throw new Error('Credenciais inválidas');
    }
  }

  // Verificar token e obter usuário
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      return User.sanitizeUser(user);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}

module.exports = new AuthService();