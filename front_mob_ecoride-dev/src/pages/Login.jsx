import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Car, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const from = location.state?.from || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.email || !formData.password) {
      setFormError('Preencha todos os campos');
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setFormError(result.message || 'Email ou senha incorretos');
    }
  };

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
            <h1>Entrar na sua conta</h1>
            <p>Bem-vindo de volta! Entre para continuar.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {formError && (
              <div className="auth-error">
                {formError}
              </div>
            )}

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
                  className="input with-icon"
                  autoComplete="email"
                />
              </div>
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
                  placeholder="Sua senha"
                  className="input with-icon with-action"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-action"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-lg btn-block"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="spinner" />
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Não tem uma conta?{' '}
              <Link to="/cadastro" state={{ from }}>Criar conta</Link>
            </p>
          </div>
        </div>

        <div className="auth-demo-info">
          <p>Usuários de teste:</p>
          <code>maria@example.com</code>
          <code>joao@example.com</code>
          <span>(senha: 123456)</span>
        </div>
      </div>
    </div>
  );
}
