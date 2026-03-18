// models/User.js - Versão Supabase
const { supabase } = require('../config/database');

class User {
  // Criar tabela users (SQL schema)
  static async createTable() {
    const { error } = await supabase.rpc('create_users_table');
    if (error) throw error;
  }

  // Criar usuário
  static async create(userData) {
    const { name, email, phone, password } = userData;
    
    // Usar Supabase Auth para criar usuário
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authError) throw new Error(authError.message);

    // Inserir dados adicionais na tabela users
    const { data, error } = await supabase
      .from('users')
      .insert([{
        id: authData.user.id,
        name,
        email,
        phone,
        rating_average: 0,
        rating_count: 0,
        total_trips: 0,
        is_verified: false,
        co2_saved: 0,
        preferences: {
          smoking_allowed: false,
          pets_allowed: false,
          music_allowed: true
        }
      }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Buscar usuário por email
  static async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data;
  }

  // Buscar usuário por ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data;
  }

  // Atualizar usuário
  static async findByIdAndUpdate(id, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Contar usuários
  static async countDocuments(filter = {}) {
    let query = supabase.from('users').select('*', { count: 'exact', head: true });
    
    // Aplicar filtros se existirem
    Object.keys(filter).forEach(key => {
      query = query.eq(key, filter[key]);
    });

    const { count, error } = await query;
    if (error) throw new Error(error.message);
    return count;
  }

  // Login com Supabase Auth
  static async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw new Error(error.message);
    
    // Buscar dados completos do usuário
    const userData = await User.findById(data.user.id);
    return { auth: data, user: userData };
  }

  // Método para simular o toJSON do Mongoose (sem senha)
  static sanitizeUser(user) {
    const { password, ...sanitized } = user;
    return sanitized;
  }
}

module.exports = User;