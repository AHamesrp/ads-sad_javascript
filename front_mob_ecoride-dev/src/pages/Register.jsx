import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Car, Loader2, Check } from 'lucide-react';
import { useAuthStore } from '../store';
import './Auth.css';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, isLoading } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const from = location.state?.from || '/';

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 2) return `(${cleaned}`;
    if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'phone') {
      newValue = formatPhone(value);
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório';
    } else if (formData.name.length < 2) {
      errors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.phone)) {
      errors.phone = 'Formato inválido. Use: (11) 99999-9999';
    }

    if (!formData.password) {
      errors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      errors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const result = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setFormErrors({ general: result.message || 'Erro ao criar conta' });
    }
  };

  const passwordChecks = [
    { label: 'Pelo menos 6 caracteres', valid: formData.password.length >= 6 },
  ];

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <div className="logo-icon">
              <Car size={24} />
            </div>
            <span>EcoRide</span>
          </Link>
        </div>

        <div className="auth-card">
          <div className="auth-card-header">
            <h1>Criar sua conta</h1>
            <p>Comece a compartilhar viagens hoje mesmo.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {formErrors.general && (
              <div className="auth-error">
                {formErrors.general}
              </div>
            )}

            <div className="input-group">
              <label htmlFor="name">Nome completo</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  className={`input with-icon ${formErrors.name ? 'input-error' : ''}`}
                  autoComplete="name"
                />
              </div>
              {formErrors.name && <span className="error-message">{formErrors.name}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className={`input with-icon ${formErrors.email ? 'input-error' : ''}`}
                  autoComplete="email"
                />
              </div>
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="phone">Telefone</label>
              <div className="input-wrapper">
                <Phone size={18} className="input-icon" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                  className={`input with-icon ${formErrors.phone ? 'input-error' : ''}`}
                  autoComplete="tel"
                />
              </div>
              {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Crie uma senha"
                  className={`input with-icon with-action ${formErrors.password ? 'input-error' : ''}`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="input-action"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formErrors.password && <span className="error-message">{formErrors.password}</span>}
              
              {formData.password && (
                <div className="password-checks">
                  {passwordChecks.map((check, index) => (
                    <div key={index} className={`check-item ${check.valid ? 'valid' : ''}`}>
                      <Check size={14} />
                      <span>{check.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirme sua senha"
                  className={`input with-icon ${formErrors.confirmPassword ? 'input-error' : ''}`}
                  autoComplete="new-password"
                />
              </div>
              {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-lg btn-block"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="spinner" />
                  Criando conta...
                </>
              ) : (
                <>
                  Criar conta
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Já tem uma conta?{' '}
              <Link to="/entrar" state={{ from }}>Entrar</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
