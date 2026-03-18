import React from "react";

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ridesService } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useFormatDate, useFormatCurrency, getInitials } from '../hooks/useFormat'
import { LoadingPage } from '../components/Loading'
import toast from 'react-hot-toast'
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Leaf,
  ArrowLeft,
  Car,
  Cigarette,
  Dog,
  Music,
  MessageCircle,
  Phone,
  Shield,
  CheckCircle2,
  AlertCircle,
  Minus,
  Plus
} from 'lucide-react'

export default function RideDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { formatDate, formatTime, formatDateTime } = useFormatDate()
  const { formatCurrency } = useFormatCurrency()

  const [ride, setRide] = useState(null)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState(false)
  const [seatsRequested, setSeatsRequested] = useState(1)

  useEffect(() => {
    fetchRide()
  }, [id])

  const fetchRide = async () => {
    try {
      const response = await ridesService.getById(id)
      if (response.success) {
        setRide(response.data.ride)
      }
    } catch (error) {
      console.error('Erro ao buscar carona:', error)
      toast.error('Carona não encontrada')
      navigate('/search')
    } finally {
      setLoading(false)
    }
  }

  const handleBook = async () => {
    if (!isAuthenticated) {
      toast.error('Faça login para reservar uma carona')
      navigate('/login', { state: { from: `/ride/${id}` } })
      return
    }

    setBooking(true)
    try {
      const response = await ridesService.book(id, seatsRequested)
      if (response.success) {
        toast.success('Carona reservada com sucesso!')
        fetchRide() // Recarregar dados
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao reservar carona'
      toast.error(message)
    } finally {
      setBooking(false)
    }
  }

  const handleCancelBooking = async () => {
    if (!window.confirm('Tem certeza que deseja cancelar sua reserva?')) return

    setBooking(true)
    try {
      const response = await ridesService.cancelBooking(id)
      if (response.success) {
        toast.success('Reserva cancelada')
        fetchRide()
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao cancelar reserva'
      toast.error(message)
    } finally {
      setBooking(false)
    }
  }

  if (loading) return <LoadingPage />

  if (!ride) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">Carona não encontrada</p>
          <Link to="/search" className="btn-primary mt-4 inline-block">
            Voltar para busca
          </Link>
        </div>
      </div>
    )
  }

  const {
    origin_city,
    origin_state,
    origin_address,
    destination_city,
    destination_state,
    destination_address,
    departure_date,
    departure_time,
    available_seats,
    price_per_seat,
    description,
    vehicle_model,
    vehicle_color,
    vehicle_plate,
    driver,
    distance,
    co2_emission,
    preferences,
    passengers = [],
    status
  } = ride

  const isDriver = user?.id === driver?.id
  const hasBooked = passengers.some(p => p.user?.id === user?.id)
  const userBooking = passengers.find(p => p.user?.id === user?.id)
  const canBook = !isDriver && !hasBooked && available_seats > 0 && status === 'active'

  const totalPrice = price_per_seat * seatsRequested

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-app py-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
        </div>
      </div>

      <div className="container-app py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Route Card */}
            <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
              <div className="flex items-start gap-6">
                {/* Timeline */}
                <div className="hidden sm:flex flex-col items-center pt-2">
                  <div className="w-4 h-4 rounded-full bg-primary-500 ring-4 ring-primary-100"></div>
                  <div className="w-0.5 h-24 bg-gradient-to-b from-primary-300 to-secondary-300"></div>
                  <div className="w-4 h-4 rounded-full bg-secondary-500 ring-4 ring-secondary-100"></div>
                </div>

                {/* Locations */}
                <div className="flex-1">
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2 sm:hidden">
                      <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                      <span className="text-sm text-slate-500">Origem</span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-slate-800">
                      {origin_city}, {origin_state}
                    </h2>
                    {origin_address && (
                      <p className="text-slate-500 mt-1">{origin_address}</p>
                    )}
                    <p className="text-primary-600 font-medium mt-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {formatDateTime(departure_date, departure_time)}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2 sm:hidden">
                      <div className="w-3 h-3 rounded-full bg-secondary-500"></div>
                      <span className="text-sm text-slate-500">Destino</span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-slate-800">
                      {destination_city}, {destination_state}
                    </h2>
                    {destination_address && (
                      <p className="text-slate-500 mt-1">{destination_address}</p>
                    )}
                    {distance && (
                      <p className="text-slate-500 mt-2">
                        Distância aproximada: {distance} km
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-xl bg-slate-50">
                  <Users className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-800">{available_seats}</p>
                  <p className="text-sm text-slate-500">lugares disponíveis</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-50">
                  <span className="text-xl font-bold text-primary-600 block mb-2">R$</span>
                  <p className="text-2xl font-bold text-slate-800">{price_per_seat.toFixed(0)}</p>
                  <p className="text-sm text-slate-500">por pessoa</p>
                </div>
                {co2_emission > 0 && (
                  <div className="text-center p-4 rounded-xl bg-secondary-50">
                    <Leaf className="w-6 h-6 text-secondary-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-secondary-600">{Math.round(co2_emission * 1000)}</p>
                    <p className="text-sm text-secondary-600">g CO₂ economizados</p>
                  </div>
                )}
                {distance && (
                  <div className="text-center p-4 rounded-xl bg-slate-50">
                    <MapPin className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-slate-800">{distance}</p>
                    <p className="text-sm text-slate-500">km</p>
                  </div>
                )}
              </div>
            </div>

            {/* Driver Card */}
            <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
              <h3 className="font-display text-lg font-semibold text-slate-800 mb-4">Motorista</h3>
              
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {driver?.avatar ? (
                    <img src={driver.avatar} alt={driver.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    getInitials(driver?.name)
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-slate-800">{driver?.name}</h4>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm">
                    {driver?.rating_average > 0 && (
                      <span className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        {driver.rating_average.toFixed(1)}
                        <span className="text-slate-400">({driver.rating_count} avaliações)</span>
                      </span>
                    )}
                    {driver?.total_trips > 0 && (
                      <span className="text-slate-500">
                        {driver.total_trips} {driver.total_trips === 1 ? 'viagem' : 'viagens'}
                      </span>
                    )}
                  </div>
                  
                  {driver?.is_verified && (
                    <div className="flex items-center gap-2 mt-3 text-secondary-600">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Perfil verificado</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Vehicle & Preferences */}
            <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
              <h3 className="font-display text-lg font-semibold text-slate-800 mb-4">Detalhes da viagem</h3>
              
              {/* Vehicle */}
              {(vehicle_model || vehicle_color) && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Car className="w-6 h-6 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{vehicle_model || 'Veículo'}</p>
                    <p className="text-sm text-slate-500">
                      {vehicle_color && `${vehicle_color}`}
                      {vehicle_plate && ` • ${vehicle_plate}`}
                    </p>
                  </div>
                </div>
              )}

              {/* Description */}
              {description && (
                <div className="mb-6">
                  <p className="text-slate-600">{description}</p>
                </div>
              )}

              {/* Preferences */}
              {preferences && (
                <div className="flex flex-wrap gap-3">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                    preferences.smoking_allowed ? 'bg-slate-100 text-slate-600' : 'bg-red-50 text-red-600'
                  }`}>
                    <Cigarette className="w-4 h-4" />
                    {preferences.smoking_allowed ? 'Pode fumar' : 'Proibido fumar'}
                  </span>
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                    preferences.pets_allowed ? 'bg-secondary-50 text-secondary-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Dog className="w-4 h-4" />
                    {preferences.pets_allowed ? 'Pets permitidos' : 'Sem pets'}
                  </span>
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                    preferences.music_allowed ? 'bg-primary-50 text-primary-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Music className="w-4 h-4" />
                    {preferences.music_allowed ? 'Música liberada' : 'Sem música'}
                  </span>
                </div>
              )}
            </div>

            {/* Passengers */}
            {passengers.length > 0 && (
              <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
                <h3 className="font-display text-lg font-semibold text-slate-800 mb-4">
                  Passageiros ({passengers.length})
                </h3>
                <div className="space-y-3">
                  {passengers.map((passenger, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center text-white font-medium text-sm">
                        {getInitials(passenger.user?.name)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{passenger.user?.name}</p>
                        <p className="text-sm text-slate-500">{passenger.seats_booked} {passenger.seats_booked === 1 ? 'lugar' : 'lugares'}</p>
                      </div>
                      {passenger.status === 'confirmed' && (
                        <CheckCircle2 className="w-5 h-5 text-secondary-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-28">
              {/* Price */}
              <div className="text-center mb-6">
                <p className="text-sm text-slate-500 mb-1">Preço por pessoa</p>
                <p className="text-4xl font-bold text-primary-600">{formatCurrency(price_per_seat)}</p>
              </div>

              {/* Status Messages */}
              {status !== 'active' && (
                <div className="mb-4 p-4 rounded-xl bg-amber-50 text-amber-700 text-center">
                  <AlertCircle className="w-5 h-5 mx-auto mb-2" />
                  <p className="font-medium">
                    {status === 'full' && 'Carona lotada'}
                    {status === 'completed' && 'Viagem concluída'}
                    {status === 'cancelled' && 'Carona cancelada'}
                  </p>
                </div>
              )}

              {isDriver && (
                <div className="mb-4 p-4 rounded-xl bg-primary-50 text-primary-700 text-center">
                  <Car className="w-5 h-5 mx-auto mb-2" />
                  <p className="font-medium">Você é o motorista desta carona</p>
                </div>
              )}

              {hasBooked && (
                <div className="mb-4 p-4 rounded-xl bg-secondary-50 text-secondary-700 text-center">
                  <CheckCircle2 className="w-5 h-5 mx-auto mb-2" />
                  <p className="font-medium">Você já reservou {userBooking?.seats_booked} {userBooking?.seats_booked === 1 ? 'lugar' : 'lugares'}</p>
                </div>
              )}

              {/* Booking Form */}
              {canBook && (
                <>
                  {/* Seats Selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Número de lugares
                    </label>
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => setSeatsRequested(Math.max(1, seatsRequested - 1))}
                        className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                        disabled={seatsRequested <= 1}
                      >
                        <Minus className="w-5 h-5 text-slate-600" />
                      </button>
                      <span className="text-3xl font-bold text-slate-800 w-12 text-center">
                        {seatsRequested}
                      </span>
                      <button
                        onClick={() => setSeatsRequested(Math.min(available_seats, seatsRequested + 1))}
                        className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                        disabled={seatsRequested >= available_seats}
                      >
                        <Plus className="w-5 h-5 text-slate-600" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-500 text-center mt-2">
                      {available_seats} {available_seats === 1 ? 'lugar disponível' : 'lugares disponíveis'}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between py-4 border-t border-slate-100 mb-6">
                    <span className="text-slate-600">Total</span>
                    <span className="text-2xl font-bold text-slate-800">{formatCurrency(totalPrice)}</span>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={handleBook}
                    disabled={booking}
                    className="w-full btn-primary text-lg py-4"
                  >
                    {booking ? 'Reservando...' : 'Reservar'}
                  </button>
                </>
              )}

              {/* Cancel Booking */}
              {hasBooked && (
                <button
                  onClick={handleCancelBooking}
                  disabled={booking}
                  className="w-full btn-secondary text-red-600 border-red-200 hover:bg-red-50"
                >
                  {booking ? 'Cancelando...' : 'Cancelar reserva'}
                </button>
              )}

              {/* Contact */}
              {(hasBooked || isDriver) && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-sm text-slate-500 mb-3">Entrar em contato</p>
                  <div className="flex gap-3">
                    <button className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </button>
                    <button className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      Ligar
                    </button>
                  </div>
                </div>
              )}

              {/* Trust */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Shield className="w-4 h-4 text-secondary-500" />
                  <span>Pagamento seguro e garantido</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
