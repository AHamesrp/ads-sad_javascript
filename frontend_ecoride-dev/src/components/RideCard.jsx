import React from "react";
import { Link } from 'react-router-dom'
import { useFormatDate, useFormatCurrency } from '../hooks/useFormat'
import { getInitials } from '../hooks/useFormat'
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Leaf,
  ArrowRight,
  Cigarette,
  Dog,
  Music
} from 'lucide-react'

export default function RideCard({ ride, variant = 'default' }) {
  const { formatDate, formatTime } = useFormatDate()
  const { formatCurrency } = useFormatCurrency()

  if (!ride) return null

  const {
    id,
    origin_city,
    origin_state,
    destination_city,
    destination_state,
    departure_date,
    departure_time,
    available_seats,
    price_per_seat,
    driver,
    distance,
    co2_emission,
    preferences
  } = ride

  const driverName = driver?.name || 'Motorista'
  const driverRating = driver?.rating_average || 0
  const driverTrips = driver?.total_trips || 0

  return (
    <Link 
      to={`/ride/${id}`}
      className={`block bg-white rounded-2xl transition-all duration-300 card-hover ${
        variant === 'compact' ? 'p-4' : 'p-5 md:p-6'
      } shadow-soft hover:shadow-medium`}
    >
      {/* Route Info */}
      <div className="flex items-start gap-4">
        {/* Timeline */}
        <div className="flex flex-col items-center pt-1">
          <div className="w-3 h-3 rounded-full bg-primary-500 ring-4 ring-primary-100"></div>
          <div className="w-0.5 h-12 bg-gradient-to-b from-primary-300 to-secondary-300"></div>
          <div className="w-3 h-3 rounded-full bg-secondary-500 ring-4 ring-secondary-100"></div>
        </div>

        {/* Locations */}
        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <p className="font-semibold text-slate-800 truncate">
              {origin_city}
              <span className="text-slate-400 font-normal text-sm ml-1">{origin_state}</span>
            </p>
            <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5" />
              {formatDate(departure_date, "EEE, d 'de' MMM")} às {formatTime(departure_time)}
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-800 truncate">
              {destination_city}
              <span className="text-slate-400 font-normal text-sm ml-1">{destination_state}</span>
            </p>
            {distance && (
              <p className="text-sm text-slate-500 mt-0.5">
                ~{distance} km de distância
              </p>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="text-right flex-shrink-0">
          <p className="text-2xl font-bold text-primary-600">
            {formatCurrency(price_per_seat)}
          </p>
          <p className="text-xs text-slate-500">por pessoa</p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-slate-100"></div>

      {/* Driver & Details */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Driver Avatar */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
            {driver?.avatar ? (
              <img 
                src={driver.avatar} 
                alt={driverName} 
                className="w-full h-full rounded-full object-cover" 
              />
            ) : (
              getInitials(driverName)
            )}
          </div>
          
          {/* Driver Info */}
          <div>
            <p className="font-medium text-slate-800">{driverName.split(' ')[0]}</p>
            <div className="flex items-center gap-2 text-sm">
              {driverRating > 0 && (
                <span className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {driverRating.toFixed(1)}
                </span>
              )}
              {driverTrips > 0 && (
                <span className="text-slate-400">
                  {driverTrips} {driverTrips === 1 ? 'viagem' : 'viagens'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2">
          {/* Available Seats */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">{available_seats}</span>
          </div>

          {/* CO2 Badge */}
          {co2_emission > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary-50 text-secondary-600">
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-medium">{Math.round(co2_emission * 1000)}g</span>
            </div>
          )}

          {/* Arrow */}
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-500">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Preferences (if any) */}
      {preferences && variant !== 'compact' && (
        <div className="mt-3 flex items-center gap-3 text-slate-400">
          {preferences.smoking_allowed === false && (
            <span className="flex items-center gap-1 text-xs">
              <Cigarette className="w-3.5 h-3.5" />
              <span className="line-through">Fumar</span>
            </span>
          )}
          {preferences.pets_allowed && (
            <span className="flex items-center gap-1 text-xs text-secondary-500">
              <Dog className="w-3.5 h-3.5" />
              Pets OK
            </span>
          )}
          {preferences.music_allowed && (
            <span className="flex items-center gap-1 text-xs text-primary-500">
              <Music className="w-3.5 h-3.5" />
              Música
            </span>
          )}
        </div>
      )}
    </Link>
  )
}

// Versão compacta para listagens
export function RideCardCompact({ ride }) {
  return <RideCard ride={ride} variant="compact" />
}
