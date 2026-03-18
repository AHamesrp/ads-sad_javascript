import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Calendar, Clock, Users, DollarSign, 
  Car, MessageSquare, Loader2, Check, ChevronRight
} from 'lucide-react';
import { useRideStore } from '../store';
import { brazilianStates } from '../utils/helpers';
import './PublishRide.css';

export default function PublishRide() {
  const navigate = useNavigate();
  const { createRide, isLoading } = useRideStore();
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    origin: { city: '', state: 'SP' },
    destination: { city: '', state: 'RJ' },
    departureDate: '',
    departureTime: '',
    availableSeats: 3,
    pricePerSeat: '',
    description: '',
    vehicle: { model: '', color: '' },
    distance: '',
  });

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    setError('');
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.origin.city || !formData.destination.city) {
          setError('Preencha as cidades de origem e destino');
          return false;
        }
        break;
      case 2:
        if (!formData.departureDate || !formData.departureTime) {
          setError('Informe data e horário de partida');
          return false;
        }
        break;
      case 3:
        if (!formData.pricePerSeat || formData.pricePerSeat < 1) {
          setError('Informe um preço válido');
          return false;
        }
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    const result = await createRide({
      origin: formData.origin,
      destination: formData.destination,
      departureDate: formData.departureDate,
      departureTime: formData.departureTime,
      availableSeats: parseInt(formData.availableSeats),
      pricePerSeat: parseFloat(formData.pricePerSeat),
      description: formData.description,
      vehicle: formData.vehicle,
      distance: formData.distance ? parseInt(formData.distance) : null,
    });

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.message || 'Erro ao publicar carona');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (success) {
    return (
      <div className="publish-page">
        <div className="publish-success">
          <div className="success-icon">
            <Check size={48} />
          </div>
          <h2>Carona publicada!</h2>
          <p>Sua carona foi publicada com sucesso e já está disponível para reservas.</p>
          <div className="success-actions">
            <button onClick={() => navigate('/minhas-caronas')} className="btn btn-primary">
              Ver minhas caronas
            </button>
            <button onClick={() => { setSuccess(false); setStep(1); setFormData({
              origin: { city: '', state: 'SP' },
              destination: { city: '', state: 'RJ' },
              departureDate: '',
              departureTime: '',
              availableSeats: 3,
              pricePerSeat: '',
              description: '',
              vehicle: { model: '', color: '' },
              distance: '',
            }); }} className="btn btn-secondary">
              Publicar outra
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="publish-page">
      <header className="publish-header">
        <div className="container">
          <button onClick={() => step > 1 ? prevStep() : navigate(-1)} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <h1>Publicar carona</h1>
          <div className="step-indicator">
            {step}/4
          </div>
        </div>
      </header>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }} />
      </div>

      <main className="publish-content">
        <div className="container">
          {error && (
            <div className="publish-error">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="publish-step">
              <div className="step-header">
                <MapPin size={24} className="step-icon" />
                <div>
                  <h2>Trajeto</h2>
                  <p>De onde você vai sair e para onde vai?</p>
                </div>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label>Cidade de origem</label>
                  <input
                    type="text"
                    value={formData.origin.city}
                    onChange={(e) => handleChange('origin.city', e.target.value)}
                    placeholder="Ex: São Paulo"
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label>Estado</label>
                  <select
                    value={formData.origin.state}
                    onChange={(e) => handleChange('origin.state', e.target.value)}
                    className="input"
                  >
                    {brazilianStates.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="route-divider">
                <ChevronRight size={20} />
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label>Cidade de destino</label>
                  <input
                    type="text"
                    value={formData.destination.city}
                    onChange={(e) => handleChange('destination.city', e.target.value)}
                    placeholder="Ex: Rio de Janeiro"
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label>Estado</label>
                  <select
                    value={formData.destination.state}
                    onChange={(e) => handleChange('destination.state', e.target.value)}
                    className="input"
                  >
                    {brazilianStates.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label>Distância aproximada (km)</label>
                  <input
                    type="number"
                    value={formData.distance}
                    onChange={(e) => handleChange('distance', e.target.value)}
                    placeholder="Ex: 430"
                    className="input"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="publish-step">
              <div className="step-header">
                <Calendar size={24} className="step-icon" />
                <div>
                  <h2>Data e horário</h2>
                  <p>Quando você vai partir?</p>
                </div>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label>Data de partida</label>
                  <input
                    type="date"
                    value={formData.departureDate}
                    onChange={(e) => handleChange('departureDate', e.target.value)}
                    min={today}
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label>Horário de partida</label>
                  <input
                    type="time"
                    value={formData.departureTime}
                    onChange={(e) => handleChange('departureTime', e.target.value)}
                    className="input"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="publish-step">
              <div className="step-header">
                <DollarSign size={24} className="step-icon" />
                <div>
                  <h2>Vagas e preço</h2>
                  <p>Quantas vagas e qual o preço?</p>
                </div>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label>Vagas disponíveis</label>
                  <div className="seats-selector">
                    {[1, 2, 3, 4].map(num => (
                      <button
                        key={num}
                        type="button"
                        className={`seat-option ${formData.availableSeats === num ? 'active' : ''}`}
                        onClick={() => handleChange('availableSeats', num)}
                      >
                        <Users size={16} />
                        <span>{num}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Preço por passageiro (R$)</label>
                  <input
                    type="number"
                    value={formData.pricePerSeat}
                    onChange={(e) => handleChange('pricePerSeat', e.target.value)}
                    placeholder="Ex: 65"
                    min="1"
                    step="0.01"
                    className="input"
                  />
                  <span className="input-hint">Sugestão: R$ 0,15 a R$ 0,20 por km</span>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="publish-step">
              <div className="step-header">
                <Car size={24} className="step-icon" />
                <div>
                  <h2>Detalhes extras</h2>
                  <p>Informações adicionais (opcional)</p>
                </div>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label>Modelo do veículo</label>
                  <input
                    type="text"
                    value={formData.vehicle.model}
                    onChange={(e) => handleChange('vehicle.model', e.target.value)}
                    placeholder="Ex: Honda Civic"
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label>Cor do veículo</label>
                  <input
                    type="text"
                    value={formData.vehicle.color}
                    onChange={(e) => handleChange('vehicle.color', e.target.value)}
                    placeholder="Ex: Branco"
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label>Descrição da viagem</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Ex: Viagem tranquila, ar condicionado, paradas para descanso..."
                    className="input textarea"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="publish-actions">
            {step < 4 ? (
              <button onClick={nextStep} className="btn btn-primary btn-lg btn-block">
                Continuar
                <ChevronRight size={18} />
              </button>
            ) : (
              <button 
                onClick={handleSubmit} 
                className="btn btn-primary btn-lg btn-block"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="spinner" />
                    Publicando...
                  </>
                ) : (
                  <>
                    Publicar carona
                    <Check size={18} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
