const Ride = require('../models/Ride');
const User = require('../models/User');

class RideController {
  // Criar carona
  async createRide(req, res, next) {
    try {
      const rideData = {
        ...req.body,
        driver: req.user.id,
        originalSeats: req.body.availableSeats
      };

      const ride = await Ride.create(rideData);
      
      res.status(201).json({
        success: true,
        message: 'Carona criada com sucesso',
        data: { ride }
      });
    } catch (error) {
      next(error);
    }
  }

  // Buscar caronas
  async searchRides(req, res, next) {
    try {
      const { origin, destination, date, passengers = 1 } = req.query;
      
      const filters = {
        status: 'active',
        available_seats: { $gte: parseInt(passengers) }
      };

      if (origin) {
        filters['origin.city'] = { $regex: new RegExp(origin, 'i') };
      }

      if (destination) {
        filters['destination.city'] = { $regex: new RegExp(destination, 'i') };
      }

      if (date) {
        const searchDate = new Date(date);
        const nextDay = new Date(searchDate);
        nextDay.setDate(nextDay.getDate() + 1);
        
        filters.departure_date = {
          $gte: searchDate,
          $lt: nextDay
        };
      }

      const rides = await Ride.find(filters);

      res.status(200).json({
        success: true,
        count: rides.length,
        data: { rides }
      });
    } catch (error) {
      next(error);
    }
  }

  // Obter carona específica
  async getRide(req, res, next) {
    try {
      const ride = await Ride.findById(req.params.id);

      if (!ride) {
        return res.status(404).json({
          success: false,
          message: 'Carona não encontrada'
        });
      }

      res.status(200).json({
        success: true,
        data: { ride }
      });
    } catch (error) {
      next(error);
    }
  }

  // Reservar carona
  async bookRide(req, res, next) {
    try {
      const { seatsRequested = 1 } = req.body;
      const ride = await Ride.findById(req.params.id);
      
      if (!ride) {
        return res.status(404).json({
          success: false,
          message: 'Carona não encontrada'
        });
      }

      if (ride.driver_id === req.user.id) {
        return res.status(400).json({
          success: false,
          message: 'Você não pode reservar sua própria carona'
        });
      }

      if (ride.available_seats < seatsRequested) {
        return res.status(400).json({
          success: false,
          message: 'Assentos insuficientes disponíveis'
        });
      }

      // Verificar se já tem reserva (buscar na tabela ride_passengers)
      const existingBooking = ride.passengers?.find(
        p => p.user.id === req.user.id
      );

      if (existingBooking) {
        return res.status(400).json({
          success: false,
          message: 'Você já tem uma reserva para esta carona'
        });
      }

      // Adicionar passageiro
      await Ride.addPassenger(req.params.id, req.user.id, seatsRequested);

      // Atualizar assentos disponíveis
      const newAvailableSeats = ride.available_seats - seatsRequested;
      const status = newAvailableSeats === 0 ? 'full' : 'active';

      await Ride.findByIdAndUpdate(req.params.id, {
        available_seats: newAvailableSeats,
        status: status
      });

      // Buscar carona atualizada
      const updatedRide = await Ride.findById(req.params.id);
      
      res.status(200).json({
        success: true,
        message: 'Carona reservada com sucesso',
        data: { ride: updatedRide }
      });
    } catch (error) {
      next(error);
    }
  }

  // Obter caronas populares
  async getPopularRides(req, res, next) {
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      
      const rides = await Ride.find({
        status: 'active',
        departure_date: { $gte: currentDate }
      });

      // Ordenar por número de passageiros (simulação de popularidade)
      const sortedRides = rides
        .sort((a, b) => (b.passengers?.length || 0) - (a.passengers?.length || 0))
        .slice(0, 6);

      res.status(200).json({
        success: true,
        data: { rides: sortedRides }
      });
    } catch (error) {
      next(error);
    }
  }

  // Obter caronas do usuário
  async getUserRides(req, res, next) {
    try {
      const { type } = req.query;
      let rides = [];

      if (type === 'driver') {
        rides = await Ride.find({ driver_id: req.user.id });
      } else if (type === 'passenger') {
        // Buscar caronas onde o usuário é passageiro
        const allRides = await Ride.find({});
        rides = allRides.filter(ride => 
          ride.passengers?.some(p => p.user.id === req.user.id)
        );
      } else {
        // Buscar todas (como motorista + como passageiro)
        const driverRides = await Ride.find({ driver_id: req.user.id });
        const allRides = await Ride.find({});
        const passengerRides = allRides.filter(ride => 
          ride.passengers?.some(p => p.user.id === req.user.id)
        );
        rides = [...driverRides, ...passengerRides];
      }

      res.status(200).json({
        success: true,
        count: rides.length,
        data: { rides }
      });
    } catch (error) {
      next(error);
    }
  }

  // Cancelar reserva
  async cancelBooking(req, res, next) {
    try {
      const ride = await Ride.findById(req.params.id);
      
      if (!ride) {
        return res.status(404).json({
          success: false,
          message: 'Carona não encontrada'
        });
      }

      const booking = ride.passengers?.find(
        p => p.user.id === req.user.id
      );

      if (!booking) {
        return res.status(400).json({
          success: false,
          message: 'Reserva não encontrada'
        });
      }

      // Remover passageiro
      await Ride.removePassenger(req.params.id, req.user.id);

      // Restaurar assentos
      const newAvailableSeats = ride.available_seats + booking.seats_booked;
      await Ride.findByIdAndUpdate(req.params.id, {
        available_seats: newAvailableSeats,
        status: 'active'
      });

      res.status(200).json({
        success: true,
        message: 'Reserva cancelada com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RideController();