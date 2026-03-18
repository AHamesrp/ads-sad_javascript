import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, Star, Car, Leaf, Edit2, LogOut, 
  ChevronRight, Settings, Shield, Award, TrendingUp, Loader2
} from 'lucide-react';
import { useAuthStore, useStatsStore } from '../store';
import { getInitials, formatCO2 } from '../utils/helpers';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateProfile, isLoading } = useAuthStore();
  const { userStats, getUserStats } = useStatsStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    getUserStats();
  }, []);

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = async () => {
    await updateProfile(editData);
    setIsEditing(false);
  };

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 2) return `(${cleaned}`;
    if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  const stats = [
    {
      icon: <Car size={20} />,
      label: 'Viagens',
      value: userStats?.totalTrips || user?.total_trips || 0,
      color: '#2563eb',
      bg: '#eff6ff',
    },
    {
      icon: <Leaf size={20} />,
      label: 'CO₂ economizado',
      value: formatCO2(userStats?.co2Saved || 0),
      color: '#059669',
      bg: '#ecfdf5',
    },
    {
      icon: <Star size={20} />,
      label: 'Avaliação',
      value: user?.rating_average?.toFixed(1) || '0.0',
      color: '#f59e0b',
      bg: '#fffbeb',
    },
  ];

  const menuItems = [
    {
      icon: <Car size={20} />,
      label: 'Minhas caronas',
      to: '/minhas-caronas',
    },
    {
      icon: <Settings size={20} />,
      label: 'Configurações',
      to: '/configuracoes',
    },
    {
      icon: <Shield size={20} />,
      label: 'Verificar perfil',
      badge: !user?.is_verified ? 'Verificar' : null,
      to: '/verificar',
    },
  ];

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <Loader2 size={32} className="spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-header-bg" />
        <div className="container">
          <div className="profile-info">
            <div className="profile-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <span>{getInitials(user?.name)}</span>
              )}
              {user?.is_verified && (
                <div className="verified-badge-small">
                  <Shield size={12} />
                </div>
              )}
            </div>
            
            {isEditing ? (
              <div className="profile-edit-form">
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Seu nome"
                  className="input"
                />
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData(prev => ({ ...prev, phone: formatPhone(e.target.value) }))}
                  placeholder="(11) 99999-9999"
                  className="input"
                />
                <div className="edit-actions">
                  <button onClick={() => setIsEditing(false)} className="btn btn-ghost btn-sm">
                    Cancelar
                  </button>
                  <button onClick={handleSave} className="btn btn-primary btn-sm" disabled={isLoading}>
                    {isLoading ? <Loader2 size={16} className="spinner" /> : 'Salvar'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-details">
                <h1>{user?.name}</h1>
                <div className="profile-contact">
                  <span><Mail size={14} /> {user?.email}</span>
                  <span><Phone size={14} /> {user?.phone}</span>
                </div>
                <button onClick={() => setIsEditing(true)} className="edit-profile-btn">
                  <Edit2 size={14} />
                  Editar perfil
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="profile-content">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div 
                  className="stat-icon"
                  style={{ background: stat.bg, color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div className="stat-info">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          {user?.rating_count > 0 && (
            <div className="rating-card">
              <div className="rating-header">
                <Award size={20} />
                <span>Sua reputação</span>
              </div>
              <div className="rating-display">
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      fill={star <= Math.round(user.rating_average) ? '#f59e0b' : 'none'}
                      color={star <= Math.round(user.rating_average) ? '#f59e0b' : '#e2e8f0'}
                    />
                  ))}
                </div>
                <span className="rating-text">
                  {user.rating_average.toFixed(1)} ({user.rating_count} avaliações)
                </span>
              </div>
            </div>
          )}

          <div className="menu-section">
            {menuItems.map((item, index) => (
              <Link 
                key={index}
                to={item.to}
                className="menu-item"
              >
                <div className="menu-icon">{item.icon}</div>
                <span className="menu-label">{item.label}</span>
                {item.badge && (
                  <span className="menu-badge">{item.badge}</span>
                )}
                <ChevronRight size={18} className="menu-arrow" />
              </Link>
            ))}
          </div>

          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Sair da conta</span>
          </button>
        </div>
      </main>
    </div>
  );
}
