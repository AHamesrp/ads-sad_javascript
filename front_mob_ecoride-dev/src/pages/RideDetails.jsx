import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Clock, Users, Star, Leaf, Car, MapPin, 
  Calendar, MessageCircle, Shield, Check, AlertCircle,
  Cigarette, Music, Dog, Loader2
} from 'lucide-react';
import { useRideStore, useAuthStore } from '../store';
import { formatDate, formatTime, formatCurrency, getInitials, formatDistance } from '../utils/helpers';
import './RideDetails.css';

export default function RideDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentRide, getRideById, bookRide, isLoading } = useRideStore();
  const { isAuthenticated, user } = useAuthStore();
  const [bookingSeats, setBookingSeats] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      getRideById(id);
    }
  }, [id]);

  const handleBook = async () => {
    if (!isAuthenticated) {
      navigate('/entrar', { state: { from: `/carona/${id}` } });
      return;
    }

    setIsBooking(true);
    setBookingError('');

    const result = await bookRide(id, bookingSeats);
    
    if (result.success) {
      setBookingSuccess(true);
    } else {
      setBookingError(result.message || 'Erro ao reservar carona');
    }

    setIsBooking(false);
  };

  if (isLoading || !currentRide) {
    return (
      <div className="ride-details-page">
        <div className="ride-details-loading">
          <Loader2 size={32} className="spinner" />
          <span>Carregando detalhes...</span>
        </div>
      </div>
    );
  }

  const {
    origin_city,
    origin_state,
    destination_city,
    destination_state,
    departure_date,
    departure_time,
    available_seats,
    price_per_seat,
    driver,
    description,
    distance,
    vehicle_model,
    vehicle_color,
    preferences,
  } = currentRide;

  const co2Saved = distance ? (distance * 0.12).toFixed(1) : null;
  const isOwnRide = user?.id === driver?.id;
  const hasBooked = currentRide.passengers?.some(p => p.user?.id === user?.id);

  return (
    <div className="ride-details-page">
      <header className="ride-details-header">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <h1>Detalhes da carona</h1>
        </div>
      </header>

      <main className="ride-details-content">
        <div className="container">
          {bookingSuccess ? (
            <div className="booking-success">
              <div className="success-icon">
                <Check size={48} />
              </div>
              <h2>Reserva confirmada!</h2>
              <p>Sua carona foi reservada com sucesso. O motorista será notificado.</p>
              <div className="success-actions">
                <Link to="/minhas-caronas" className="btn btn-primary">
                  Ver minhas caronas
                </Link>
                <Link to="/buscar" className="btn btn-secondary">
                  Buscar outras caronas
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="ride-info-card">
                <div className="ride-date-badge">
                  <Calendar size={16} />
                  <span>{formatDate(departure_date)}</span>
                  <span className="time-badge">{formatTime(departure_time)}</span>
                </div>

                <div className="ride-route-detail">
                  <div className="route-timeline">
                    <div className="timeline-start">
                      <div className="timeline-dot origin" />
                      <div className="timeline-time">{formatTime(departure_time)}</div>
                    </div>
                    <div className="timeline-connector">
                      <div className="connector-line" />
                      {distance && (
                        <div className="connector-info">
                          <span>{formatDistance(distance)}</span>
                        </div>
                      )}
                    </div>
                    <div className="timeline-end">
                      <div className="timeline-dot destination" />
                      <div className="timeline-time">~</div>
                    </div>
                  </div>

                  <div className="route-locations">
                    <div className="location-item">
                      <h3>{origin_city}</h3>
                      <span>{origin_state}</span>
                    </div>
                    <div className="location-item">
                      <h3>{destination_city}</h3>
                      <span>{destination_state}</span>
                    </div>
                  </div>
                </div>

                {co2Saved && (
                  <div className="eco-info">
                    <Leaf size={18} />
                    <span>Economia de até <strong>{co2Saved} kg</strong> de CO₂ por passageiro</span>
                  </div>
                )}
              </div>

              <div className="driver-card">
                <Link to={`/usuario/${driver?.id}`} className="driver-profile">
                  <div className="driver-avatar-lg">
                    {driver?.avatar ? (
                      <img src={driver.avatar} alt={driver.name} />
                    ) : (
                      <span>{getInitials(driver?.name)}</span>
                    )}
                  </div>
                  <div className="driver-info">
                    <h3>{driver?.name}</h3>
                    <div className="driver-stats">
                      {driver?.rating_average > 0 && (
                        <div className="stat-item">
                          <Star size={14} fill="#f59e0b" color="#f59e0b" />
                          <span>{driver.rating_average.toFixed(1)}</span>
                          <span className="stat-count">({driver.rating_count})</span>
                        </div>
                      )}
                      {driver?.total_trips > 0 && (
                        <div className="stat-item">
                          <Car size={14} />
                          <span>{driver.total_trips} viagens</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>

                {driver?.is_verified && (
                  <div className="verified-badge">
                    <Shield size={16} />
                    <span>Verificado</span>
                  </div>
                )}
              </div>

              {(vehicle_model || description) && (
                <div className="details-card">
                  {vehicle_model && (
                    <div className="detail-item">
                      <Car size={20} />
                      <div className="detail-content">
                        <span className="detail-label">Veículo</span>
                        <span className="detail-value">
                          {vehicle_model} {vehicle_color && `• ${vehicle_color}`}
                        </span>
                      </div>
                    </div>
                  )}

                  {description && (
                    <div className="detail-item description">
                      <MessageCircle size={20} />
                      <div className="detail-content">
                        <span className="detail-label">Sobre a viagem</span>
                        <p className="detail-value">{description}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="preferences-card">
                <h4>Preferências</h4>
                <div className="preferences-list">
                  <div className={`pref-item ${preferences?.smoking_allowed ? 'allowed' : 'not-allowed'}`}>
                    <Cigarette size={18} />
                    <span>{preferences?.smoking_allowed ? 'Permite fumar' : 'Não permite fumar'}</span>
                  </div>
                  <div className={`pref-item ${preferences?.pets_allowed ? 'allowed' : 'not-allowed'}`}>
                    <Dog size={18} />
                    <span>{preferences?.pets_allowed ? 'Aceita pets' : 'Não aceita pets'}</span>
                  </div>
                  <div className={`pref-item ${preferences?.music_allowed !== false ? 'allowed' : 'not-allowed'}`}>
                    <Music size={18} />
                    <span>{preferences?.music_allowed !== false ? 'Com música' : 'Sem música'}</span>
                  </div>
                </div>
              </div>

              <div className="booking-card">
                <div className="booking-info">
                  <div className="price-display">
                    <span className="price-label">Preço por passageiro</span>
                    <span className="price-amount">{formatCurrency(price_per_seat)}</span>
                  </div>
                  <div className="seats-display">
                    <Users size={18} />
                    <span>{available_seats} {available_seats === 1 ? 'lugar disponível' : 'lugares disponíveis'}</span>
                  </div>
                </div>

                {bookingError && (
                  <div className="booking-error">
                    <AlertCircle size={18} />
                    <span>{bookingError}</span>
                  </div>
                )}

                {!isOwnRide && !hasBooked && available_seats > 0 && (
                  <>
                    <div className="seats-selector">
                      <label>Quantos lugares deseja reservar?</label>
                      <div className="seats-buttons">
                        {[1, 2, 3, 4].filter(n => n <= available_seats).map((num) => (
                          <button
                            key={num}
                            className={`seat-btn ${bookingSeats === num ? 'active' : ''}`}
                            onClick={() => setBookingSeats(num)}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="total-price">
                      <span>Total:</span>
                      <span className="total-amount">{formatCurrency(price_per_seat * bookingSeats)}</span>
                    </div>

                    <button 
                      className="btn btn-primary btn-lg btn-block"
                      onClick={handleBook}
                      disabled={isBooking}
                    >
                      {isBooking ? (
                        <>
                          <Loader2 size={20} className="spinner" />
                          Reservando...
                        </>
                      ) : (
                        'Reservar carona'
                      )}
                    </button>
                  </>
                )}

                {hasBooked && (
                  <div className="already-booked">
                    <Check size={20} />
                    <span>Você já tem uma reserva para esta carona</span>
                  </div>
                )}

                {isOwnRide && (
                  <div className="own-ride-notice">
                    <span>Esta é sua própria carona</span>
                  </div>
                )}

                {available_seats === 0 && !hasBooked && (
                  <div className="full-ride-notice">
                    <span>Esta carona está lotada</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
