import React from 'react'

import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import { LoadingPage } from './components/Loading'
import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import Search from './pages/Search'
import RideDetails from './pages/RideDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import PublishRide from './pages/PublishRide'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}

function AuthLayout({ children }) {
  return <main className="min-h-screen">{children}</main>
}

function HowItWorks() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="container-app py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl font-bold text-slate-800 mb-6">Como funciona</h1>
          <p className="text-lg text-slate-600 mb-12">O EcoRide conecta motoristas e passageiros que fazem o mesmo trajeto, permitindo dividir os custos da viagem de forma simples e segura.</p>
          <div className="grid gap-8 text-left">
            <div className="bg-white rounded-2xl p-6 shadow-soft"><div className="flex items-start gap-4"><div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 font-bold flex items-center justify-center flex-shrink-0">1</div><div><h3 className="font-semibold text-lg text-slate-800 mb-2">Busque ou ofereça uma carona</h3><p className="text-slate-600">Digite sua origem, destino e data. Encontre caronas disponíveis ou publique a sua própria.</p></div></div></div>
            <div className="bg-white rounded-2xl p-6 shadow-soft"><div className="flex items-start gap-4"><div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 font-bold flex items-center justify-center flex-shrink-0">2</div><div><h3 className="font-semibold text-lg text-slate-800 mb-2">Reserve seu lugar</h3><p className="text-slate-600">Escolha a carona ideal, verifique o perfil do motorista e reserve seu assento em segundos.</p></div></div></div>
            <div className="bg-white rounded-2xl p-6 shadow-soft"><div className="flex items-start gap-4"><div className="w-10 h-10 rounded-full bg-secondary-100 text-secondary-600 font-bold flex items-center justify-center flex-shrink-0">3</div><div><h3 className="font-semibold text-lg text-slate-800 mb-2">Viaje e economize</h3><p className="text-slate-600">Encontre seu motorista no ponto combinado e aproveite a viagem. Pague de forma segura e avalie após a viagem.</p></div></div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function About() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="container-app py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-slate-800 mb-6 text-center">Sobre o EcoRide</h1>
          <div className="bg-white rounded-2xl p-8 shadow-soft mb-8">
            <p className="text-lg text-slate-600 mb-6">O EcoRide nasceu da vontade de transformar a forma como as pessoas viajam pelo Brasil. Acreditamos que compartilhar caronas não é apenas uma forma de economizar dinheiro, mas também de construir conexões, reduzir o trânsito e cuidar do nosso planeta.</p>
            <h2 className="font-display text-2xl font-bold text-slate-800 mb-4">Nossa Missão</h2>
            <p className="text-slate-600 mb-6">Conectar pessoas que fazem o mesmo trajeto, promovendo uma mobilidade mais sustentável, econômica e social.</p>
            <h2 className="font-display text-2xl font-bold text-slate-800 mb-4">Nossos Valores</h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-3"><span className="text-secondary-500">🌱</span><span><strong>Sustentabilidade:</strong> Cada carona compartilhada significa menos carros na estrada.</span></li>
              <li className="flex items-start gap-3"><span className="text-primary-500">🤝</span><span><strong>Comunidade:</strong> Acreditamos no poder das conexões humanas.</span></li>
              <li className="flex items-start gap-3"><span className="text-amber-500">🔒</span><span><strong>Segurança:</strong> Perfis verificados e avaliações reais.</span></li>
            </ul>
          </div>
          <div className="text-center text-slate-500"><p>Desenvolvido com 💚 para um Brasil mais sustentável</p><p className="text-sm mt-2">Projeto Acadêmico - Técnico em Desenvolvimento de Sistemas</p></div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const { loading } = useAuth()

  if (loading) {
    return <LoadingPage />
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/search" element={<MainLayout><Search /></MainLayout>} />
        <Route path="/ride/:id" element={<MainLayout><RideDetails /></MainLayout>} />
        <Route path="/publish" element={<MainLayout><PublishRide /></MainLayout>} />
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/how-it-works" element={<MainLayout><HowItWorks /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="*" element={
          <MainLayout>
            <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
              <div className="text-center">
                <h1 className="font-display text-6xl font-bold text-primary-500 mb-4">404</h1>
                <p className="text-xl text-slate-600 mb-6">Página não encontrada</p>
                <a href="/" className="btn-primary inline-block">Voltar para o início</a>
              </div>
            </div>
          </MainLayout>
        } />
      </Routes>
    </>
  )
}

export default App
