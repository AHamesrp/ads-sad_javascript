import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Car, Search, Plus, Home, MapPin } from 'lucide-react';
import { useAuthStore } from '../store';
import { getInitials } from '../utils/helpers';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="header-container">
          <Link to="/" className="header-logo">
            <div className="logo-icon">
              <Car size={24} />
            </div>
            <span className="logo-text">EcoRide</span>
          </Link>

          <nav className="header-nav-desktop">
            <Link to="/buscar" className={`nav-link ${isActive('/buscar') ? 'active' : ''}`}>
              <Search size={18} />
              <span>Buscar</span>
            </Link>
            {isAuthenticated && (
              <Link to="/publicar" className={`nav-link ${isActive('/publicar') ? 'active' : ''}`}>
                <Plus size={18} />
                <span>Publicar</span>
              </Link>
            )}
          </nav>

          <div className="header-actions-desktop">
            {isAuthenticated ? (
              <div className="user-menu-desktop">
                <Link to="/perfil" className="user-button">
                  <div className="user-avatar">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <span>{getInitials(user?.name)}</span>
                    )}
                  </div>
                  <span className="user-name">{user?.name?.split(' ')[0]}</span>
                </Link>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/entrar" className="btn btn-ghost">Entrar</Link>
                <Link to="/cadastro" className="btn btn-primary">Cadastrar</Link>
              </div>
            )}
          </div>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)} />
        <div className="mobile-menu-content">
          {isAuthenticated && (
            <div className="mobile-user-section">
              <div className="mobile-user-avatar">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <span>{getInitials(user?.name)}</span>
                )}
              </div>
              <div className="mobile-user-info">
                <span className="mobile-user-name">{user?.name}</span>
                <span className="mobile-user-email">{user?.email}</span>
              </div>
            </div>
          )}

          <nav className="mobile-nav">
            <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}>
              <Home size={20} />
              <span>Início</span>
            </Link>
            <Link to="/buscar" className={`mobile-nav-link ${isActive('/buscar') ? 'active' : ''}`}>
              <Search size={20} />
              <span>Buscar carona</span>
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/publicar" className={`mobile-nav-link ${isActive('/publicar') ? 'active' : ''}`}>
                  <Plus size={20} />
                  <span>Publicar carona</span>
                </Link>
                <Link to="/minhas-caronas" className={`mobile-nav-link ${isActive('/minhas-caronas') ? 'active' : ''}`}>
                  <Car size={20} />
                  <span>Minhas caronas</span>
                </Link>
                <Link to="/perfil" className={`mobile-nav-link ${isActive('/perfil') ? 'active' : ''}`}>
                  <User size={20} />
                  <span>Meu perfil</span>
                </Link>
              </>
            )}
          </nav>

          <div className="mobile-menu-footer">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="mobile-logout-btn">
                <LogOut size={20} />
                <span>Sair da conta</span>
              </button>
            ) : (
              <div className="mobile-auth-buttons">
                <Link to="/entrar" className="btn btn-secondary btn-block">Entrar</Link>
                <Link to="/cadastro" className="btn btn-primary btn-block">Criar conta</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="bottom-nav">
        <Link to="/" className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}>
          <Home size={22} />
          <span>Início</span>
        </Link>
        <Link to="/buscar" className={`bottom-nav-item ${isActive('/buscar') ? 'active' : ''}`}>
          <Search size={22} />
          <span>Buscar</span>
        </Link>
        {isAuthenticated && (
          <Link to="/publicar" className={`bottom-nav-item publish-btn ${isActive('/publicar') ? 'active' : ''}`}>
            <div className="publish-icon">
              <Plus size={24} />
            </div>
            <span>Publicar</span>
          </Link>
        )}
        <Link to="/minhas-caronas" className={`bottom-nav-item ${isActive('/minhas-caronas') ? 'active' : ''}`}>
          <Car size={22} />
          <span>Caronas</span>
        </Link>
        <Link to={isAuthenticated ? '/perfil' : '/entrar'} className={`bottom-nav-item ${isActive('/perfil') ? 'active' : ''}`}>
          <User size={22} />
          <span>{isAuthenticated ? 'Perfil' : 'Entrar'}</span>
        </Link>
      </nav>
    </>
  );
}
