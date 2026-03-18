import React from "react";

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ridesService } from '../services/api'
import { brazilianStates } from '../hooks/useFormat'
import toast from 'react-hot-toast'
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign,
  Car,
  FileText,
  ArrowRight,
  ArrowLeft,
  Cigarette,
  Dog,
  Music,
  Leaf,
  CheckCircle2
} from 'lucide-react'

export default function PublishRide() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    origin: { city: '', state: 'SP', address: '' },
    destination: { city: '', state: 'RJ', address: '' },
    departureDate: '',
    departureTime: '',
    availableSeats: 3,
    pricePerSeat: '',
    vehicle: { model: '', color: '', plate: '' },
    description: '',
    distance: '',
    preferences: {
      smoking_allowed: false,
      pets_allowed: false,
      music_allowed: true
    }
  })

  const [errors, setErrors] = useState({})

  if (!isAuthenticated) {
    navigate('/login', { state: { from: '/publish' } })
    return null
  }

  const handleChange = (field, value) => {
    setFormData(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.')
        return {
          ...prev,
          [parent]: { ...prev[parent], [child]: value }
        }
      }
      return { ...prev, [field]: value }
    })
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateStep = (currentStep) => {
    const newErrors = {}

    if (currentStep === 1) {
      if (!formData.origin.city.trim()) newErrors['origin.city'] = 'Cidade de origem é obrigatória'
      if (!formData.destination.city.trim()) newErrors['destination.city'] = 'Cidade de destino é obrigatória'
    }

    if (currentStep === 2) {
      if (!formData.departureDate) newErrors.departureDate = 'Data é obrigatória'
      if (!formData.departureTime) newErrors.departureTime = 'Horário é obrigatório'
      
      if (formData.departureDate) {
        const selectedDate = new Date(formData.departureDate)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (selectedDate < today) {
          newErrors.departureDate = 'Data não pode ser no passado'
        }
      }
    }

    if (currentStep === 3) {
      if (!formData.pricePerSeat || parseFloat(formData.pricePerSeat) < 1) {
        newErrors.pricePerSeat = 'Preço deve ser maior que R$ 1'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    setStep(prev => prev - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(step)) return

    setLoading(true)
    try {
      const response = await ridesService.create({
        origin: formData.origin,
        destination: formData.destination,
        departureDate: formData.departureDate,
        departureTime: formData.departureTime,
        availableSeats: formData.availableSeats,
        pricePerSeat: parseFloat(formData.pricePerSeat),
        vehicle: formData.vehicle,
        description: formData.description,
        distance: formData.distance ? parseInt(formData.distance) : null,
        preferences: formData.preferences
      })

      if (response.success) {
        toast.success('Carona publicada com sucesso!')
        navigate(`/ride/${response.data.ride.id}`)
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao publicar carona'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  const steps = [
    { number: 1, title: 'Trajeto', icon: MapPin },
    { number: 2, title: 'Data e Hora', icon: Calendar },
    { number: 3, title: 'Preço', icon: DollarSign },
    { number: 4, title: 'Detalhes', icon: Car }
  ]

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12">
      <div className="container-app py-8">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            Publicar uma carona
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            Ofereça lugares no seu carro e divida os custos da viagem.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div className={`flex flex-col items-center ${index > 0 ? 'ml-4 sm:ml-8' : ''}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    step >= s.number 
                      ? 'bg-primary-500 text-white shadow-soft' 
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    {step > s.number ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <s.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-medium hidden sm:block ${
                    step >= s.number ? 'text-primary-600' : 'text-slate-400'
                  }`}>
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-8 sm:w-16 ml-4 sm:ml-8 transition-colors ${
                    step > s.number ? 'bg-primary-500' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="font-display text-xl font-semibold text-slate-800 mb-6">
                    De onde você sai e para onde vai?
                  </h2>

                  <div className="space-y-4 p-4 rounded-xl bg-primary-50 border border-primary-100">
                    <div className="flex items-center gap-2 text-primary-600 font-medium">
                      <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                      Origem
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Cidade *</label>
                        <input
                          type="text"
                          value={formData.origin.city}
                          onChange={(e) => handleChange('origin.city', e.target.value)}
                          placeholder="Ex: São Paulo"
                          className={`input-field ${errors['origin.city'] ? 'border-red-400' : ''}`}
                        />
                        {errors['origin.city'] && <p className="mt-1 text-sm text-red-500">{errors['origin.city']}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Estado *</label>
                        <select value={formData.origin.state} onChange={(e) => handleChange('origin.state', e.target.value)} className="input-field">
                          {brazilianStates.map(state => <option key={state.value} value={state.value}>{state.value}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Ponto de encontro (opcional)</label>
                      <input type="text" value={formData.origin.address} onChange={(e) => handleChange('origin.address', e.target.value)} placeholder="Ex: Metrô Sé" className="input-field" />
                    </div>
                  </div>

                  <div className="space-y-4 p-4 rounded-xl bg-secondary-50 border border-secondary-100">
                    <div className="flex items-center gap-2 text-secondary-600 font-medium">
                      <div className="w-3 h-3 rounded-full bg-secondary-500"></div>
                      Destino
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Cidade *</label>
                        <input
                          type="text"
                          value={formData.destination.city}
                          onChange={(e) => handleChange('destination.city', e.target.value)}
                          placeholder="Ex: Rio de Janeiro"
                          className={`input-field ${errors['destination.city'] ? 'border-red-400' : ''}`}
                        />
                        {errors['destination.city'] && <p className="mt-1 text-sm text-red-500">{errors['destination.city']}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Estado *</label>
                        <select value={formData.destination.state} onChange={(e) => handleChange('destination.state', e.target.value)} className="input-field">
                          {brazilianStates.map(state => <option key={state.value} value={state.value}>{state.value}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Ponto de chegada (opcional)</label>
                      <input type="text" value={formData.destination.address} onChange={(e) => handleChange('destination.address', e.target.value)} placeholder="Ex: Rodoviária Novo Rio" className="input-field" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Distância aproximada (km)</label>
                    <input type="number" value={formData.distance} onChange={(e) => handleChange('distance', e.target.value)} placeholder="Ex: 430" className="input-field" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="font-display text-xl font-semibold text-slate-800 mb-6">Quando você vai viajar?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Data da viagem *</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="date" value={formData.departureDate} onChange={(e) => handleChange('departureDate', e.target.value)} min={today} className={`input-field pl-12 ${errors.departureDate ? 'border-red-400' : ''}`} />
                      </div>
                      {errors.departureDate && <p className="mt-1 text-sm text-red-500">{errors.departureDate}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Horário de saída *</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="time" value={formData.departureTime} onChange={(e) => handleChange('departureTime', e.target.value)} className={`input-field pl-12 ${errors.departureTime ? 'border-red-400' : ''}`} />
                      </div>
                      {errors.departureTime && <p className="mt-1 text-sm text-red-500">{errors.departureTime}</p>}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="font-display text-xl font-semibold text-slate-800 mb-6">Preço e lugares</h2>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Lugares disponíveis *</label>
                    <div className="flex items-center gap-4">
                      {[1, 2, 3, 4].map(num => (
                        <button key={num} type="button" onClick={() => handleChange('availableSeats', num)} className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${formData.availableSeats === num ? 'bg-primary-500 text-white shadow-soft' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                          {num}
                        </button>
                      ))}
                      <Users className="w-5 h-5 text-slate-400 ml-2" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Preço por pessoa *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">R$</span>
                      <input type="number" value={formData.pricePerSeat} onChange={(e) => handleChange('pricePerSeat', e.target.value)} placeholder="0,00" min="1" step="0.01" className={`input-field pl-12 text-2xl font-bold ${errors.pricePerSeat ? 'border-red-400' : ''}`} />
                    </div>
                    {errors.pricePerSeat && <p className="mt-1 text-sm text-red-500">{errors.pricePerSeat}</p>}
                  </div>
                  {formData.pricePerSeat && (
                    <div className="p-4 rounded-xl bg-secondary-50 border border-secondary-100">
                      <div className="flex items-center gap-2 text-secondary-700 mb-2">
                        <Leaf className="w-5 h-5" />
                        <span className="font-medium">Estimativa de ganhos</span>
                      </div>
                      <p className="text-2xl font-bold text-secondary-600">R$ {(parseFloat(formData.pricePerSeat) * formData.availableSeats).toFixed(2)}</p>
                      <p className="text-sm text-secondary-600">se todos os {formData.availableSeats} lugares forem preenchidos</p>
                    </div>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="font-display text-xl font-semibold text-slate-800 mb-6">Detalhes adicionais</h2>
                  <div className="space-y-4 p-4 rounded-xl bg-slate-50">
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                      <Car className="w-5 h-5" />
                      Veículo (opcional)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <input type="text" value={formData.vehicle.model} onChange={(e) => handleChange('vehicle.model', e.target.value)} placeholder="Modelo" className="input-field" />
                      <input type="text" value={formData.vehicle.color} onChange={(e) => handleChange('vehicle.color', e.target.value)} placeholder="Cor" className="input-field" />
                      <input type="text" value={formData.vehicle.plate} onChange={(e) => handleChange('vehicle.plate', e.target.value.toUpperCase())} placeholder="Placa" maxLength={7} className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <FileText className="w-4 h-4 inline mr-2" />
                      Descrição da viagem
                    </label>
                    <textarea value={formData.description} onChange={(e) => handleChange('description', e.target.value)} placeholder="Conte mais sobre a viagem..." rows={3} className="input-field resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Preferências</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button type="button" onClick={() => handleChange('preferences', { ...formData.preferences, smoking_allowed: !formData.preferences.smoking_allowed })} className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${formData.preferences.smoking_allowed ? 'border-primary-400 bg-primary-50' : 'border-slate-200 hover:border-slate-300'}`}>
                        <Cigarette className={`w-5 h-5 ${formData.preferences.smoking_allowed ? 'text-primary-600' : 'text-slate-400'}`} />
                        <span className={formData.preferences.smoking_allowed ? 'text-primary-700' : 'text-slate-600'}>Fumar OK</span>
                      </button>
                      <button type="button" onClick={() => handleChange('preferences', { ...formData.preferences, pets_allowed: !formData.preferences.pets_allowed })} className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${formData.preferences.pets_allowed ? 'border-secondary-400 bg-secondary-50' : 'border-slate-200 hover:border-slate-300'}`}>
                        <Dog className={`w-5 h-5 ${formData.preferences.pets_allowed ? 'text-secondary-600' : 'text-slate-400'}`} />
                        <span className={formData.preferences.pets_allowed ? 'text-secondary-700' : 'text-slate-600'}>Pets OK</span>
                      </button>
                      <button type="button" onClick={() => handleChange('preferences', { ...formData.preferences, music_allowed: !formData.preferences.music_allowed })} className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${formData.preferences.music_allowed ? 'border-primary-400 bg-primary-50' : 'border-slate-200 hover:border-slate-300'}`}>
                        <Music className={`w-5 h-5 ${formData.preferences.music_allowed ? 'text-primary-600' : 'text-slate-400'}`} />
                        <span className={formData.preferences.music_allowed ? 'text-primary-700' : 'text-slate-600'}>Música OK</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                {step > 1 ? (
                  <button type="button" onClick={prevStep} className="btn-secondary flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                  </button>
                ) : <div></div>}

                {step < 4 ? (
                  <button type="button" onClick={nextStep} className="btn-primary flex items-center gap-2">
                    Próximo
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Publicando...
                      </>
                    ) : (
                      <>
                        Publicar carona
                        <CheckCircle2 className="w-5 h-5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
