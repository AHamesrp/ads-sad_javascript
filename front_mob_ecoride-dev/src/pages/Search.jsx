import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, X, Loader2 } from 'lucide-react';
import SearchForm from '../components/SearchForm';
import RideCard from '../components/RideCard';
import { useRideStore } from '../store';
import './Search.css';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const { searchResults, searchRides, isLoading, clearSearch } = useRideStore();
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const date = searchParams.get('date') || '';
  const passengers = searchParams.get('passengers') || '1';

  useEffect(() => {
    if (origin || destination) {
      handleSearch();
    }
    return () => clearSearch();
  }, [origin, destination, date, passengers]);

  const handleSearch = async () => {
    setHasSearched(true);
    await searchRides({ origin, destination, date, passengers });
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <div className="container">
          <h1 className="search-page-title">Buscar caronas</h1>
          <SearchForm 
            initialValues={{ origin, destination, date, passengers: parseInt(passengers) }}
          />
        </div>
      </div>

      <div className="search-content">
        <div className="container">
          {hasSearched && (
            <div className="search-info">
              <div className="results-count">
                {isLoading ? (
                  <span className="loading-text">
                    <Loader2 size={18} className="spinner" />
                    Buscando caronas...
                  </span>
                ) : (
                  <span>
                    {searchResults.length === 0 
                      ? 'Nenhuma carona encontrada' 
                      : `${searchResults.length} ${searchResults.length === 1 ? 'carona encontrada' : 'caronas encontradas'}`
                    }
                  </span>
                )}
              </div>

              <button 
                className="filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={18} />
                Filtros
              </button>
            </div>
          )}

          {showFilters && (
            <div className="filters-panel">
              <div className="filters-header">
                <h3>Filtros</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="filters-content">
                <div className="filter-group">
                  <label>Horário de saída</label>
                  <div className="filter-options">
                    <button className="filter-chip active">Qualquer horário</button>
                    <button className="filter-chip">Manhã (6h-12h)</button>
                    <button className="filter-chip">Tarde (12h-18h)</button>
                    <button className="filter-chip">Noite (18h-00h)</button>
                  </div>
                </div>
                <div className="filter-group">
                  <label>Preferências</label>
                  <div className="filter-options">
                    <button className="filter-chip">Sem fumo</button>
                    <button className="filter-chip">Aceita pets</button>
                    <button className="filter-chip">Com música</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="search-loading">
              <div className="loading-skeleton">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="skeleton-card">
                    <div className="skeleton-header">
                      <div className="skeleton-line" style={{ width: '40%' }} />
                      <div className="skeleton-line" style={{ width: '20%' }} />
                    </div>
                    <div className="skeleton-route">
                      <div className="skeleton-line" style={{ width: '60%' }} />
                      <div className="skeleton-line" style={{ width: '55%' }} />
                    </div>
                    <div className="skeleton-footer">
                      <div className="skeleton-avatar" />
                      <div className="skeleton-line" style={{ width: '30%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="search-results">
              {searchResults.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          ) : hasSearched ? (
            <div className="empty-results">
              <div className="empty-icon">
                <Search size={48} />
              </div>
              <h3>Nenhuma carona encontrada</h3>
              <p>Tente ajustar os filtros ou buscar em outras datas</p>
            </div>
          ) : (
            <div className="search-prompt">
              <div className="prompt-icon">
                <Search size={48} />
              </div>
              <h3>Encontre sua carona</h3>
              <p>Informe origem e destino para buscar caronas disponíveis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
