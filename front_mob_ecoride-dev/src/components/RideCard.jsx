import { Link } from 'react-router-dom';
import { Clock, Users, Star, Leaf, ChevronRight } from 'lucide-react';
import { formatDate, formatTime, formatCurrency, getInitials } from '../utils/helpers';
import './RideCard.css';

export default function RideCard({ ride, compact = false }) {
  const {
    id,
    origin_city,
    origin_state,
    destination_city,
    destination_state,
    departure_date,
    departure_time,
    available_seats,
    price_per_seat,
    driver,
    distance,
  } = ride;

  const co2Saved = distance ? (distance * 0.12).toFixed(1) : null;

  if (compact) {
    return (
      <Link to={`/carona/${id}`} className="ride-card-compact">
        <div className="ride-card-compact-route">
          <div className="route-point">
            <div className="route-dot origin" />
            <span className="route-city">{origin_city}</span>
          </div>
          <div className="route-line-compact" />
          <div className="route-point">
            <div className="route-dot destination" />
            <span className="route-city">{destination_city}</span>
          </div>
        </div>
        <div className="ride-card-compact-info">
          <span className="compact-date">{formatDate(departure_date)}</span>
          <span className="compact-price">{formatCurrency(price_per_seat)}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/carona/${id}`} className="ride-card">
      <div className="ride-card-header">
        <div className="ride-datetime">
          <span className="ride-date">{formatDate(departure_date)}</span>
          <span className="ride-time">{formatTime(departure_time)}</span>
        </div>
        {co2Saved && (
          <div className="eco-badge">
            <Leaf size={14} />
            <span>{co2Saved} kg CO₂</span>
          </div>
        )}
      </div>

      <div className="ride-route">
        <div className="route-timeline">
          <div className="timeline-dot origin" />
          <div className="timeline-line" />
          <div className="timeline-dot destination" />
        </div>
        <div className="route-details">
          <div className="route-location">
            <span className="location-city">{origin_city}</span>
            <span className="location-state">{origin_state}</span>
          </div>
          <div className="route-location">
            <span className="location-city">{destination_city}</span>
            <span className="location-state">{destination_state}</span>
          </div>
        </div>
      </div>

      <div className="ride-card-footer">
        <div className="driver-info">
          <div className="driver-avatar">
            {driver?.avatar ? (
              <img src={driver.avatar} alt={driver.name} />
            ) : (
              <span>{getInitials(driver?.name)}</span>
            )}
          </div>
          <div className="driver-details">
            <span className="driver-name">{driver?.name?.split(' ')[0]}</span>
            {driver?.rating_average > 0 && (
              <div className="driver-rating">
                <Star size={12} fill="#f59e0b" color="#f59e0b" />
                <span>{driver.rating_average.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="ride-meta">
          <div className="seats-info">
            <Users size={16} />
            <span>{available_seats} {available_seats === 1 ? 'lugar' : 'lugares'}</span>
          </div>
          <div className="ride-price">
            <span className="price-value">{formatCurrency(price_per_seat)}</span>
          </div>
        </div>
      </div>

      <div className="ride-card-arrow">
        <ChevronRight size={20} />
      </div>
    </Link>
  );
}
