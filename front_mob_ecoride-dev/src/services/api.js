import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ecoride_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ecoride_token');
      localStorage.removeItem('ecoride_user');
      window.location.href = '/entrar';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const rideService = {
  search: (params) => api.get('/rides/search', { params }),
  getPopular: () => api.get('/rides/popular'),
  getById: (id) => api.get(`/rides/${id}`),
  create: (data) => api.post('/rides', data),
  book: (id, data) => api.post(`/rides/${id}/book`, data),
  cancelBooking: (id) => api.delete(`/rides/${id}/book`),
  getUserRides: (type) => api.get('/rides/user/rides', { params: { type } }),
};

export const statsService = {
  getGlobal: () => api.get('/stats/global'),
  getUser: () => api.get('/stats/user'),
};

export default api;
