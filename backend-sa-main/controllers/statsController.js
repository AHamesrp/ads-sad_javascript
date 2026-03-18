const User = require('../models/User');
const Ride = require('../models/Ride');
const { supabase } = require('../config/database');

class StatsController {
  // Obter estatísticas gerais da plataforma
  async getGlobalStats(req, res, next) {
    try {
      // Contar usuários total
      const userCount = await User.countDocuments();
      
      // Contar caronas ativas
      const activeRidesCount = await Ride.countDocuments({ status: 'active' });
      
      // Contar viagens completas
      const completedTripsCount = await Ride.countDocuments({ status: 'completed' });
      
      // Calcular CO2 total economizado usando query SQL direta
      const { data: co2Data } = await supabase
        .from('rides')
        .select('co2_emission')
        .eq('status', 'completed');
      
      const totalCO2Saved = co2Data?.reduce((sum, ride) => sum + (ride.co2_emission || 0), 0) || 0;
      
      // Cálculos estimados
      const avgSavingsPerTrip = 50; // R$ médio economizado por viagem
      const totalSavings = completedTripsCount * avgSavingsPerTrip;

      res.status(200).json({
        success: true,
        data: {
          stats: {
            users: userCount,
            dailyRides: activeRidesCount,
            co2Saved: Math.round(totalCO2Saved * 1000), // em kg
            totalSavings: totalSavings
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Obter estatísticas do usuário
  async getUserStats(req, res, next) {
    try {
      const userId = req.user.id;

      // Buscar viagens do usuário (como motorista e passageiro)
      const { data: driverRides } = await supabase
        .from('rides')
        .select('co2_emission')
        .eq('driver_id', userId)
        .eq('status', 'completed');

      // Buscar viagens como passageiro usando join
      const { data: passengerRides } = await supabase
        .from('ride_passengers')
        .select(`
          rides!inner(co2_emission)
        `)
        .eq('user_id', userId)
        .eq('rides.status', 'completed');

      // Calcular CO2 total economizado pelo usuário
      const driverCO2 = driverRides?.reduce((sum, ride) => sum + (ride.co2_emission || 0), 0) || 0;
      const passengerCO2 = passengerRides?.reduce((sum, item) => sum + (item.rides?.co2_emission || 0), 0) || 0;
      const totalCO2Saved = driverCO2 + passengerCO2;

      // Contar total de viagens
      const totalTrips = (driverRides?.length || 0) + (passengerRides?.length || 0);

      // Buscar dados do usuário
      const userData = await User.findById(userId);

      res.status(200).json({
        success: true,
        data: {
          stats: {
            totalTrips: totalTrips,
            co2Saved: Math.round(totalCO2Saved * 1000), // em kg
            moneySaved: totalTrips * 30, // estimativa R$ 30 por viagem
            rating: userData?.rating_average || 0
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StatsController();