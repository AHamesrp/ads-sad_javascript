import React from "react";

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { formatPhone, getInitials } from '../hooks/useFormat'
import { User, Mail, Phone, Camera, Save, Star, Car, Leaf, Shield } from 'lucide-react'

export default function Profile() {
  const navigate = useNavigate()
  const { user, isAuthenticated, updateUser } = useAuth()

  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    preferences: user?.preferences || {
      smoking_allowed: false,
      pets_allowed: false,
      music_allowed: true
    }
  })

  if (!isAuthenticated) {
    navigate('/login', { state: { from: '/profile' } })
    return null
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '')
      if (digits.length <= 2) {
        value = digits.length > 0 ? `(${digits}` : ''
      } else if (digits.length <= 7) {
        value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`
      } else {
        value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
      }
    }
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePreferenceChange = (pref) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [pref]: !prev.preferences[pref]
      }
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    const result = await updateUser({
      name: formData.name,
      phone: formData.phone,
      preferences: formData.preferences
    })
    setLoading(false)
    if (result.success) {
      setEditing(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="container-app py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-slate-800 mb-8">Meu Perfil</h1>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-8">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold border-4 border-white/30">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      getInitials(user?.name)
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-white">
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <p className="text-white/80">{user?.email}</p>
                  <div className="flex items-center gap-4 mt-2">
                    {user?.rating_average > 0 && (
                      <span className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        {user.rating_average.toFixed(1)}
                      </span>
                    )}
                    {user?.total_trips > 0 && (
                      <span className="flex items-center gap-1 text-sm text-white/80">
                        <Car className="w-4 h-4" />
                        {user.total_trips} viagens
                      </span>
                    )}
                    {user?.is_verified && (
                      <span className="flex items-center gap-1 text-sm text-secondary-300">
                        <Shield className="w-4 h-4" />
                        Verificado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Stats */}
              {user?.co2_saved > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-secondary-50 border border-secondary-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-secondary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-secondary-600">CO₂ economizado</p>
                      <p className="text-2xl font-bold text-secondary-700">{Math.round(user.co2_saved * 1000)}g</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nome completo</label>
                  {editing ? (
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field pl-12"
                      />
                    </div>
                  ) : (
                    <p className="px-4 py-3 rounded-xl bg-slate-50 text-slate-800">{user?.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <p className="pl-12 px-4 py-3 rounded-xl bg-slate-100 text-slate-500">{user?.email}</p>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Email não pode ser alterado</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Telefone</label>
                  {editing ? (
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={15}
                        className="input-field pl-12"
                      />
                    </div>
                  ) : (
                    <p className="px-4 py-3 rounded-xl bg-slate-50 text-slate-800">{formatPhone(user?.phone) || 'Não informado'}</p>
                  )}
                </div>

                {/* Preferences */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Preferências de viagem</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      disabled={!editing}
                      onClick={() => editing && handlePreferenceChange('smoking_allowed')}
                      className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                        formData.preferences.smoking_allowed
                          ? 'border-primary-400 bg-primary-50'
                          : 'border-slate-200'
                      } ${!editing ? 'opacity-60 cursor-not-allowed' : 'hover:border-slate-300'}`}
                    >
                      <span className={formData.preferences.smoking_allowed ? 'text-primary-700' : 'text-slate-600'}>
                        🚬 Fumar
                      </span>
                    </button>
                    <button
                      type="button"
                      disabled={!editing}
                      onClick={() => editing && handlePreferenceChange('pets_allowed')}
                      className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                        formData.preferences.pets_allowed
                          ? 'border-secondary-400 bg-secondary-50'
                          : 'border-slate-200'
                      } ${!editing ? 'opacity-60 cursor-not-allowed' : 'hover:border-slate-300'}`}
                    >
                      <span className={formData.preferences.pets_allowed ? 'text-secondary-700' : 'text-slate-600'}>
                        🐕 Pets
                      </span>
                    </button>
                    <button
                      type="button"
                      disabled={!editing}
                      onClick={() => editing && handlePreferenceChange('music_allowed')}
                      className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                        formData.preferences.music_allowed
                          ? 'border-primary-400 bg-primary-50'
                          : 'border-slate-200'
                      } ${!editing ? 'opacity-60 cursor-not-allowed' : 'hover:border-slate-300'}`}
                    >
                      <span className={formData.preferences.music_allowed ? 'text-primary-700' : 'text-slate-600'}>
                        🎵 Música
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                {editing ? (
                  <>
                    <button
                      onClick={() => {
                        setEditing(false)
                        setFormData({
                          name: user?.name || '',
                          phone: user?.phone || '',
                          preferences: user?.preferences || { smoking_allowed: false, pets_allowed: false, music_allowed: true }
                        })
                      }}
                      className="btn-secondary"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="btn-primary flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Salvar alterações
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <button onClick={() => setEditing(true)} className="btn-primary">
                    Editar perfil
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
