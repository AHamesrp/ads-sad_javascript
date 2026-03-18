// models/Ride.js - Versão Supabase
const { supabase } = require('../config/database');

class Ride {
  // Criar carona
  static async create(rideData) {
    const { data, error } = await supabase
      .from('rides')
      .insert([{
        driver_id: rideData.driver,
        origin_city: rideData.origin.city,
        origin_state: rideData.origin.state,
        origin_address: rideData.origin.address,
        origin_lat: rideData.origin.coordinates?.lat,
        origin_lng: rideData.origin.coordinates?.lng,
        destination_city: rideData.destination.city,
        destination_state: rideData.destination.state,
        destination_address: rideData.destination.address,
        destination_lat: rideData.destination.coordinates?.lat,
        destination_lng: rideData.destination.coordinates?.lng,
        departure_date: rideData.departureDate,
        departure_time: rideData.departureTime,
        available_seats: rideData.availableSeats,
        original_seats: rideData.originalSeats,
        price_per_seat: rideData.pricePerSeat,
        description: rideData.description,
        vehicle_model: rideData.vehicle?.model,
        vehicle_color: rideData.vehicle?.color,
        vehicle_plate: rideData.vehicle?.plate,
        distance: rideData.distance,
        preferences: rideData.preferences || {
          smoking_allowed: false,
          pets_allowed: false,
          music_allowed: true
        }
      }])
      .select(`
        *,
        driver:users!rides_driver_id_fkey(id, name, rating_average, rating_count, avatar)
      `)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Buscar caronas com filtros
  static async find(filters = {}) {
    let query = supabase
      .from('rides')
      .select(`
        *,
        driver:users!rides_driver_id_fkey(id, name, rating_average, rating_count, avatar, total_trips),
        passengers:ride_passengers(
          id,
          seats_booked,
          status,
          booked_at,
          user:users!ride_passengers_user_id_fkey(id, name, rating_average, avatar)
        )
      `);

    // Aplicar filtros
    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.available_seats && filters.available_seats.$gte) {
      query = query.gte('available_seats', filters.available_seats.$gte);
    }

    if (filters['origin.city']) {
      if (filters['origin.city'].$regex) {
        query = query.ilike('origin_city', `%${filters['origin.city'].$regex.source}%`);
      } else {
        query = query.eq('origin_city', filters['origin.city']);
      }
    }

    if (filters['destination.city']) {
      if (filters['destination.city'].$regex) {
        query = query.ilike('destination_city', `%${filters['destination.city'].$regex.source}%`);
      } else {
        query = query.eq('destination_city', filters['destination.city']);
      }
    }

    if (filters.departure_date) {
      if (filters.departure_date.$gte && filters.departure_date.$lt) {
        query = query
          .gte('departure_date', filters.departure_date.$gte.toISOString())
          .lt('departure_date', filters.departure_date.$lt.toISOString());
      }
    }

    if (filters.driver_id) {
      query = query.eq('driver_id', filters.driver_id);
    }

    if (filters.$or) {
      // Para queries complexas com OR, pode precisar de RPC function
      // Por simplicidade, vamos tratar caso por caso
    }

    const { data, error } = await query.order('departure_date', { ascending: true });
    
    if (error) throw new Error(error.message);
    return data;
  }

  // Buscar carona por ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('rides')
      .select(`
        *,
        driver:users!rides_driver_id_fkey(id, name, rating_average, rating_count, avatar, total_trips),
        passengers:ride_passengers(
          id,
          seats_booked,
          status,
          booked_at,
          user:users!ride_passengers_user_id_fkey(id, name, rating_average, avatar)
        )
      `)
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data;
  }

  // Contar documentos
  static async countDocuments(filters = {}) {
    let query = supabase.from('rides').select('*', { count: 'exact', head: true });

    Object.keys(filters).forEach(key => {
      if (key === 'status') {
        query = query.eq('status', filters[key]);
      }
    });

    const { count, error } = await query;
    if (error) throw new Error(error.message);
    return count;
  }

  // Aggregate para stats
  static async aggregate(pipeline) {
    // Para operações de agregação complexas, usar RPC functions
    if (pipeline[0].$match?.status === 'completed' && pipeline[1].$group) {
      const { data, error } = await supabase.rpc('get_co2_total');
      if (error) throw new Error(error.message);
      return [{ _id: null, total: data || 0 }];
    }
    return [];
  }

  // Atualizar carona
  static async findByIdAndUpdate(id, updates, options = {}) {
    const { data, error } = await supabase
      .from('rides')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Salvar alterações (para simular Mongoose save())
  async save() {
    const { data, error } = await supabase
      .from('rides')
      .update(this)
      .eq('id', this.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    Object.assign(this, data);
    return this;
  }

  // Adicionar passageiro
  static async addPassenger(rideId, passengerId, seatsBooked) {
    const { data, error } = await supabase
      .from('ride_passengers')
      .insert([{
        ride_id: rideId,
        user_id: passengerId,
        seats_booked: seatsBooked,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Remover passageiro
  static async removePassenger(rideId, passengerId) {
    const { error } = await supabase
      .from('ride_passengers')
      .delete()
      .eq('ride_id', rideId)
      .eq('user_id', passengerId);

    if (error) throw new Error(error.message);
  }
}

module.exports = Ride;