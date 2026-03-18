import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Users, Calendar, Plus, Loader2, ArrowLeft } from 'lucide-react';
import RideCard from '../components/RideCard';
import { useRideStore } from '../store';
import './MyRides.css';

export default function MyRides() {
  const { userRides, getUserRides, isLoading } = useRideStore();
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    getUserRides(activeTab === 'all' ? '' : activeTab);
  }, [activeTab]);

  const tabs = [
    { id: 'all', label: 'Todas', icon: <Car size={18} /> },
    { id: 'driver', label: 'Como motorista', icon: <Car size={18} /> },
    { id: 'passenger', label: 'Como passageiro', icon: <Users size={18} /> },
  ];

  const filteredRides = userRides;

  return (
    <div className="my-rides-page">
      <header className="my-rides-header">
        <div className="container">
          <h1>Minhas caronas</h1>
          <Link to="/publicar" className="add-btn">
            <Plus size={20} />
          </Link>
        </div>
      </header>

      <div className="tabs-container">
        <div className="container">
          <div className="tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="my-rides-content">
        <div className="container">
          {isLoading ? (
            <div className="loading-state">
              <Loader2 size={32} className="spinner" />
              <span>Carregando caronas...</span>
            </div>
          ) : filteredRides.length > 0 ? (
            <div className="rides-list">
              {filteredRides.map(ride => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <Calendar size={48} />
              </div>
              <h3>Nenhuma carona encontrada</h3>
              <p>
                {activeTab === 'driver' 
                  ? 'Você ainda não publicou nenhuma carona como motorista.'
                  : activeTab === 'passenger'
                  ? 'Você ainda não reservou nenhuma carona como passageiro.'
                  : 'Você ainda não tem caronas. Publique ou reserve uma carona para começar!'
                }
              </p>
              <div className="empty-actions">
                <Link to="/publicar" className="btn btn-primary">
                  <Plus size={18} />
                  Publicar carona
                </Link>
                <Link to="/buscar" className="btn btn-secondary">
                  Buscar caronas
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
