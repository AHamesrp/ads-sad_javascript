import React from "react";

import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Car, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const from = location.state?.from || '/'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    const result = await login(formData.email, formData.password)
    setLoading(false)

    if (result.success) {
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-primary-700">
              Eco<span className="text-secondary-500">Ride</span>
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-slate-800 mb-2">
              Bem-vindo de volta!
            </h1>
            <p className="text-slate-600">
              Entre com sua conta para continuar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className={`input-field pl-12 ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`input-field pl-12 pr-12 ${errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Esqueceu a senha?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-sm text-slate-400">ou</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Register Link */}
          <p className="text-center text-slate-600">
            Ainda não tem conta?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
              Criar conta grátis
            </Link>
          </p>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-sm font-medium text-slate-700 mb-2">Dados de teste:</p>
            <p className="text-sm text-slate-500">Email: maria@example.com</p>
            <p className="text-sm text-slate-500">Senha: 123456</p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Decoration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white text-center">
          <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8">
            <Car className="w-12 h-12" />
          </div>
          <h2 className="font-display text-4xl font-bold mb-4">
            Viaje junto,<br />economize mais
          </h2>
          <p className="text-white/80 max-w-md text-lg">
            Junte-se a milhares de pessoas que já economizam e viajam de forma sustentável com o EcoRide.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div>
              <p className="text-3xl font-bold">50K+</p>
              <p className="text-white/60 text-sm">Usuários</p>
            </div>
            <div>
              <p className="text-3xl font-bold">100K+</p>
              <p className="text-white/60 text-sm">Viagens</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary-400">25t</p>
              <p className="text-white/60 text-sm">CO₂ economizado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
