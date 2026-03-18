import React from "react";

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { formatPhone, isValidEmail, isValidPhone } from '../hooks/useFormat'
import { Car, User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleChange = (e) => {
    let { name, value } = e.target
    
    // Format phone as user types
    if (name === 'phone') {
      // Remove non-digits
      const digits = value.replace(/\D/g, '')
      // Format progressively
      if (digits.length <= 2) {
        value = digits.length > 0 ? `(${digits}` : ''
      } else if (digits.length <= 7) {
        value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`
      } else {
        value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres'
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.phone) {
      newErrors.phone = 'Telefone é obrigatório'
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Telefone inválido. Use: (11) 99999-9999'
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem'
    }

    if (!acceptTerms) {
      newErrors.terms = 'Você deve aceitar os termos de uso'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    const result = await register({
      name: formData.name.trim(),
      email: formData.email.toLowerCase(),
      phone: formData.phone,
      password: formData.password
    })
    setLoading(false)

    if (result.success) {
      navigate('/')
    }
  }

  const benefits = [
    'Economize até 75% em viagens',
    'Conheça pessoas incríveis',
    'Ajude o meio ambiente',
    'Viaje com segurança'
  ]

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image/Decoration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white">
          <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8">
            <Car className="w-12 h-12" />
          </div>
          <h2 className="font-display text-4xl font-bold mb-4 text-center">
            Comece sua<br />jornada verde
          </h2>
          <p className="text-white/80 max-w-md text-lg text-center mb-12">
            Crie sua conta grátis e faça parte da maior comunidade de caronas sustentáveis do Brasil.
          </p>

          {/* Benefits */}
          <div className="space-y-4 w-full max-w-sm">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
                <CheckCircle2 className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 overflow-auto">
        <div className="w-full max-w-md py-8">
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
              Criar sua conta
            </h1>
            <p className="text-slate-600">
              É grátis! Preencha os dados abaixo para começar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Nome completo
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  className={`input-field pl-12 ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

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

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                Telefone
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                  className={`input-field pl-12 ${errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1.5 text-sm text-red-500">{errors.phone}</p>
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
                  placeholder="Mínimo 6 caracteres"
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

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                Confirmar senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Digite a senha novamente"
                  className={`input-field pl-12 pr-12 ${errors.confirmPassword ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked)
                    if (errors.terms) setErrors(prev => ({ ...prev, terms: '' }))
                  }}
                  className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500 mt-0.5"
                />
                <span className="text-sm text-slate-600">
                  Li e aceito os{' '}
                  <Link to="/terms" className="text-primary-600 hover:underline">
                    Termos de Uso
                  </Link>
                  {' '}e a{' '}
                  <Link to="/privacy" className="text-primary-600 hover:underline">
                    Política de Privacidade
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1.5 text-sm text-red-500">{errors.terms}</p>
              )}
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
                  Criando conta...
                </>
              ) : (
                <>
                  Criar conta
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

          {/* Login Link */}
          <p className="text-center text-slate-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
