import React, { useState, useEffect } from 'react'

const PlataformaEcoRide = () => {
  // Estados principais da aplicação
  const [paginaAtiva, setPaginaAtiva] = useState('dashboard')
  const [avisos, setAvisos] = useState([])
  const [dadosUsuario, setDadosUsuario] = useState({
    nome: 'Estudante SENAI',
    email: 'estudante@ecoride.app',
    pontuacao: 4.7,
    totalViagens: 18,
    logado: true
  })
  // Estados para formulários
  const [pesquisaCarona, setPesquisaCarona] = useState({
    pontoPartida: '',
    pontoChegada: '',
    dataVoo: '',
    numPessoas: '1'
  })
  const [novaOferta, setNovaOferta] = useState({
    saindo: '',
    destino: '',
    diaViagem: '',
    horaPartida: '',
    lugaresDispo: '1',
    custoIndividual: '',
    dadosVeiculo: '',
    infosExtras: '',
    configuracoes: {
      semFumo: false,
      permitePets: false,
      comMusica: true
    }
  })
  // Informações simuladas da plataforma
  const numerosGlobais = {
    pessoasCadastradas: '8.9k',
    viagensHoje: '156',
    carbonoEvitado: '12.3t',
    dinheiroEconomizado: 'R$ 178k'
  }
  const viagensDestaque = [
    {
      codigo: 1,
      trajeto: 'São Paulo → Rio de Janeiro',
      horarioSaida: 'Hoje, 15:20',
      tempoEstimado: '6h15min',
      valorPessoa: 68,
      vagasLivres: 2,
      condutor: {
        nomeCompleto: 'Carla Mendes',
        notaAvaliacao: 4.8,
        quantViagens: 92,
        modeloCarro: 'Volkswagen Polo 2021',
        fotoProfile: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face'
      },
      regrasViagem: ['🚭 Ambiente livre de fumo', '🎧 Música ambiente', '❄️ Climatizado'],
      localSaida: 'Estação Sé do Metrô',
      localDestino: 'Aeroporto Santos Dumont'
    },
    {
      codigo: 2,
      trajeto: 'São Paulo → Santos',
      horarioSaida: 'Amanhã, 08:45',
      tempoEstimado: '1h20min',
      valorPessoa: 32,
      vagasLivres: 3,
      condutor: {
        nomeCompleto: 'Roberto Silva',
        notaAvaliacao: 4.9,
        quantViagens: 143,
        modeloCarro: 'Honda City 2020',
        fotoProfile: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      regrasViagem: ['🚭 Não fumante', '📱 Tomada USB'],
      localSaida: 'Shopping Ibirapuera',
      localDestino: 'Praia do Gonzaga'
    },
    {
      codigo: 3,
      trajeto: 'Campinas → São Paulo',
      horarioSaida: 'Sexta, 18:30',
      tempoEstimado: '2h10min',
      valorPessoa: 28,
      vagasLivres: 1,
      condutor: {
        nomeCompleto: 'Fernanda Costa',
        notaAvaliacao: 5.0,
        quantViagens: 201,
        modeloCarro: 'Toyota Corolla 2019',
        fotoProfile: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      regrasViagem: ['🚭 Proibido fumar', '🐕 Aceita animais pequenos', '🎵 Conversa liberada'],
      localSaida: 'Terminal Rodoviário',
      localDestino: 'Estação da Luz'
    }
  ]
  const minhasReservas = [
    {
      codigo: 1,
      percurso: 'São Paulo → Campinas',
      quando: 'Amanhã, 07:15',
      situacaoAtual: 'Confirmado',
      tipoViagem: 'passageiro',
      motorista: {
        nomeCompleto: 'Roberto Silva',
        avaliacaoMedia: 4.9,
        infoVeiculo: 'Honda City Prata',
        imagemPerfil: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      assentosReservados: 1,
      valorPago: 32
    },
    {
      codigo: 2,
      percurso: 'São Paulo → Rio de Janeiro',
      quando: '18/09, 15:20',
      situacaoAtual: 'Finalizado',
      tipoViagem: 'passageiro',
      motorista: {
        nomeCompleto: 'Carla Mendes',
        avaliacaoMedia: 4.8,
        infoVeiculo: 'VW Polo Azul',
        imagemPerfil: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face'
      },
      resultadoAmbiental: {
        co2Reduzido: 3.2,
        valorEconomizado: 78
      },
      valorPago: 68
    }
  ]
  // Sistema de avisos temporários
  useEffect(() => {
    const cronometro = setTimeout(() => {
      exibirAviso('🌟 Encontramos 3 novas opções para Rio de Janeiro!', 'informacao')
    }, 2500)
    return () => clearTimeout(cronometro)
  }, [])
  const exibirAviso = (mensagem, categoria = 'info') => {
    const novoAviso = {
      id: Date.now(),
      texto: mensagem,
      tipo: categoria
    }
    setAvisos(anteriores => [...anteriores, novoAviso])
    setTimeout(() => {
      setAvisos(anteriores => anteriores.filter(aviso => aviso.id !== novoAviso.id))
    }, 4500)
  }
  // Componente do cabeçalho principal
  const CabecalhoSite = () => (
    <header className="bg-white border-b-2 border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-18">
          {/* Marca e logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <span className="text-white text-xl font-bold">🌱</span>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-emerald-600">EcoRide</h1>
              <span className="text-xs text-gray-400 font-medium">Carona Sustentável</span>
            </div>
          </div>
          {/* Menu de navegação */}
          <nav className="hidden lg:flex space-x-2">
            {[
              { identificador: 'dashboard', rotulo: 'Painel', emoji: '🏠' },
              { identificador: 'buscar', rotulo: 'Encontrar', emoji: '🔍' },
              { identificador: 'oferecer', rotulo: 'Oferecer', emoji: '➕' },
              { identificador: 'viagens', rotulo: 'Minhas Rotas', emoji: '🚗' }
            ].map(opcao => (
              <button
                key={opcao.identificador}
                onClick={() => setPaginaAtiva(opcao.identificador)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                  paginaAtiva === opcao.identificador
                    ? 'text-emerald-700 bg-emerald-100 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}>
                <span className="text-lg">{opcao.emoji}</span>
                {opcao.rotulo}
              </button>
            ))}
          </nav>
          {/* Área do usuário */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>            
            <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt="Foto do perfil"
                className="w-10 h-10 rounded-full border-2 border-emerald-200"/>
              <div className="hidden md:block text-left">
                <div className="text-sm font-semibold text-gray-800">{dadosUsuario.nome}</div>
                <div className="text-xs text-gray-500">⭐ {dadosUsuario.pontuacao} • {dadosUsuario.totalViagens} viagens</div>
              </div>
              <span className="text-gray-400 text-sm">▼</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
  // Componente para avisos flutuantes
  const AvisoFlutuante = ({ aviso }) => (
    <div className={`fixed top-24 right-6 max-w-sm w-full bg-white rounded-2xl shadow-xl border-l-4 p-4 z-50 transition-all duration-500 transform ${
      aviso.tipo === 'informacao' ? 'border-blue-500' : 
      aviso.tipo === 'erro' ? 'border-red-500' : 'border-emerald-500'
    }`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-lg">
          {aviso.tipo === 'informacao' ? '📢' : 
           aviso.tipo === 'erro' ? '⚠️' : '✅'}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-700 font-medium">{aviso.texto}</p>
        </div>
        <button
          onClick={() => setAvisos(anteriores => anteriores.filter(a => a.id !== aviso.id))}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >✕</button>
      </div>
    </div>
  )
  // Componente para métricas destacadas
  const CartaoMetrica = ({ titulo, valor, icone, corTema = 'emerald' }) => (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{titulo}</p>
          <p className={`text-3xl font-bold text-${corTema}-600`}>{valor}</p>
        </div>
        <div className={`p-4 rounded-2xl bg-${corTema}-100 text-${corTema}-600 text-2xl`}>
          {icone}
        </div>
      </div>
    </div>
  )
  // Componente principal para exibir caronas
  const CartaoCarona = ({ viagem, mostrarAcoes = true, versaoCompacta = false }) => (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Seção superior com informações principais */}
      <div className="bg-gradient-to-r from-emerald-100 via-emerald-50 to-blue-50 border-b border-emerald-200 p-5">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{viagem.trajeto}</h3>
            <p className="text-sm text-gray-600 mb-1">{viagem.horarioSaida} • {viagem.tempoEstimado}</p>
            {!versaoCompacta && viagem.localSaida && (
              <div className="mt-3 space-y-1 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span>🚗</span>
                  <span>Saída: {viagem.localSaida}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🏁</span>
                  <span>Chegada: {viagem.localDestino}</span>
                </div>
              </div>
            )}
          </div>
          <div className="text-right ml-4">
            <div className="text-3xl font-bold text-emerald-600 mb-1">
              R$ {viagem.valorPessoa || viagem.valorPago}
            </div>
            <div className="text-sm text-gray-500">
              {viagem.vagasLivres ? `${viagem.vagasLivres} ${viagem.vagasLivres === 1 ? 'vaga' : 'vagas'}` : ''}
              {viagem.assentosReservados ? `${viagem.assentosReservados} assento` : ''}
            </div>
          </div>
        </div>
      </div>
      {/* Informações do condutor */}
      <div className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={(viagem.condutor?.fotoProfile || viagem.motorista?.imagemPerfil)}
            alt="Foto do motorista"
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"/>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800 text-lg">
              {viagem.condutor?.nomeCompleto || viagem.motorista?.nomeCompleto}
            </h4>
            <p className="text-sm text-gray-600">
              ⭐ {viagem.condutor?.notaAvaliacao || viagem.motorista?.avaliacaoMedia} • 
              {viagem.condutor?.quantViagens || viagem.motorista?.quantViagens} viagens • 
              {viagem.condutor?.modeloCarro || viagem.motorista?.infoVeiculo}
            </p>
          </div>
          {viagem.situacaoAtual && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              viagem.situacaoAtual === 'Confirmado' ? 'bg-blue-200 text-blue-800' :
              viagem.situacaoAtual === 'Finalizado' ? 'bg-emerald-200 text-emerald-800' :
              'bg-gray-200 text-gray-800'
            }`}>
              {viagem.situacaoAtual}
            </span>
          )}
        </div>
        {/* Regras e preferências da viagem */}
        {viagem.regrasViagem && (
          <div className="flex flex-wrap gap-2 mb-4">
            {viagem.regrasViagem.map((regra, indice) => (
              <span key={indice} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                {regra}
              </span>
            ))}
          </div>
        )}
        {/* Destaque do impacto ambiental */}
        {viagem.resultadoAmbiental && (
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 mb-4">
            <h5 className="text-sm font-bold text-emerald-800 mb-2">🌱 Impacto desta viagem:</h5>
            <div className="text-sm text-emerald-700">
              <span className="font-semibold">{viagem.resultadoAmbiental.co2Reduzido} kg</span> de CO₂ evitado • 
              <span className="font-semibold"> R$ {viagem.resultadoAmbiental.valorEconomizado}</span> economizado
            </div>
          </div>
        )}
        {/* Botões de ação */}
        {mostrarAcoes && (
          <div className="flex gap-3">
            {viagem.situacaoAtual === 'Confirmado' ? (
              <>
                <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold">
                  💬 Conversar
                </button>
                <button className="flex-1 bg-red-600 text-white py-3 px-4 rounded-xl hover:bg-red-700 transition-colors font-semibold">
                  ❌ Cancelar
                </button>
              </>
            ) : viagem.situacaoAtual === 'Finalizado' ? (
              <button className="w-full bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors font-semibold">
                ⭐ Avaliar Viagem
              </button>
            ) : (
              <button 
                onClick={() => exibirAviso('🎯 Solicitação de reserva enviada!', 'sucesso')}
                className="w-full bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors font-semibold">
                🎯 Solicitar Reserva
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
  // Página principal (Dashboard)
  const PaginaDashboard = () => (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      {/* Seção hero principal */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-600 rounded-3xl text-white p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Transforme sua Forma de Viajar
          </h1>
          <p className="text-xl lg:text-2xl opacity-95 mb-6 leading-relaxed">
            Conecte-se com pessoas que compartilham a mesma rota. Economize dinheiro, 
            reduza emissões de carbono e construa uma mobilidade mais consciente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setPaginaAtiva('buscar')}
              className="bg-white text-emerald-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 hover:scale-105 transition-all shadow-lg">
              Encontrar Carona
            </button>
            <button 
              onClick={() => setPaginaAtiva('oferecer')}
              className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400 hover:scale-105 transition-all shadow-lg">
              Oferecer Vaga
            </button>
          </div>
        </div>
        {/* Elemento decorativo de fundo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full translate-y-24 -translate-x-24"></div>
      </div>
      {/* Métricas de impacto */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CartaoMetrica
          titulo="Pessoas Conectadas"
          valor={numerosGlobais.pessoasCadastradas}
          icone="👥"
          corTema="blue"/>
        <CartaoMetrica
          titulo="Viagens Hoje"
          valor={numerosGlobais.viagensHoje}
          icone="🚗"
          corTema="emerald"/>
        <CartaoMetrica
          titulo="CO₂ Evitado"
          valor={numerosGlobais.carbonoEvitado}
          icone="🌱"
          corTema="emerald"/>
        <CartaoMetrica
          titulo="Economia Total"
          valor={numerosGlobais.dinheiroEconomizado}
          icone="💰"
          corTema="yellow"/>
      </div>
      {/* Seção de caronas em destaque */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Caronas em Destaque</h2>
          <button 
            onClick={() => setPaginaAtiva('buscar')}
            className="text-emerald-600 hover:text-emerald-800 font-semibold text-lg hover:underline transition-colors">
            Ver todas as opções →
          </button>
        </div>        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {viagensDestaque.map(viagem => (
            <CartaoCarona key={viagem.codigo} viagem={viagem} />
          ))}
        </div>
      </div>
      {/* Seção explicativa "Como funciona" */}
      <div className="bg-gray-50 rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Como Funciona a Plataforma</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">1. Busque ou Ofereça</h3>
            <p className="text-gray-600 leading-relaxed">
              Encontre caronas para seu destino ou compartilhe vagas disponíveis no seu veículo
            </p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">2. Conecte-se com Segurança</h3>
            <p className="text-gray-600 leading-relaxed">
              Entre em contato com motoristas e passageiros verificados pela nossa plataforma
            </p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <span className="text-3xl">🌱</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">3. Viaje de Forma Consciente</h3>
            <p className="text-gray-600 leading-relaxed">
              Economize dinheiro, reduza emissões e contribua para um futuro sustentável
            </p>
          </div>
        </div>
      </div>
    </div>
  )
  // Página de busca de caronas
  const PaginaBusca = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Painel de filtros lateral */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Encontrar Caronas</h2>            
            <form onSubmit={(e) => { 
              e.preventDefault() 
              exibirAviso('Procurando as melhores opções para você...', 'informacao') 
            }} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">De onde você sai?</label>
                <input
                  type="text"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="Ex: São Paulo, SP"
                  value={pesquisaCarona.pontoPartida}
                  onChange={(e) => setPesquisaCarona({...pesquisaCarona, pontoPartida: e.target.value})}
                />
              </div>              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Qual seu destino?</label>
                <input
                  type="text"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="Ex: Rio de Janeiro, RJ"
                  value={pesquisaCarona.pontoChegada}
                  onChange={(e) => setPesquisaCarona({...pesquisaCarona, pontoChegada: e.target.value})}/>
              </div>              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Data da viagem</label>
                <input
                  type="date"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  value={pesquisaCarona.dataVoo}
                  onChange={(e) => setPesquisaCarona({...pesquisaCarona, dataVoo: e.target.value})}/>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantas pessoas?</label>
                <select
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  value={pesquisaCarona.numPessoas}
                  onChange={(e) => setPesquisaCarona({...pesquisaCarona, numPessoas: e.target.value})}>
                  <option value="1">1 pessoa</option>
                  <option value="2">2 pessoas</option>
                  <option value="3">3 pessoas</option>
                  <option value="4">4 pessoas</option>
                </select>
              </div>              
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 hover:scale-105 transition-all shadow-lg">
                Buscar Caronas
              </button>
            </form>
            {/* Filtros adicionais */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Filtros Avançados</h3>              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Faixa de preço (R$)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="number" 
                      placeholder="Mínimo" 
                      className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                    <input 
                      type="number" 
                      placeholder="Máximo" 
                      className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"/>
                  </div>
                </div>                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Avaliação mínima</label>
                  <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500">
                    <option>Qualquer avaliação</option>
                    <option>4.0+ estrelas</option>
                    <option>4.5+ estrelas</option>
                    <option>5.0 estrelas apenas</option>
                  </select>
                </div>                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Preferências da viagem</label>
                  <div className="space-y-3">
                    {[
                      { id: 'naoFumo', label: 'Ambiente livre de fumo' },
                      { id: 'pets', label: 'Permite animais de estimação' },
                      { id: 'musica', label: 'Música ambiente' },
                      { id: 'conversa', label: 'Conversa liberada' }
                    ].map(opcao => (
                      <label key={opcao.id} className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-emerald-600 border-2 border-gray-300 rounded focus:ring-emerald-500"/>
                        <span className="text-sm text-gray-700">{opcao.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Área de resultados */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Resultados da Busca</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{viagensDestaque.length} caronas encontradas</span>
              <select className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500">
                <option>Ordenar por relevância</option>
                <option>Menor preço primeiro</option>
                <option>Melhor avaliação</option>
                <option>Horário de partida</option>
                <option>Menor tempo de viagem</option>
              </select>
            </div>
          </div>          
          <div className="space-y-6">
            {viagensDestaque.map(viagem => (
              <CartaoCarona key={viagem.codigo} viagem={viagem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
  // Página para oferecer carona
  const PaginaOferecer = () => (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Compartilhe sua Viagem</h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Ofereça vagas no seu carro, divida os custos da viagem e ajude outras pessoas 
            enquanto contribui para um planeta mais sustentável.
          </p>
        </div>        
        <form onSubmit={(e) => { 
          e.preventDefault() 
          exibirAviso('Carona criada com sucesso! Aguarde aprovação das solicitações.', 'sucesso')
          setNovaOferta({
            saindo: '', destino: '', diaViagem: '', horaPartida: '', lugaresDispo: '1', 
            custoIndividual: '', dadosVeiculo: '', infosExtras: '',
            configuracoes: { semFumo: false, permitePets: false, comMusica: true }
          })
        }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Primeira coluna */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Local de partida</label>
                <input
                  type="text"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="Ex: São Paulo, SP - Centro"
                  value={novaOferta.saindo}
                  onChange={(e) => setNovaOferta({...novaOferta, saindo: e.target.value})}
                  required/>
              </div>              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Destino final</label>
                <input
                  type="text"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="Ex: Rio de Janeiro, RJ - Copacabana"
                  value={novaOferta.destino}
                  onChange={(e) => setNovaOferta({...novaOferta, destino: e.target.value})}
                  required/>
              </div>              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Data da viagem</label>
                  <input
                    type="date"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    value={novaOferta.diaViagem}
                    onChange={(e) => setNovaOferta({...novaOferta, diaViagem: e.target.value})}
                    required/>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Horário de partida</label>
                  <input
                    type="time"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    value={novaOferta.horaPartida}
                    onChange={(e) => setNovaOferta({...novaOferta, horaPartida: e.target.value})}
                    required/>
                </div>
              </div>              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Vagas disponíveis</label>
                  <select
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    value={novaOferta.lugaresDispo}
                    onChange={(e) => setNovaOferta({...novaOferta, lugaresDispo: e.target.value})}
                    required>
                    <option value="1">1 vaga</option>
                    <option value="2">2 vagas</option>
                    <option value="3">3 vagas</option>
                    <option value="4">4 vagas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Valor por pessoa (R$)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-gray-500 font-semibold">R$</span>
                    <input
                      type="number"
                      className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      placeholder="68"
                      min="1"
                      value={novaOferta.custoIndividual}
                      onChange={(e) => setNovaOferta({...novaOferta, custoIndividual: e.target.value})}
                      required/>
                  </div>
                </div>
              </div>              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Dados do veículo</label>
                <input
                  type="text"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="Ex: Honda Civic Branco 2020 - ABC-1234"
                  value={novaOferta.dadosVeiculo}
                  onChange={(e) => setNovaOferta({...novaOferta, dadosVeiculo: e.target.value})}
                  required/>
              </div>
            </div>
            {/* Segunda coluna */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Informações adicionais</label>
                <textarea
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none"
                  rows="6"
                  placeholder="Descreva detalhes sobre a viagem: paradas planejadas, estilo de condução, regras específicas, etc."
                  value={novaOferta.infosExtras}
                  onChange={(e) => setNovaOferta({...novaOferta, infosExtras: e.target.value})}/>
              </div>              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4">Configurações da viagem</label>
                <div className="space-y-4">
                  {[
                    { chave: 'semFumo', titulo: 'Ambiente livre de fumo', desc: 'Não é permitido fumar durante a viagem' },
                    { chave: 'permitePets', titulo: 'Aceito animais pequenos', desc: 'Passageiros podem levar pets de pequeno porte' },
                    { chave: 'comMusica', titulo: 'Música ambiente', desc: 'Haverá música tocando durante o trajeto' }
                  ].map(config => (
                    <label
                      key={config.chave}
                      className={`flex items-start gap-4 p-5 rounded-xl cursor-pointer transition-all border-2 ${
                        novaOferta.configuracoes[config.chave]
                          ? 'bg-emerald-50 border-emerald-200 shadow-sm'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}>
                      <input
                        type="checkbox"
                        className="mt-1 w-5 h-5 text-emerald-600 border-2 border-gray-300 rounded focus:ring-emerald-500"
                        checked={novaOferta.configuracoes[config.chave]}
                        onChange={(e) => setNovaOferta({
                          ...novaOferta,
                          configuracoes: {
                            ...novaOferta.configuracoes,
                            [config.chave]: e.target.checked
                          }
                        })}/>
                      <div>
                        <div className="font-semibold text-gray-800">{config.titulo}</div>
                        <div className="text-sm text-gray-600 mt-1">{config.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>              
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
                <h3 className="font-bold text-blue-900 mb-3">Dicas para uma experiência positiva</h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Seja pontual e comunique qualquer atraso antecipadamente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Mantenha o veículo limpo e em boas condições</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Informe sobre paradas programadas durante o trajeto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Respeite as preferências dos passageiros</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>          
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => setPaginaAtiva('dashboard')}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold">
                Cancelar
              </button>
              <button
                type="submit"
                className="px-12 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 hover:scale-105 transition-all shadow-lg">
                Publicar Carona
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
  // Página de minhas viagens
  const PaginaViagens = () => {
    const [abaSelecionada, setAbaSelecionada] = useState('passageiro')
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Minhas Viagens</h1>
          <button 
            onClick={() => setPaginaAtiva('oferecer')}
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 hover:scale-105 transition-all font-semibold shadow-lg">
            Nova Carona
          </button>
        </div>
        {/* Sistema de abas */}
        <div className="mb-8">
          <div className="border-b-2 border-gray-200">
            <nav className="-mb-0.5 flex space-x-8">
              {[
                { id: 'passageiro', titulo: 'Como Passageiro', icone: '👤' },
                { id: 'motorista', titulo: 'Como Motorista', icone: '🚗' },
                { id: 'historico', titulo: 'Histórico Completo', icone: '📊' }
              ].map(aba => (
                <button
                  key={aba.id}
                  onClick={() => setAbaSelecionada(aba.id)}
                  className={`flex items-center gap-3 py-4 px-2 border-b-4 font-bold text-lg transition-all ${
                    abaSelecionada === aba.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}>
                  <span className="text-xl">{aba.icone}</span>
                  {aba.titulo}
                </button>
              ))}
            </nav>
          </div>
        </div>
        {/* Conteúdo das abas */}
        <div>
          {abaSelecionada === 'passageiro' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {minhasReservas.map(reserva => (
                <CartaoCarona key={reserva.codigo} viagem={reserva} versaoCompacta />
              ))}
            </div>
          )}          
          {abaSelecionada === 'motorista' && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🚗</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Nenhuma carona como motorista</h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Você ainda não ofereceu nenhuma carona. Que tal compartilhar uma vaga e ajudar outras pessoas?
              </p>
              <button 
                onClick={() => setPaginaAtiva('oferecer')}
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 hover:scale-105 transition-all font-bold text-lg shadow-lg">
                Criar Primeira Carona
              </button>
            </div>
          )}          
          {abaSelecionada === 'historico' && (
            <div>
              {/* Resumo pessoal do impacto */}
              <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-600 rounded-2xl text-white p-8 mb-8">
                <h2 className="text-3xl font-bold mb-6">Seu Impacto Sustentável</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{dadosUsuario.totalViagens}</div>
                    <div className="text-emerald-100 text-lg">Viagens realizadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">12.8kg</div>
                    <div className="text-emerald-100 text-lg">CO₂ evitado</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">R$ 456</div>
                    <div className="text-emerald-100 text-lg">Total economizado</div>
                  </div>
                </div>
              </div>              
              {/* Lista do histórico */}
              <div className="space-y-6">
                {minhasReservas.filter(reserva => reserva.situacaoAtual === 'Finalizado').map(reserva => (
                  <CartaoCarona key={reserva.codigo} viagem={reserva} mostrarAcoes={false} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
  // Função principal para renderizar páginas
  const renderizarConteudo = () => {
    switch (paginaAtiva) {
      case 'dashboard':
        return <PaginaDashboard />
      case 'buscar':
        return <PaginaBusca />
      case 'oferecer':
        return <PaginaOferecer />
      case 'viagens':
        return <PaginaViagens />
      default:
        return <PaginaDashboard />
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sistema de avisos */}
      {avisos.map(aviso => (
        <AvisoFlutuante key={aviso.id} aviso={aviso} />
      ))}      
      {/* Cabeçalho fixo */}
      <CabecalhoSite />      
      {/* Área principal de conteúdo */}
      <main className="min-h-screen">
        {renderizarConteudo()}
      </main>      
      {/* Rodapé da página */}
      <footer className="bg-white border-t-2 border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-600 p-2 rounded-lg">
                  <span className="text-white text-xl font-bold">🌱</span>
                </div>
                <h3 className="text-xl font-bold text-emerald-600">EcoRide</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Transformando a mobilidade urbana através do compartilhamento consciente de caronas.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-4 text-lg">Plataforma</h4>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Como funciona</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Segurança</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Sustentabilidade</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Comunidade</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-4 text-lg">Suporte</h4>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Fale Conosco</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Privacidade</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-4 text-lg">Conecte-se</h4>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Aplicativo Mobile</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Blog Sustentável</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Redes Sociais</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500">
              2025 EcoRide - Plataforma de Carona Sustentável. Desenvolvido para SA-SENAI.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                🌱 <span>Neutro em carbono</span>
              </span>
              <span className="flex items-center gap-2">
                🔒 <span>Pagamentos protegidos</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
      <style jsx>
        {`
        /* Barra de rolagem personalizada */
        ::-webkit-scrollbar {
          width: 10px
        }
        ::-webkit-scrollbar-track {
          background: #f1f5f9
          border-radius: 10px
        } 
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #059669, #047857)
          border-radius: 10px
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #047857, #065f46)
        }        
        /* Animações customizadas */
        @keyframes deslizarDireita {
          from {
            opacity: 0
            transform: translateX(100px)
          }
          to {
            opacity: 1
            transform: translateX(0)
          }
        }        
        @keyframes aparecerCima {
          from {
            opacity: 0
            transform: translateY(40px)
          }
          to {
            opacity: 1
            transform: translateY(0)
          }
        }        
        @keyframes pulsoSuave {
          0%, 100% {
            transform: scale(1)
          }
          50% {
            transform: scale(1.05)
          }
        }        
        .animacao-deslizar {
          animation: deslizarDireita 0.4s ease-out
        }        
        .animacao-aparecer {
          animation: aparecerCima 0.5s ease-out
        }        
        .pulso-hover:hover {
          animation: pulsoSuave 0.6s ease-in-out
        }        
        /* Transições fluidas globais */
        * {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
        }        
        /* Efeitos visuais para interação */
        .elevacao-hover:hover {
          transform: translateY(-4px)
          box-shadow: 0 20px 40px rgba(0,0,0,0.15)
        }        
        /* Gradientes dinâmicos */
        .gradiente-animado {
          background-size: 200% 200%
          animation: movimentoGradiente 8s ease infinite
        }        
        @keyframes movimentoGradiente {
          0% {
            background-position: 0% 50%
          }
          50% {
            background-position: 100% 50%
          }
          100% {
            background-position: 0% 50%
          }
        }        
        /* Melhorias de responsividade */
        @media (max-width: 768px) {
          .empilhar-mobile {
            flex-direction: column
          }          
          .largura-total-mobile {
            width: 100%
          }
          
          .texto-pequeno-mobile {
            font-size: 0.875rem
          }
        }        
        /* Estados de foco aprimorados */
        input:focus, select:focus, textarea:focus {
          outline: none
          box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.15)
          border-color: #059669
        }        
        /* Botões com estados visuais */
        button:focus {
          outline: none
          box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.15)
        }        
        button:active {
          transform: translateY(1px)
        }        
        /* Checkboxes estilizados */
        input[type="checkbox"]:checked {
          background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e")
        }        
        /* Elementos decorativos */
        .decorativo-pontos::before {
          content: ''
          position: absolute
          top: -10px
          right: -10px
          width: 20px
          height: 20px
          background: radial-gradient(circle, #059669 2px, transparent 2px)
          background-size: 10px 10px
        }        
        /* Loading states */
        .carregando {
          position: relative
          overflow: hidden
        }        
        .carregando::after {
          content: ''
          position: absolute
          top: 0
          left: -100%
          width: 100%
          height: 100%
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)
          animation: carregamentoShimmer 1.5s infinite
        }        
        @keyframes carregamentoShimmer {
          0% {
            left: -100%
          }
          100% {
            left: 100%
          }
        }
      `}
      </style>
    </div>
  )
}
export default PlataformaEcoRide