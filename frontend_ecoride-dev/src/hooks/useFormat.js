import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Hook para formatação de datas
export function useFormatDate() {
  const formatDate = (date, pattern = 'dd/MM/yyyy') => {
    if (!date) return ''
    const parsedDate = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(parsedDate)) return ''
    return format(parsedDate, pattern, { locale: ptBR })
  }

  const formatTime = (time) => {
    if (!time) return ''
    // Se já está no formato HH:mm, retorna diretamente
    if (typeof time === 'string' && time.match(/^\d{2}:\d{2}/)) {
      return time.substring(0, 5)
    }
    return time
  }

  const formatDateTime = (date, time) => {
    const formattedDate = formatDate(date, "EEEE, d 'de' MMMM")
    const formattedTime = formatTime(time)
    return `${formattedDate} às ${formattedTime}`
  }

  const formatRelative = (date) => {
    if (!date) return ''
    const parsedDate = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(parsedDate)) return ''
    return formatDistanceToNow(parsedDate, { addSuffix: true, locale: ptBR })
  }

  return { formatDate, formatTime, formatDateTime, formatRelative }
}

// Hook para formatação de moeda
export function useFormatCurrency() {
  const formatCurrency = (value) => {
    if (value === null || value === undefined) return 'R$ 0,00'
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return { formatCurrency }
}

// Hook para formatação de números
export function useFormatNumber() {
  const formatNumber = (value, decimals = 0) => {
    if (value === null || value === undefined) return '0'
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value)
  }

  const formatCompact = (value) => {
    if (value === null || value === undefined) return '0'
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  return { formatNumber, formatCompact }
}

// Função utilitária para formatar telefone
export function formatPhone(phone) {
  if (!phone) return ''
  // Remove tudo que não é número
  const numbers = phone.replace(/\D/g, '')
  // Formata como (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  if (numbers.length === 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
  }
  if (numbers.length === 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
  }
  return phone
}

// Função para validar email
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Função para validar telefone brasileiro
export function isValidPhone(phone) {
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/
  return phoneRegex.test(phone)
}

// Função para gerar iniciais do nome
export function getInitials(name) {
  if (!name) return ''
  const parts = name.trim().split(' ')
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// Função para calcular economia de CO2
export function calculateCO2Savings(distance, passengers = 1) {
  // Média de 120g de CO2 por km por carro
  // Dividido pelo número de pessoas na carona
  const co2PerKm = 0.12 // kg
  const savings = (distance * co2PerKm * (passengers - 1)) / passengers
  return Math.round(savings * 100) / 100
}

// Estados brasileiros
export const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]
