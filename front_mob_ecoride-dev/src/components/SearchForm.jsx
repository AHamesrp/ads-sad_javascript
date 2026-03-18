import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Search, ArrowRight } from 'lucide-react';
import './SearchForm.css';

export default function SearchForm({ variant = 'default', initialValues = {} }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    origin: initialValues.origin || '',
    destination: initialValues.destination || '',
    date: initialValues.date || '',
    passengers: initialValues.passengers || 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (formData.origin) params.set('origin', formData.origin);
    if (formData.destination) params.set('destination', formData.destination);
    if (formData.date) params.set('date', formData.date);
    if (formData.passengers) params.set('passengers', formData.passengers);
    navigate(`/buscar?${params.toString()}`);
  };

  const today = new Date().toISOString().split('T')[0];

  if (variant === 'hero') {
    return (
      <form className="search-form-hero" onSubmit={handleSubmit}>
        <div className="search-hero-fields">
          <div className="search-field-hero">
            <div className="field-icon">
              <MapPin size={20} />
            </div>
            <div className="field-content">
              <label>Saindo de</label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                placeholder="Cidade de origem"
                required
              />
            </div>
          </div>

          <div className="search-divider-hero">
            <ArrowRight size={18} />
          </div>

          <div className="search-field-hero">
            <div className="field-icon destination">
              <MapPin size={20} />
            </div>
            <div className="field-content">
              <label>Indo para</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Cidade de destino"
                required
              />
            </div>
          </div>

          <div className="search-field-hero">
            <div className="field-icon">
              <Calendar size={20} />
            </div>
            <div className="field-content">
              <label>Quando</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
              />
            </div>
          </div>

          <div className="search-field-hero passengers">
            <div className="field-icon">
              <Users size={20} />
            </div>
            <div className="field-content">
              <label>Passageiros</label>
              <select
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
              >
                <option value={1}>1 passageiro</option>
                <option value={2}>2 passageiros</option>
                <option value={3}>3 passageiros</option>
                <option value={4}>4 passageiros</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="search-btn-hero">
          <Search size={20} />
          <span>Buscar</span>
        </button>
      </form>
    );
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-fields">
        <div className="search-field">
          <MapPin size={18} className="field-icon-inline origin" />
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            placeholder="De onde?"
            required
          />
        </div>

        <div className="search-field">
          <MapPin size={18} className="field-icon-inline destination" />
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Para onde?"
            required
          />
        </div>

        <div className="search-field">
          <Calendar size={18} className="field-icon-inline" />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={today}
          />
        </div>

        <div className="search-field">
          <Users size={18} className="field-icon-inline" />
          <select
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
      </div>

      <button type="submit" className="search-btn">
        <Search size={18} />
        <span>Buscar</span>
      </button>
    </form>
  );
}
