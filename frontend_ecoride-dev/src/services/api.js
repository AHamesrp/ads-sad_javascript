import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

// Criar instância do axios com configurações padrão
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ecoride_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('ecoride_token')
      localStorage.removeItem('ecoride_user')
      // Redirecionar para login se não estiver na página de login
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// ============== AUTH SERVICES ==============
export const authService = {
  async register(userData) {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  async login(email, password) {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  async getProfile() {
    const response = await api.get('/auth/profile')
    return response.data
  },

  async updateProfile(updates) {
    const response = await api.put('/auth/profile', updates)
    return response.data
  },
}

// ============== RIDES SERVICES ==============
export const ridesService = {
  async search(params) {
    const response = await api.get('/rides/search', { params })
    return response.data
  },

  async getPopular() {
    const response = await api.get('/rides/popular')
    return response.data
  },

  async getById(id) {
    const response = await api.get(`/rides/${id}`)
    return response.data
  },

  async create(rideData) {
    const response = await api.post('/rides', rideData)
    return response.data
  },

  async book(rideId, seatsRequested = 1) {
    const response = await api.post(`/rides/${rideId}/book`, { seatsRequested })
    return response.data
  },

  async cancelBooking(rideId) {
    const response = await api.delete(`/rides/${rideId}/book`)
    return response.data
  },

  async getUserRides(type) {
    const params = type ? { type } : {}
    const response = await api.get('/rides/user/rides', { params })
    return response.data
  },
}

// ============== STATS SERVICES ==============
export const statsService = {
  async getGlobal() {
    const response = await api.get('/stats/global')
    return response.data
  },

  async getUser() {
    const response = await api.get('/stats/user')
    return response.data
  },
}

// ============== NOTIFICATIONS SERVICES ==============
export const notificationsService = {
  async getAll() {
    const response = await api.get('/notifications')
    return response.data
  },

  async getUnreadCount() {
    const response = await api.get('/notifications/unread-count')
    return response.data
  },

  async markAsRead(id) {
    const response = await api.put(`/notifications/${id}/read`)
    return response.data
  },

  async markAllAsRead() {
    const response = await api.put('/notifications/mark-all-read')
    return response.data
  },
}

export default api
