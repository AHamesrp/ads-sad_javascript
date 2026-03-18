import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, Leaf, Shield, Users, TrendingUp, ChevronRight, Star, MapPin } from 'lucide-react';
import SearchForm from '../components/SearchForm';
import RideCard from '../components/RideCard';
import { useRideStore, useStatsStore, useAuthStore } from '../store';
import { formatCurrency } from '../utils/helpers';
import './Home.css';

export default function Home() {
  const { popularRides, getPopularRides, isLoading } = useRideStore();
  const { globalStats, getGlobalStats } = useStatsStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    getPopularRides();
    getGlobalStats();
  }, []);

  const features = [
    {
      icon: <Leaf size={28} />,
      title: 'Sustentável',
      description: 'Reduza sua pegada de carbono compartilhando viagens',
      color: '#059669',
      bg: '#ecfdf5',
    },
    {
      icon: <Shield size={28} />,
      title: 'Seguro',
      description: 'Perfis verificados e avaliações de usuários',
      color: '#2563eb',
      bg: '#eff6ff',
    },
    {
      icon: <TrendingUp size={28} />,
      title: 'Econômico',
      description: 'Economize até 75% comparado a outras opções',
      color: '#7c3aed',
      bg: '#f5f3ff',
    },
  ];

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient" />
          <div className="hero-pattern" />
        </div>
        
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Viaje junto,
              <span className="hero-highlight"> economize mais</span>
            </h1>
            <p className="hero-subtitle">
              Encontre caronas para qualquer destino. Divida custos, faça novas amizades e ajude o planeta.
            </p>

            <div className="hero-search">
              <SearchForm variant="hero" />
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number">{globalStats?.users?.toLocaleString() || '0'}</span>
                <span className="stat-label">Usuários</span>
              </div>
              <div className="stat-divider" />
              <div className="hero-stat">
                <span className="stat-number">{globalStats?.dailyRides || '0'}</span>
                <span className="stat-label">Caronas hoje</span>
              </div>
              <div className="stat-divider" />
              <div className="hero-stat">
                <span className="stat-number">{((globalStats?.co2Saved || 0) / 1000).toFixed(0)}</span>
                <span className="stat-label">Tons CO₂ economizados</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="feature-icon"
                  style={{ background: feature.bg, color: feature.color }}
                >
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {popularRides.length > 0 && (
        <section className="rides-section">
          <div className="container">
            <div className="section-header">
              <div>
                <h2 className="section-title">Caronas disponíveis</h2>
                <p className="section-subtitle">Encontre sua próxima viagem</p>
              </div>
              <Link to="/buscar" className="see-all-link">
                Ver todas
                <ChevronRight size={18} />
              </Link>
            </div>

            <div className="rides-grid">
              {popularRides.slice(0, 6).map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="routes-section">
        <div className="container">
          <h2 className="section-title text-center">Rotas populares</h2>
          <p className="section-subtitle text-center">As viagens mais procuradas</p>
          
          <div className="routes-grid">
            {[
              { from: 'São Paulo', to: 'Rio de Janeiro', price: 65, distance: 430 },
              { from: 'Belo Horizonte', to: 'Brasília', price: 85, distance: 740 },
              { from: 'Curitiba', to: 'São Paulo', price: 55, distance: 410 },
              { from: 'Campinas', to: 'São Paulo', price: 25, distance: 100 },
            ].map((route, index) => (
              <Link 
                key={index}
                to={`/buscar?origin=${route.from}&destination=${route.to}`}
                className="route-card"
              >
                <div className="route-info">
                  <div className="route-cities">
                    <span className="route-from">{route.from}</span>
                    <div className="route-arrow">
                      <ChevronRight size={16} />
                    </div>
                    <span className="route-to">{route.to}</span>
                  </div>
                  <span className="route-distance">{route.distance} km</span>
                </div>
                <div className="route-price">
                  <span className="price-label">a partir de</span>
                  <span className="price-value">{formatCurrency(route.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <div className="cta-icon">
                <Car size={32} />
              </div>
              <h2 className="cta-title">Tem um carro? Publique uma carona!</h2>
              <p className="cta-description">
                Ganhe dinheiro extra oferecendo vagas no seu veículo. É simples, rápido e seguro.
              </p>
              <Link 
                to={isAuthenticated ? '/publicar' : '/cadastro'} 
                className="btn btn-primary btn-lg"
              >
                {isAuthenticated ? 'Publicar carona' : 'Começar agora'}
              </Link>
            </div>
            <div className="cta-illustration">
              <div className="illustration-circle" />
              <div className="illustration-car">
                <Car size={80} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title text-center">Como funciona</h2>
          <p className="section-subtitle text-center">Em 3 passos simples</p>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">
                <MapPin size={28} />
              </div>
              <h3 className="step-title">Busque sua rota</h3>
              <p className="step-description">
                Informe origem, destino e data para encontrar caronas disponíveis
              </p>
            </div>

            <div className="step-connector">
              <ChevronRight size={24} />
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">
                <Users size={28} />
              </div>
              <h3 className="step-title">Escolha o motorista</h3>
              <p className="step-description">
                Veja perfis, avaliações e preferências para escolher a melhor opção
              </p>
            </div>

            <div className="step-connector">
              <ChevronRight size={24} />
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">
                <Car size={28} />
              </div>
              <h3 className="step-title">Viaje e economize</h3>
              <p className="step-description">
                Reserve sua vaga, encontre o motorista e aproveite a viagem
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <Car size={24} />
                <span>EcoRide</span>
              </div>
              <p className="footer-tagline">
                Conectando pessoas, economizando recursos, preservando o meio ambiente.
              </p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Navegação</h4>
                <Link to="/buscar">Buscar caronas</Link>
                <Link to="/publicar">Publicar carona</Link>
                <Link to="/como-funciona">Como funciona</Link>
              </div>
              <div className="footer-column">
                <h4>Conta</h4>
                <Link to="/entrar">Entrar</Link>
                <Link to="/cadastro">Criar conta</Link>
                <Link to="/perfil">Meu perfil</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} EcoRide. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
