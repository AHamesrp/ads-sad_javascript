import React from "react";

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ridesService } from '../services/api'
import SearchForm from '../components/SearchForm'
import RideCard from '../components/RideCard'
import { LoadingRideCard } from '../components/Loading'
import { 
  Search, 
  SlidersHorizontal, 
  Car, 
  MapPin, 
  ArrowUpDown,
  X,
  Filter
} from 'lucide-react'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const [rides, setRides] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('departure')
  const [filters, setFilters] = useState({
    priceMax: '',
    seatsMin: 1
  })

  const initialValues = {
    origin: searchParams.get('origin') || '',
    destination: searchParams.get('destination') || '',
    date: searchParams.get('date') || '',
    passengers: parseInt(searchParams.get('passengers')) || 1
  }

  useEffect(() => {
    fetchRides()
  }, [searchParams])

  const fetchRides = async () => {
    setLoading(true)
    try {
      const params = {
        origin: searchParams.get('origin'),
        destination: searchParams.get('destination'),
        date: searchParams.get('date'),
        passengers: searchParams.get('passengers')
      }

      // Remove null/undefined values
      Object.keys(params).forEach(key => {
        if (!params[key]) delete params[key]
      })

      const response = await ridesService.search(params)
      
      if (response.success) {
        setRides(response.data.rides)
      }
    } catch (error) {
      console.error('Erro ao buscar caronas:', error)
      setRides([])
    } finally {
      setLoading(false)
    }
  }

  // Filtrar e ordenar rides
  const filteredRides = rides
    .filter(ride => {
      if (filters.priceMax && ride.price_per_seat > parseFloat(filters.priceMax)) {
        return false
      }
      if (ride.available_seats < filters.seatsMin) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price_per_seat - b.price_per_seat
        case 'price_desc':
          return b.price_per_seat - a.price_per_seat
        case 'departure':
        default:
          return new Date(a.departure_date) - new Date(b.departure_date)
      }
    })

  const hasSearchParams = searchParams.get('origin') || searchParams.get('destination')

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Search Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 md:top-20 z-40">
        <div className="container-app py-4">
          <SearchForm variant="inline" initialValues={initialValues} />
        </div>
      </div>

      <div className="container-app py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-40">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-lg text-slate-800">Filtros</h3>
                <SlidersHorizontal className="w-5 h-5 text-slate-400" />
              </div>

              <div className="space-y-6">
                {/* Price Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preço máximo
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">R$</span>
                    <input
                      type="number"
                      value={filters.priceMax}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceMax: e.target.value }))}
                      placeholder="Sem limite"
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                {/* Seats Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Assentos mínimos
                  </label>
                  <select
                    value={filters.seatsMin}
                    onChange={(e) => setFilters(prev => ({ ...prev, seatsMin: parseInt(e.target.value) }))}
                    className="input-field"
                  >
                    <option value={1}>1 assento</option>
                    <option value={2}>2 assentos</option>
                    <option value={3}>3 assentos</option>
                    <option value={4}>4 assentos</option>
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Ordenar por
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-field"
                  >
                    <option value="departure">Data de saída</option>
                    <option value="price_asc">Menor preço</option>
                    <option value="price_desc">Maior preço</option>
                  </select>
                </div>

                {/* Clear Filters */}
                {(filters.priceMax || filters.seatsMin > 1) && (
                  <button
                    onClick={() => setFilters({ priceMax: '', seatsMin: 1 })}
                    className="w-full py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-primary-500 text-white px-5 py-3 rounded-full shadow-strong hover:bg-primary-600 transition-colors"
          >
            <Filter className="w-5 h-5" />
            Filtros
          </button>

          {/* Mobile Filters Modal */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowFilters(false)}>
              <div 
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-auto animate-slide-up"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-semibold text-xl">Filtros</h3>
                  <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Preço máximo
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">R$</span>
                      <input
                        type="number"
                        value={filters.priceMax}
                        onChange={(e) => setFilters(prev => ({ ...prev, priceMax: e.target.value }))}
                        placeholder="Sem limite"
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Assentos mínimos
                    </label>
                    <select
                      value={filters.seatsMin}
                      onChange={(e) => setFilters(prev => ({ ...prev, seatsMin: parseInt(e.target.value) }))}
                      className="input-field"
                    >
                      <option value={1}>1 assento</option>
                      <option value={2}>2 assentos</option>
                      <option value={3}>3 assentos</option>
                      <option value={4}>4 assentos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Ordenar por
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="input-field"
                    >
                      <option value="departure">Data de saída</option>
                      <option value="price_asc">Menor preço</option>
                      <option value="price_desc">Maior preço</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setFilters({ priceMax: '', seatsMin: 1 })}
                    className="flex-1 btn-secondary"
                  >
                    Limpar
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 btn-primary"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                {hasSearchParams ? (
                  <h1 className="font-display text-xl md:text-2xl font-semibold text-slate-800">
                    {searchParams.get('origin')} → {searchParams.get('destination')}
                  </h1>
                ) : (
                  <h1 className="font-display text-xl md:text-2xl font-semibold text-slate-800">
                    Todas as caronas disponíveis
                  </h1>
                )}
                <p className="text-slate-500 mt-1">
                  {loading ? 'Buscando...' : `${filteredRides.length} ${filteredRides.length === 1 ? 'carona encontrada' : 'caronas encontradas'}`}
                </p>
              </div>

              {/* Desktop Sort */}
              <div className="hidden md:flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border-0 bg-transparent text-slate-600 font-medium cursor-pointer focus:ring-0"
                >
                  <option value="departure">Data de saída</option>
                  <option value="price_asc">Menor preço</option>
                  <option value="price_desc">Maior preço</option>
                </select>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {loading ? (
                <>
                  <LoadingRideCard />
                  <LoadingRideCard />
                  <LoadingRideCard />
                </>
              ) : filteredRides.length > 0 ? (
                filteredRides.map(ride => (
                  <RideCard key={ride.id} ride={ride} />
                ))
              ) : (
                <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
                    <Car className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-slate-800 mb-2">
                    Nenhuma carona encontrada
                  </h3>
                  <p className="text-slate-500 mb-6 max-w-md mx-auto">
                    {hasSearchParams 
                      ? 'Tente ajustar os filtros ou buscar por outras datas e destinos.'
                      : 'Não há caronas disponíveis no momento. Que tal criar uma?'
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                      onClick={() => {
                        setFilters({ priceMax: '', seatsMin: 1 })
                      }}
                      className="btn-secondary"
                    >
                      Limpar filtros
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
