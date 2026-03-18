import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components';
import ProtectedRoute from './components/ProtectedRoute';
import { 
  Home, 
  Search, 
  RideDetails, 
  Login, 
  Register, 
  PublishRide, 
  MyRides, 
  Profile 
} from './pages';
import { useAuthStore } from './store';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const { checkAuth, isAuthenticated } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  const hideHeader = ['/entrar', '/cadastro'].includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscar" element={<Search />} />
        <Route path="/carona/:id" element={<RideDetails />} />
        <Route path="/entrar" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route 
          path="/publicar" 
          element={
            <ProtectedRoute>
              <PublishRide />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/minhas-caronas" 
          element={
            <ProtectedRoute>
              <MyRides />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/perfil" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
