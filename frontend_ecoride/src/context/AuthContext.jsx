import React, {createContext, useContext, useState, useEffect, useCallback} from "react";
import { authService } from '../services/api'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('ecoride_token')
        const savedUser = localStorage.getItem('ecoride_user')
        
        if (token && savedUser) {
          setUser(JSON.parse(savedUser))
          setIsAuthenticated(true)
          
          // Verificar se o token ainda é válido
          try {
            const response = await authService.getProfile()
            if (response.success) {
              setUser(response.data.user)
              localStorage.setItem('ecoride_user', JSON.stringify(response.data.user))
            }
          } catch (error) {
            // Token inválido, fazer logout
            logout()
          }
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      const response = await authService.login(email, password)
      
      if (response.success) {
        const { user: userData, token } = response.data
        
        localStorage.setItem('ecoride_token', token)
        localStorage.setItem('ecoride_user', JSON.stringify(userData))
        
        setUser(userData)
        setIsAuthenticated(true)
        
        toast.success(`Bem-vindo de volta, ${userData.name.split(' ')[0]}!`)
        return { success: true }
      }
      
      return { success: false, message: response.message }
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao fazer login'
      toast.error(message)
      return { success: false, message }
    }
  }, [])

  const register = useCallback(async (userData) => {
    try {
      const response = await authService.register(userData)
      
      if (response.success) {
        const { user: newUser, token } = response.data
        
        localStorage.setItem('ecoride_token', token)
        localStorage.setItem('ecoride_user', JSON.stringify(newUser))
        
        setUser(newUser)
        setIsAuthenticated(true)
        
        toast.success(`Conta criada com sucesso! Bem-vindo, ${newUser.name.split(' ')[0]}!`)
        return { success: true }
      }
      
      return { success: false, message: response.message }
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao criar conta'
      toast.error(message)
      return { success: false, message }
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('ecoride_token')
    localStorage.removeItem('ecoride_user')
    setUser(null)
    setIsAuthenticated(false)
    toast.success('Até logo!')
  }, [])

  const updateUser = useCallback(async (updates) => {
    try {
      const response = await authService.updateProfile(updates)
      
      if (response.success) {
        const updatedUser = response.data.user
        setUser(updatedUser)
        localStorage.setItem('ecoride_user', JSON.stringify(updatedUser))
        toast.success('Perfil atualizado com sucesso!')
        return { success: true }
      }
      
      return { success: false, message: response.message }
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao atualizar perfil'
      toast.error(message)
      return { success: false, message }
    }
  }, [])

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

export default AuthContext
