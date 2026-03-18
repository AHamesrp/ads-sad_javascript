// models/Notification.js - Versão Supabase
const { supabase } = require('../config/database');

class Notification {
  // Criar notificação
  static async create(notificationData) {
    const { data, error } = await supabase
      .from('notifications')
      .insert([{
        user_id: notificationData.user,
        type: notificationData.type,
        title: notificationData.title,
        message: notificationData.message,
        related_ride_id: notificationData.relatedRide,
        related_user_id: notificationData.relatedUser,
        is_read: notificationData.isRead || false
      }])
      .select(`
        *,
        user:users!notifications_user_id_fkey(id, name, avatar),
        related_user:users!notifications_related_user_id_fkey(id, name, avatar),
        related_ride:rides!notifications_related_ride_id_fkey(
          id, 
          origin_city, 
          destination_city, 
          departure_date
        )
      `)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Buscar notificações do usuário
  static async find(filters = {}) {
    let query = supabase
      .from('notifications')
      .select(`
        *,
        related_user:users!notifications_related_user_id_fkey(id, name, avatar),
        related_ride:rides!notifications_related_ride_id_fkey(
          id, 
          origin_city, 
          destination_city, 
          departure_date
        )
      `);

    // Aplicar filtros
    if (filters.user_id) {
      query = query.eq('user_id', filters.user_id);
    }

    if (filters.is_read !== undefined) {
      query = query.eq('is_read', filters.is_read);
    }

    if (filters.type) {
      query = query.eq('type', filters.type);
    }

    const { data, error } = await query
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  // Buscar notificação por ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('notifications')
      .select(`
        *,
        user:users!notifications_user_id_fkey(id, name, avatar),
        related_user:users!notifications_related_user_id_fkey(id, name, avatar),
        related_ride:rides!notifications_related_ride_id_fkey(
          id, 
          origin_city, 
          destination_city, 
          departure_date
        )
      `)
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data;
  }

  // Atualizar notificação
  static async findOneAndUpdate(filters, updates, options = {}) {
    let query = supabase.from('notifications').update(updates);

    // Aplicar filtros
    Object.keys(filters).forEach(key => {
      if (key === '_id') {
        query = query.eq('id', filters[key]);
      } else if (key === 'user') {
        query = query.eq('user_id', filters[key]);
      } else {
        query = query.eq(key, filters[key]);
      }
    });

    if (options.new) {
      query = query.select().single();
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  }

  // Atualizar múltiplas notificações
  static async updateMany(filters, updates) {
    let query = supabase.from('notifications').update(updates);

    // Aplicar filtros
    Object.keys(filters).forEach(key => {
      if (key === 'user') {
        query = query.eq('user_id', filters[key]);
      } else {
        query = query.eq(key, filters[key]);
      }
    });

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  }

  // Contar notificações
  static async countDocuments(filters = {}) {
    let query = supabase.from('notifications').select('*', { count: 'exact', head: true });

    // Aplicar filtros
    Object.keys(filters).forEach(key => {
      if (key === 'user') {
        query = query.eq('user_id', filters[key]);
      } else {
        query = query.eq(key, filters[key]);
      }
    });

    const { count, error } = await query;
    if (error) throw new Error(error.message);
    return count;
  }

  // Deletar notificações
  static async deleteMany(filters = {}) {
    let query = supabase.from('notifications').delete();

    Object.keys(filters).forEach(key => {
      if (key === 'user') {
        query = query.eq('user_id', filters[key]);
      } else {
        query = query.eq(key, filters[key]);
      }
    });

    const { error } = await query;
    if (error) throw new Error(error.message);
  }
}

module.exports = Notification;