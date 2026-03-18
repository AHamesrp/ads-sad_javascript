import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/entrar" state={{ from: location.pathname }} replace />;
  }

  return children;
}
