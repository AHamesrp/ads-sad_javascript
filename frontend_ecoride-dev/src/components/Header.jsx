import React from "react";
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getInitials } from '../hooks/useFormat'
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Car, 
  Search, 
  Plus,
  ChevronDown,
  Settings,
  LayoutDashboard
} from 'lucide-react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // Detectar scroll para mudar estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fechar menus ao mudar de página
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsProfileMenuOpen(false)
  }, [location])

  // Fechar menu de perfil ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isProfileMenuOpen && !e.target.closest('.profile-menu-container')) {
        setIsProfileMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isProfileMenuOpen])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isHomePage = location.pathname === '/'

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'bg-white/95 backdrop-blur-md shadow-soft' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-app">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isScrolled || !isHomePage 
                ? 'bg-gradient-to-br from-primary-500 to-primary-700' 
                : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <Car className={`w-5 h-5 ${isScrolled || !isHomePage ? 'text-white' : 'text-white'}`} />
            </div>
            <span className={`font-display font-bold text-xl transition-colors duration-300 ${
              isScrolled || !isHomePage ? 'text-primary-700' : 'text-white'
            }`}>
              Eco<span className="text-secondary-500">Ride</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link 
              to="/search"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                isScrolled || !isHomePage
                  ? 'text-slate-600 hover:text-primary-600 hover:bg-primary-50'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <Search className="w-4 h-4" />
              Buscar
            </Link>
            
            {isAuthenticated && (
              <Link 
                to="/publish"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isScrolled || !isHomePage
                    ? 'text-slate-600 hover:text-primary-600 hover:bg-primary-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Plus className="w-4 h-4" />
                Publicar
              </Link>
            )}
          </div>

          {/* Desktop Auth/Profile */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="profile-menu-container relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                    isScrolled || !isHomePage
                      ? 'hover:bg-slate-100'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      getInitials(user?.name)
                    )}
                  </div>
                  <span className={`font-medium ${isScrolled || !isHomePage ? 'text-slate-700' : 'text-white'}`}>
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    isProfileMenuOpen ? 'rotate-180' : ''
                  } ${isScrolled || !isHomePage ? 'text-slate-500' : 'text-white/70'}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-strong border border-slate-100 py-2 animate-slide-down">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="font-semibold text-slate-800">{user?.name}</p>
                      <p className="text-sm text-slate-500">{user?.email}</p>
                    </div>
                    
                    <div className="py-2">
                      <Link 
                        to="/dashboard" 
                        className="flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Minhas Viagens
                      </Link>
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Meu Perfil
                      </Link>
                      <Link 
                        to="/settings" 
                        className="flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Configurações
                      </Link>
                    </div>
                    
                    <div className="border-t border-slate-100 pt-2">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  to="/login"
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    isScrolled || !isHomePage
                      ? 'text-slate-600 hover:text-primary-600'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Entrar
                </Link>
                <Link 
                  to="/register"
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                    isScrolled || !isHomePage
                      ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-soft'
                      : 'bg-white text-primary-600 hover:bg-white/90'
                  }`}
                >
                  Criar conta
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled || !isHomePage
                ? 'text-slate-600 hover:bg-slate-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-strong animate-slide-down">
            <div className="container-app py-4 space-y-2">
              <Link 
                to="/search"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              >
                <Search className="w-5 h-5" />
                Buscar carona
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/publish"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Publicar carona
                  </Link>
                  <Link 
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Minhas Viagens
                  </Link>
                  <Link 
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    Meu Perfil
                  </Link>
                  
                  <div className="border-t border-slate-100 pt-2 mt-2">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      Sair
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 mt-2">
                  <Link 
                    to="/login"
                    className="w-full px-4 py-3 text-center rounded-xl border-2 border-primary-200 text-primary-600 font-medium hover:bg-primary-50 transition-colors"
                  >
                    Entrar
                  </Link>
                  <Link 
                    to="/register"
                    className="w-full px-4 py-3 text-center rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
                  >
                    Criar conta
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
