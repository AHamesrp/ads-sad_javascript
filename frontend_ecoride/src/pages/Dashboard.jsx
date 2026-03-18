import React from "react";

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ridesService, statsService } from '../services/api'
import { useFormatDate, useFormatCurrency, getInitials } from '../hooks/useFormat'
import { LoadingRideCard } from '../components/Loading'
import { Car, Users, Leaf, Star, Plus, MapPin, Clock, ChevronRight, Calendar, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { formatDate, formatTime } = useFormatDate()
  const { formatCurrency } = useFormatCurrency()

  const [activeTab, setActiveTab] = useState('all')
  const [rides, setRides] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/dashboard' } })
      return
    }
    fetchData()
  }, [isAuthenticated, activeTab])

  const fetchData = async () => {
    setLoading(true)
    try {
      const type = activeTab === 'all' ? undefined : activeTab
      const [ridesResponse, statsResponse] = await Promise.all([
        ridesService.getUserRides(type),
        statsService.getUser()
      ])
      if (ridesResponse.success) setRides(ridesResponse.data.rides)
      if (statsResponse.success) setStats(statsResponse.data.stats)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) return null

  const tabs = [
    { id: 'all', label: 'Todas' },
    { id: 'driver', label: 'Como motorista' },
    { id: 'passenger', label: 'Como passageiro' }
  ]

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="container-app py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-slate-800">Minhas Viagens</h1>
            <p className="text-slate-600 mt-1">Gerencie suas caronas como motorista e passageiro</p>
          </div>
          <Link to="/publish" className="btn-primary inline-flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nova carona
          </Link>
        </div>

        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Car className="w-5 h-5 text-primary-600" />
                </div>
                <span className="text-sm text-slate-500">Viagens</span>
              </div>
              <p className="text-3xl font-bold text-slate-800">{stats.totalTrips || 0}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-secondary-600" />
                </div>
                <span className="text-sm text-slate-500">CO₂ economizado</span>
              </div>
              <p className="text-3xl font-bold text-secondary-600">{stats.co2Saved || 0}<span className="text-lg">g</span></p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent-600" />
                </div>
                <span className="text-sm text-slate-500">Economizado</span>
              </div>
              <p className="text-3xl font-bold text-slate-800">{formatCurrency(stats.moneySaved || 0)}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-500" />
                </div>
                <span className="text-sm text-slate-500">Avaliação</span>
              </div>
              <p className="text-3xl font-bold text-slate-800">{stats.rating ? stats.rating.toFixed(1) : '-'}</p>
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-primary-500 text-white shadow-soft' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {loading ? (
            <><LoadingRideCard /><LoadingRideCard /><LoadingRideCard /></>
          ) : rides.length > 0 ? (
            rides.map(ride => (
              <Link key={ride.id} to={`/ride/${ride.id}`} className="block bg-white rounded-2xl p-5 shadow-soft hover:shadow-medium transition-all card-hover">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex flex-col items-center pt-1">
                    <div className="w-3 h-3 rounded-full bg-primary-500 ring-4 ring-primary-100"></div>
                    <div className="w-0.5 h-10 bg-gradient-to-b from-primary-300 to-secondary-300"></div>
                    <div className="w-3 h-3 rounded-full bg-secondary-500 ring-4 ring-secondary-100"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary-500 sm:hidden" />
                        <span className="font-semibold text-slate-800">{ride.origin_city}</span>
                        <span className="text-slate-400">→</span>
                        <span className="font-semibold text-slate-800">{ride.destination_city}</span>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${ride.status === 'active' ? 'bg-secondary-100 text-secondary-700' : ride.status === 'completed' ? 'bg-slate-100 text-slate-600' : ride.status === 'full' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                        {ride.status === 'active' && 'Ativa'}
                        {ride.status === 'completed' && 'Concluída'}
                        {ride.status === 'full' && 'Lotada'}
                        {ride.status === 'cancelled' && 'Cancelada'}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(ride.departure_date, "dd 'de' MMM")}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{formatTime(ride.departure_time)}</span>
                      <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{ride.available_seats} lugares</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary-600">{formatCurrency(ride.price_per_seat)}</p>
                      <p className="text-xs text-slate-500">por pessoa</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-medium">
                      {getInitials(ride.driver_id === user?.id ? user?.name : ride.driver?.name)}
                    </div>
                    <span className="text-sm text-slate-600">
                      {ride.driver_id === user?.id ? <span className="text-primary-600 font-medium">Você é o motorista</span> : <span>Você é passageiro</span>}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
                <Car className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="font-display text-xl font-semibold text-slate-800 mb-2">Nenhuma viagem encontrada</h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                {activeTab === 'driver' ? 'Você ainda não publicou nenhuma carona como motorista.' : activeTab === 'passenger' ? 'Você ainda não reservou nenhuma carona como passageiro.' : 'Você ainda não tem viagens registradas.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/publish" className="btn-primary inline-flex items-center justify-center gap-2"><Plus className="w-4 h-4" />Oferecer carona</Link>
                <Link to="/search" className="btn-secondary">Buscar carona</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
