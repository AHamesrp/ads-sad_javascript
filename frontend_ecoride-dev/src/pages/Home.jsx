import React from "react";

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ridesService, statsService } from '../services/api'
import SearchForm from '../components/SearchForm'
import RideCard from '../components/RideCard'
import { LoadingRideCard } from '../components/Loading'
import { useFormatNumber } from '../hooks/useFormat'
import { 
  Shield, 
  Leaf, 
  Wallet, 
  Users,
  ChevronRight,
  Star,
  MapPin,
  Car,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

export default function Home() {
  const [popularRides, setPopularRides] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const { formatCompact } = useFormatNumber()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ridesResponse, statsResponse] = await Promise.all([
          ridesService.getPopular(),
          statsService.getGlobal()
        ])
        
        if (ridesResponse.success) {
          setPopularRides(ridesResponse.data.rides)
        }
        if (statsResponse.success) {
          setStats(statsResponse.data.stats)
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] hero-bg overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/5 to-transparent"></div>
        </div>

        <div className="container-app relative pt-32 md:pt-40 pb-20">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Viaje junto.{' '}
              <span className="text-secondary-400">Economize.</span>
              <br />
              <span className="text-primary-200">Preserve o planeta.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 animate-slide-up">
              Encontre caronas para qualquer lugar do Brasil. Divida custos, faça amigos e reduza sua pegada de carbono.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <SearchForm variant="hero" />
          </div>

          {/* Quick Stats */}
          {stats && (
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">{formatCompact(stats.users || 0)}+</p>
                <p className="text-white/60 text-sm">Usuários ativos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">{formatCompact(stats.dailyRides || 0)}</p>
                <p className="text-white/60 text-sm">Caronas disponíveis</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-secondary-400">{formatCompact(stats.co2Saved || 0)}kg</p>
                <p className="text-white/60 text-sm">CO₂ economizado</p>
              </div>
            </div>
          )}
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container-app">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-600 text-sm font-medium mb-4">
              Simples e rápido
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Como funciona o EcoRide
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Em poucos passos você encontra a carona perfeita ou oferece uma vaga no seu carro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative bg-white rounded-2xl p-6 shadow-soft card-hover text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-5">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <span className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-bold text-sm flex items-center justify-center">
                1
              </span>
              <h3 className="font-display text-xl font-semibold text-slate-800 mb-3">
                Escolha seu trajeto
              </h3>
              <p className="text-slate-600">
                Digite de onde você sai e para onde vai. Escolha a data e o número de passageiros.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white rounded-2xl p-6 shadow-soft card-hover text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-5">
                <Users className="w-7 h-7 text-white" />
              </div>
              <span className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-bold text-sm flex items-center justify-center">
                2
              </span>
              <h3 className="font-display text-xl font-semibold text-slate-800 mb-3">
                Encontre sua carona
              </h3>
              <p className="text-slate-600">
                Compare preços, horários e avaliações dos motoristas. Escolha a melhor opção.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white rounded-2xl p-6 shadow-soft card-hover text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center mx-auto mb-5">
                <Car className="w-7 h-7 text-white" />
              </div>
              <span className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary-100 text-secondary-600 font-bold text-sm flex items-center justify-center">
                3
              </span>
              <h3 className="font-display text-xl font-semibold text-slate-800 mb-3">
                Viaje tranquilo
              </h3>
              <p className="text-slate-600">
                Reserve seu lugar, combine os detalhes e aproveite a viagem dividindo custos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Rides */}
      <section className="py-16 md:py-24">
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-100 text-secondary-600 text-sm font-medium mb-4">
                Populares agora
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                Próximas caronas disponíveis
              </h2>
              <p className="text-slate-600">
                Confira as caronas mais procuradas do momento
              </p>
            </div>
            <Link 
              to="/search" 
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Ver todas
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {loading ? (
              <>
                <LoadingRideCard />
                <LoadingRideCard />
                <LoadingRideCard />
                <LoadingRideCard />
              </>
            ) : popularRides.length > 0 ? (
              popularRides.map(ride => (
                <RideCard key={ride.id} ride={ride} />
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600 mb-4">Nenhuma carona disponível no momento</p>
                <Link to="/publish" className="btn-primary inline-flex items-center gap-2">
                  Oferecer carona
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container-app relative">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
              Por que escolher o EcoRide
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Benefícios para você e o planeta
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Mais do que uma simples carona, uma forma inteligente de viajar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Economia */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="w-14 h-14 rounded-xl bg-accent-400 flex items-center justify-center mb-4">
                <Wallet className="w-7 h-7 text-primary-800" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Economize muito</h3>
              <p className="text-white/70">
                Divida os custos da viagem e economize até 75% em comparação com outras opções de transporte.
              </p>
            </div>

            {/* Sustentabilidade */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="w-14 h-14 rounded-xl bg-secondary-400 flex items-center justify-center mb-4">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Ajude o planeta</h3>
              <p className="text-white/70">
                Reduza sua pegada de carbono compartilhando viagens. Cada carona conta para um futuro mais verde.
              </p>
            </div>

            {/* Segurança */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="w-14 h-14 rounded-xl bg-primary-300 flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-primary-800" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Viaje seguro</h3>
              <p className="text-white/70">
                Perfis verificados, avaliações reais e suporte 24h para garantir sua tranquilidade.
              </p>
            </div>

            {/* Comunidade */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Faça amigos</h3>
              <p className="text-white/70">
                Conheça pessoas incríveis durante suas viagens. A jornada fica muito melhor em boa companhia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container-app">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl"></div>

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Pronto para sua próxima viagem?
                </h2>
                <p className="text-slate-400 mb-8 text-lg">
                  Junte-se a milhares de pessoas que já estão economizando e viajando de forma sustentável com o EcoRide.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/search" 
                    className="btn-primary inline-flex items-center justify-center gap-2"
                  >
                    Buscar carona
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    to="/publish" 
                    className="btn-secondary inline-flex items-center justify-center gap-2"
                  >
                    Oferecer carona
                  </Link>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                      MS
                    </div>
                    <div>
                      <p className="text-white font-medium">Maria S.</p>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-300 italic">
                    "Já economizei mais de R$ 2.000 em viagens usando o EcoRide. Além de conhecer pessoas incríveis pelo caminho!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-100">
        <div className="container-app">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-secondary-500" />
              <span>Perfis verificados</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-secondary-500" />
              <span>Pagamento seguro</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-secondary-500" />
              <span>Suporte 24/7</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-secondary-500" />
              <span>Avaliações reais</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
