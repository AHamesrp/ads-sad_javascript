import React from "react";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Users, Search, ArrowRight } from 'lucide-react'

export default function SearchForm({ variant = 'default', initialValues = {} }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    origin: initialValues.origin || '',
    destination: initialValues.destination || '',
    date: initialValues.date || '',
    passengers: initialValues.passengers || 1
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (formData.origin) params.set('origin', formData.origin)
    if (formData.destination) params.set('destination', formData.destination)
    if (formData.date) params.set('date', formData.date)
    if (formData.passengers > 1) params.set('passengers', formData.passengers)
    
    navigate(`/search?${params.toString()}`)
  }

  const today = new Date().toISOString().split('T')[0]

  // Variante hero (para homepage)
  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="bg-white rounded-2xl shadow-strong p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Origin */}
            <div className="relative">
              <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">
                Saindo de
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-500" />
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  placeholder="Cidade de origem"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all outline-none text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Destination */}
            <div className="relative">
              <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">
                Indo para
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-500" />
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="Cidade de destino"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all outline-none text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Date */}
            <div className="relative">
              <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">
                Quando
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all outline-none text-slate-800"
                />
              </div>
            </div>

            {/* Passengers & Submit */}
            <div className="flex gap-3">
              <div className="relative flex-1 md:flex-none md:w-24">
                <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">
                  Pessoas
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <select
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all outline-none text-slate-800 appearance-none bg-white cursor-pointer"
                  >
                    {[1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="h-[50px] px-6 md:px-8 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-soft hover:shadow-medium flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  <span className="hidden md:inline">Buscar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }

  // Variante sidebar (para página de busca)
  if (variant === 'sidebar') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Saindo de
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-500" />
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="Cidade de origem"
              className="input-field pl-11"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Indo para
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-500" />
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Cidade de destino"
              className="input-field pl-11"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Data da viagem
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={today}
              className="input-field pl-11"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Passageiros
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              className="input-field pl-11 appearance-none cursor-pointer"
            >
              {[1, 2, 3, 4].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'pessoa' : 'pessoas'}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          Buscar caronas
        </button>
      </form>
    )
  }

  // Variante inline (para header de busca)
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 flex-wrap">
      <div className="relative flex-1 min-w-[150px]">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500" />
        <input
          type="text"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          placeholder="De onde?"
          className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all outline-none text-sm"
        />
      </div>

      <ArrowRight className="w-4 h-4 text-slate-400 hidden sm:block" />

      <div className="relative flex-1 min-w-[150px]">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-500" />
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Para onde?"
          className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all outline-none text-sm"
        />
      </div>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        min={today}
        className="px-3 py-2.5 rounded-lg border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all outline-none text-sm"
      />

      <button
        type="submit"
        className="px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Buscar</span>
      </button>
    </form>
  )
}
