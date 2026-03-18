import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService, rideService, statsService } from '../services/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login({ email, password });
          const { user, token } = response.data.data;
          localStorage.setItem('ecoride_token', token);
          set({ user, token, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || 'Erro ao fazer login';
          set({ error: message, isLoading: false });
          return { success: false, message };
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(userData);
          const { user, token } = response.data.data;
          localStorage.setItem('ecoride_token', token);
          set({ user, token, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || 'Erro ao registrar';
          set({ error: message, isLoading: false });
          return { success: false, message };
        }
      },

      logout: () => {
        localStorage.removeItem('ecoride_token');
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateProfile: async (data) => {
        set({ isLoading: true });
        try {
          const response = await authService.updateProfile(data);
          set({ user: response.data.data.user, isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, message: error.response?.data?.message };
        }
      },

      checkAuth: async () => {
        const token = localStorage.getItem('ecoride_token');
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return;
        }
        try {
          const response = await authService.getProfile();
          set({ user: response.data.data.user, isAuthenticated: true, token });
        } catch {
          localStorage.removeItem('ecoride_token');
          set({ isAuthenticated: false, user: null, token: null });
        }
      },
    }),
    {
      name: 'ecoride-auth',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export const useRideStore = create((set) => ({
  rides: [],
  popularRides: [],
  currentRide: null,
  userRides: [],
  searchResults: [],
  isLoading: false,
  error: null,

  searchRides: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await rideService.search(params);
      set({ searchResults: response.data.data.rides, isLoading: false });
      return response.data.data.rides;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return [];
    }
  },

  getPopularRides: async () => {
    set({ isLoading: true });
    try {
      const response = await rideService.getPopular();
      set({ popularRides: response.data.data.rides, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  getRideById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await rideService.getById(id);
      set({ currentRide: response.data.data.ride, isLoading: false });
      return response.data.data.ride;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  createRide: async (data) => {
    set({ isLoading: true });
    try {
      const response = await rideService.create(data);
      set({ isLoading: false });
      return { success: true, ride: response.data.data.ride };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.response?.data?.message };
    }
  },

  bookRide: async (id, seatsRequested = 1) => {
    set({ isLoading: true });
    try {
      const response = await rideService.book(id, { seatsRequested });
      set({ isLoading: false });
      return { success: true, ride: response.data.data.ride };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.response?.data?.message };
    }
  },

  getUserRides: async (type) => {
    set({ isLoading: true });
    try {
      const response = await rideService.getUserRides(type);
      set({ userRides: response.data.data.rides, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  clearSearch: () => set({ searchResults: [] }),
}));

export const useStatsStore = create((set) => ({
  globalStats: null,
  userStats: null,
  isLoading: false,

  getGlobalStats: async () => {
    set({ isLoading: true });
    try {
      const response = await statsService.getGlobal();
      set({ globalStats: response.data.data.stats, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  getUserStats: async () => {
    set({ isLoading: true });
    try {
      const response = await statsService.getUser();
      set({ userStats: response.data.data.stats, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));
