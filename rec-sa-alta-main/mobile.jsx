import React, { useState, useEffect } from 'react'

const EcoRideSystem = () => {
  const [telaAtual, setTelaAtual] = useState('inicio')
  const [alertas, setAlertas] = useState([])
  const [buscaInfo, setBuscaInfo] = useState({
    partida: 'São Paulo',
    chegada: '',
    dataViagem: '2025-09-29',
    qtdPassageiros: '1'
  })  
  const [novaCaronaInfo, setNovaCaronaInfo] = useState({
    origem: '',
    destino: '',
    dataPartida: '',
    horarioPartida: '',
    vagasDisponiveis: '1',
    valorPorPessoa: '',
    infoVeiculo: '',
    observacoes: '',
    configuracoes: {
      naoFumante: false,
      aceitaAnimais: false,
      musicaPermitida: true
    }
  })
  // Dados simulados do sistema
  const estatisticasGerais = {
    usuariosAtivos: '1.2k',
    caronasHoje: '89',
    co2Economizado: '2.5t',
    economiaTotal: 'R$ 45k'
  }
  const meuPerfil = {
    co2Poupado: '8.4',
    dinheiroPoupado: 'R$ 320',
    avaliacaoMedia: 4.8,
    viagensFeitas: 24
  }
  const caronasExemplo = [
    {
      id: 1,
      rota: 'São Paulo → Rio de Janeiro',
      horario: 'Hoje, 14:30',
      duracao: '6h30min',
      valor: 65,
      vagas: 3,
      motorista: {
        nome: 'Maria Silva',
        nota: 4.9,
        viagens: 127,
        carro: 'Honda Civic',
        inicial: 'M'
      },
      regras: ['🚭 Não fumante', '🎵 Música OK']
    },
    {
      id: 2,
      rota: 'São Paulo → Rio de Janeiro',
      horario: 'Amanhã, 08:00',
      duracao: '6h45min',
      valor: 70,
      vagas: 2,
      motorista: {
        nome: 'João Santos',
        nota: 4.8,
        viagens: 89,
        carro: 'Toyota Corolla',
        inicial: 'J'
      },
      regras: ['🚭 Não fumante', '🐕 Aceita pets']
    }
  ]
  const minhasViagens = [
    {
      id: 1,
      percurso: 'São Paulo → Campinas',
      quando: 'Amanhã, 07:00',
      situacao: 'Confirmada',
      papel: 'passageiro',
      condutor: {
        nome: 'João Santos',
        avaliacao: 4.8,
        automovel: 'Toyota Corolla Prata',
        letra: 'J'
      },
      lugares: 1
    },
    {
      id: 2,
      percurso: 'São Paulo → Rio de Janeiro',
      quando: '15/10, 14:30',
      situacao: 'Concluída',
      papel: 'passageiro',
      condutor: {
        nome: 'Maria Silva',
        avaliacao: 4.9,
        automovel: 'Honda Civic Branco',
        letra: 'M'
      },
      beneficio: {
        co2: 2.1,
        economia: 50
      }
    }
  ]
  // Sistema de notificações
  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (telaAtual === 'inicio') {
        exibirAlerta('🎉 Nova carona disponível para Rio de Janeiro!')
      }
    }, 3000)
    const timer2 = setTimeout(() => {
      if (telaAtual === 'viagens') {
        exibirAlerta('💬 João Santos enviou uma mensagem')
      }
    }, 5000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [telaAtual])
  const exibirAlerta = (mensagem) => {
    const novoAlerta = {
      id: Date.now(),
      texto: mensagem
    }
    setAlertas(prev => [...prev, novoAlerta])    
    setTimeout(() => {
      setAlertas(prev => prev.filter(a => a.id !== novoAlerta.id))
    }, 3000)
  }
  const processarBusca = (e) => {
    e.preventDefault()
    exibirAlerta('🔍 Procurando caronas...')
  }
  const criarNovaCarona = (e) => {
    e.preventDefault()
    exibirAlerta('✅ Carona criada com sucesso!')
    setNovaCaronaInfo({
      origem: '',
      destino: '',
      dataPartida: '',
      horarioPartida: '',
      vagasDisponiveis: '1',
      valorPorPessoa: '',
      infoVeiculo: '',
      observacoes: '',
      configuracoes: {
        naoFumante: false,
        aceitaAnimais: false,
        musicaPermitida: true
      }
    })
  }
  // Componente para alertas
  const ComponenteAlerta = ({ alerta }) => (
    <div 
      className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-white px-5 py-4 rounded-xl shadow-2xl z-50 text-sm text-gray-800 border-l-4 border-emerald-600 max-w-xs animate-pulse"
      style={{
        animation: 'entradaAlerta 0.3s ease-out'
      }}>
      {alerta.texto}
    </div>
  )
  // Barra de status do dispositivo
  const BarraStatus = () => (
    <div className="h-11 bg-white flex justify-between items-center px-5 text-sm font-semibold">
      <span>9:41</span>
      <span>🔋 100%</span>
    </div>
  )
  // Menu de navegação inferior
  const MenuNavegacao = () => {
    const itensMenu = [
      { id: 'inicio', icone: '🏠', titulo: 'Início' },
      { id: 'buscar', icone: '🔍', titulo: 'Buscar' },
      { id: 'criar', icone: '➕', titulo: 'Criar' },
      { id: 'viagens', icone: '🚗', titulo: 'Viagens' },
      { id: 'conta', icone: '👤', titulo: 'Conta' }
    ]
    return (
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-0 py-3 flex justify-around">
        {itensMenu.map(item => (
          <div
            key={item.id}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer transition-all ${
              telaAtual === item.id 
                ? 'text-emerald-600 bg-emerald-50' 
                : 'text-gray-500'
            }`}
            onClick={() => setTelaAtual(item.id)}>
            <div className="text-2xl">{item.icone}</div>
            <div className="text-xs font-medium">{item.titulo}</div>
          </div>
        ))}
      </div>
    )
  }
  // Card de carona
  const CardCarona = ({ carona, mostrarBotao = true }) => (
    <div className="bg-white mx-4 rounded-2xl overflow-hidden shadow-lg mb-4">
      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 border-l-4 border-emerald-600">
        <div className="text-lg font-semibold text-gray-800 mb-1">{carona.rota}</div>
        <div className="text-sm text-gray-600">{carona.horario} {carona.duracao && `• ${carona.duracao}`}</div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-emerald-600">R$ {carona.valor}</span>
          <span className="bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-700">
            {carona.vagas} {carona.vagas === 1 ? 'vaga' : 'vagas'}
          </span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
            {carona.motorista.inicial}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-800">{carona.motorista.nome}</div>
            <div className="text-sm text-gray-500">
              ⭐ {carona.motorista.nota} • {carona.motorista.viagens} viagens • {carona.motorista.carro}
            </div>
          </div>
        </div>
        {carona.regras && (
          <div className="flex flex-wrap gap-2 mb-3">
            {carona.regras.map((regra, index) => (
              <span key={index} className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md text-xs">
                {regra}
              </span>
            ))}
          </div>
        )}
        {mostrarBotao && (
          <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors">
            Ver Detalhes
          </button>
        )}
      </div>
    </div>
  )
  // Tela inicial
  const TelaInicio = () => (
    <div className="h-full">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-5 rounded-b-3xl">
        <h1 className="text-3xl font-bold mb-2">EcoRide</h1>
        <p className="opacity-90">Conectando pessoas, preservando o planeta 🌱</p>
      </div>      
      <div className="grid grid-cols-2 gap-4 m-5">
        {Object.entries(estatisticasGerais).map(([chave, valor], index) => {
          const rotulos = {
            usuariosAtivos: 'Usuários ativos',
            caronasHoje: 'Caronas hoje',
            co2Economizado: 'CO₂ economizado',
            economiaTotal: 'Total poupado'
          }
          return (
            <div key={chave} className="bg-white p-5 rounded-2xl text-center shadow-lg">
              <span className="text-3xl font-bold text-emerald-600 block">{valor}</span>
              <div className="text-sm text-gray-500 mt-1">{rotulos[chave]}</div>
            </div>
          )
        })}
      </div>
      <div className="bg-white mx-4 p-5 rounded-2xl shadow-lg mb-4">
        <h3 className="mb-4 text-gray-800 font-semibold">Ações Rápidas</h3>
        <div className="flex gap-3">
          <button 
            className="flex-1 bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            onClick={() => setTelaAtual('buscar')}>🔍 Buscar Carona
          </button>
          <button 
            className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            onClick={() => setTelaAtual('criar')}>➕ Criar Carona
          </button>
        </div>
      </div>
      <CardCarona carona={caronasExemplo[0]} />
    </div>
  )
  // Tela de busca
  const TelaBuscar = () => (
    <div className="h-full">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-5 rounded-b-3xl">
        <h1 className="text-3xl font-bold mb-2">Buscar Caronas</h1>
        <p className="opacity-90">Encontre a carona ideal para você</p>
      </div>
      <div className="p-5">
        <form onSubmit={processarBusca} className="bg-white rounded-2xl p-5 shadow-lg mb-5">
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">📍 De onde você sai?</label>
            <input
              type="text"
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:border-emerald-600 focus:outline-none transition-colors"
              placeholder="São Paulo, SP"
              value={buscaInfo.partida}
              onChange={(e) => setBuscaInfo({...buscaInfo, partida: e.target.value})}/>
          </div>          
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">🎯 Para onde vai?</label>
            <input
              type="text"
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:border-emerald-600 focus:outline-none transition-colors"
              placeholder="Rio de Janeiro, RJ"
              value={buscaInfo.chegada}
              onChange={(e) => setBuscaInfo({...buscaInfo, chegada: e.target.value})}/>
          </div>          
          <div className="flex gap-3 mb-5">
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-gray-700">📅 Data</label>
              <input
                type="date"
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:border-emerald-600 focus:outline-none transition-colors"
                value={buscaInfo.dataViagem}
                onChange={(e) => setBuscaInfo({...buscaInfo, dataViagem: e.target.value})}/>
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-gray-700">👥 Passageiros</label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:border-emerald-600 focus:outline-none transition-colors"
                value={buscaInfo.qtdPassageiros}
                onChange={(e) => setBuscaInfo({...buscaInfo, qtdPassageiros: e.target.value})}>
                <option value="1">1 pessoa</option>
                <option value="2">2 pessoas</option>
                <option value="3">3 pessoas</option>
                <option value="4">4 pessoas</option>
              </select>
            </div>
          </div>          
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
          >🔍 Buscar Caronas
          </button>
        </form>
        <h3 className="mb-4 text-gray-800 font-semibold">Caronas Encontradas</h3>
      </div>
      {caronasExemplo.map(carona => (
        <CardCarona key={carona.id} carona={carona} />
      ))}
    </div>
  )
  // Tela de criar carona
  const TelaCriar = () => (
    <div className="h-full overflow-y-auto">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-5 rounded-b-3xl">
        <h1 className="text-3xl font-bold mb-2">Criar Carona</h1>
        <p className="opacity-90">Ofereça uma carona e ajude o planeta</p>
      </div>
      <div className="p-5 pb-24">
        <form onSubmit={criarNovaCarona} className="bg-white rounded-2xl p-5 shadow-lg">
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">📍 Ponto de partida</label>
            <input
              type="text"
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:border-emerald-600 focus:outline-none transition-colors"
              placeholder="São Paulo, SP"
              value={novaCaronaInfo.origem}
              onChange={(e) => setNovaCaronaInfo({...novaCaronaInfo, origem: e.target.value})}/>
          </div>          
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">🎯 Destino</label>
            <input
              type="text"
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:border-emerald-600 focus:outline-none transition-colors"
              placeholder="Rio de Janeiro, RJ"
              value={novaCaronaInfo.destino}
              onChange={(e) => setNovaCaronaInfo({...novaCaronaInfo, destino: e.target.value})}/>
          </div>          
          <div className="flex gap-3 mb-5">
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-gray-700">📅 Data</label>
              <input
                type="date"
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:border-emerald-600 focus:outline-none transition-colors"
                value={novaCaronaInfo.dataPartida}
                onChange={(e) => setNovaCaronaInfo({...novaCaronaInfo, dataPartida: e.target.value})}/>
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-gray-700">🕐 Horário</label>
              <input
                type="time"
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:border-emerald-600 focus:outline-none transition-colors"
                value={novaCaronaInfo.horarioPartida}
                onChange={(e) => setNovaCaronaInfo({...novaCaronaInfo, horarioPartida: e.target.value})}/>
            </div>
          </div>          
          <div className="flex gap-3 mb-5">
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-gray-700">🪑 Vagas</label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:border-emerald-600 focus:outline-none transition-colors"
                value={novaCaronaInfo.vagasDisponiveis}
                onChange={(e) => setNovaCaronaInfo({...novaCaronaInfo, vagasDisponiveis: e.target.value})}>
                <option value="1">1 vaga</option>
                <option value="2">2 vagas</option>
                <option value="3">3 vagas</option>
                <option value="4">4 vagas</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-gray-700">💰 Preço por pessoa</label>
              <input
                type="number"
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:border-emerald-600 focus:outline-none transition-colors"
                placeholder="65"
                value={novaCaronaInfo.valorPorPessoa}
                onChange={(e) => setNovaCaronaInfo({...novaCaronaInfo, valorPorPessoa: e.target.value})}/>
            </div>
          </div>          
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">🚗 Informações do veículo</label>
            <input
              type="text"
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:border-emerald-600 focus:outline-none transition-colors"
              placeholder="Honda Civic Branco - ABC-1234"
              value={novaCaronaInfo.infoVeiculo}
              onChange={(e) => setNovaCaronaInfo({...novaCaronaInfo, infoVeiculo: e.target.value})}/>
          </div>          
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">📝 Observações (opcional)</label>
            <textarea
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:border-emerald-600 focus:outline-none transition-colors"
              rows="3"
              placeholder="Viagem tranquila, ar condicionado ligado..."
              value={novaCaronaInfo.observacoes}
              onChange={(e) => setNovaCaronaInfo({...novaCaronaInfo, observacoes: e.target.value})}/>
          </div>          
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">⚙️ Preferências</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                { chave: 'naoFumante', rotulo: '🚭 Não fumante' },
                { chave: 'aceitaAnimais', rotulo: '🐕 Aceita pets' },
                { chave: 'musicaPermitida', rotulo: '🎵 Música permitida' }
              ].map(pref => (
                <label
                  key={pref.chave}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    novaCaronaInfo.configuracoes[pref.chave]
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                  <input
                    type="checkbox"
                    checked={novaCaronaInfo.configuracoes[pref.chave]}
                    onChange={(e) => setNovaCaronaInfo({
                      ...novaCaronaInfo,
                      configuracoes: {
                        ...novaCaronaInfo.configuracoes,
                        [pref.chave]: e.target.checked
                      }
                    })}/>
                  {pref.rotulo}
                </label>
              ))}
            </div>
          </div>          
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
          >✅ Criar Carona
          </button>
        </form>
      </div>
    </div>
  )
  // Tela de viagens do usuário
  const TelaViagens = () => {
    const [tipoVisualizacao, setTipoVisualizacao] = useState('passageiro')
    return (
      <div className="h-full">
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-5 rounded-b-3xl">
          <h1 className="text-3xl font-bold mb-2">Minhas Viagens</h1>
          <p className="opacity-90">Gerencie suas caronas</p>
        </div>
        <div className="p-5">
          <div className="flex gap-2 mb-5">
            <button
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                tipoVisualizacao === 'passageiro'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setTipoVisualizacao('passageiro')}>Como Passageiro
            </button>
            <button
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                tipoVisualizacao === 'motorista'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setTipoVisualizacao('motorista')}>Como Motorista
            </button>
          </div>
        </div>
        {minhasViagens.map(viagem => (
          <div key={viagem.id} className="bg-white mx-4 rounded-2xl overflow-hidden shadow-lg mb-4">
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 border-l-4 border-emerald-600">
              <div className="text-lg font-semibold text-gray-800 mb-1">{viagem.percurso}</div>
              <div className="text-sm text-gray-600">{viagem.quando} • {viagem.situacao}</div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {viagem.condutor.letra}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{viagem.condutor.nome}</div>
                  <div className="text-sm text-gray-500">
                    ⭐ {viagem.condutor.avaliacao} • {viagem.condutor.automovel}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-md text-xs ${
                  viagem.situacao === 'Confirmada' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {viagem.lugares ? `${viagem.lugares} assento` : 'Finalizada'}
                </span>
              </div>              
              {viagem.beneficio && (
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg mb-3">
                  <div className="text-sm font-semibold text-emerald-700">Impacto desta viagem:</div>
                  <div className="text-xs text-emerald-600 mt-1">
                    🌱 {viagem.beneficio.co2} kg de CO₂ economizado • 💰 R$ {viagem.beneficio.economia} poupado
                  </div>
                </div>
              )}              
              <div className="flex gap-2">
                {viagem.situacao === 'Confirmada' ? (<>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold">💬 Chat
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold">❌ Cancelar
                    </button>
                  </>
                ) : (
                  <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold">⭐ Avaliar Motorista
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  // Tela de perfil/conta
  const TelaConta = () => (
    <div className="h-full">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-10 text-center">
        <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-3xl text-emerald-600 font-bold">
          👤
        </div>
        <div className="text-2xl font-bold mb-1">Usuário EcoRide</div>
        <div className="flex items-center justify-center gap-2 opacity-90">
          <span>⭐ {meuPerfil.avaliacaoMedia}</span>
          <span>•</span>
          <span>{meuPerfil.viagensFeitas} viagens</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 m-5">
        <div className="bg-white p-5 rounded-2xl text-center shadow-lg">
          <span className="text-3xl font-bold text-emerald-600 block">{meuPerfil.co2Poupado}</span>
          <div className="text-sm text-gray-500 mt-1">kg CO₂ economizado</div>
        </div>
        <div className="bg-white p-5 rounded-2xl text-center shadow-lg">
          <span className="text-3xl font-bold text-emerald-600 block">{meuPerfil.dinheiroPoupado}</span>
          <div className="text-sm text-gray-500 mt-1">Total poupado</div>
        </div>
      </div>
      <div className="mt-5">
        {[
          { icone: '👤', texto: 'Editar Perfil' },
          { icone: '🚗', texto: 'Meus Veículos' },
          { icone: '💳', texto: 'Formas de Pagamento' },
          { icone: '🔔', texto: 'Notificações' },
          { icone: '📊', texto: 'Relatórios de Sustentabilidade' },
          { icone: '⚙️', texto: 'Configurações' },
          { icone: '❓', texto: 'Ajuda e Suporte' },
          { icone: '🚪', texto: 'Sair' }
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center p-5 bg-white mx-4 cursor-pointer hover:bg-gray-50 transition-colors"
            style={{
              marginBottom: '1px',
              borderRadius: index === 0 ? '16px 16px 0 0' : index === 7 ? '0 0 16px 16px' : '0'
            }}>
            <div className="w-6 h-6 mr-4 text-gray-500">{item.icone}</div>
            <div className="flex-1 text-gray-700">{item.texto}</div>
            <div className="text-gray-400">→</div>
          </div>
        ))}
      </div>
    </div>
  )
  // Função para renderizar as telas
  const renderizarTela = () => {
    switch (telaAtual) {
      case 'inicio':
        return <TelaInicio />
      case 'buscar':
        return <TelaBuscar />
      case 'criar':
        return <TelaCriar />
      case 'viagens':
        return <TelaViagens />
      case 'conta':
        return <TelaConta />
      default:
        return <TelaInicio />
    }
  }
  return (
    <div className="max-w-sm mx-auto bg-black rounded-3xl p-2 shadow-2xl">
      <div className="bg-white rounded-3xl overflow-hidden h-screen relative">
        <BarraStatus />        
        {/* Sistema de alertas */}
        {alertas.map(alerta => (
          <ComponenteAlerta key={alerta.id} alerta={alerta} />
        ))}        
        {/* Área principal de conteúdo */}
        <div className="h-full pb-20 overflow-y-auto">
          {renderizarTela()}
        </div>        
        {/* Menu de navegação */}
        <MenuNavegacao />        
        {/* Estilos customizados */}
        <style jsx>{`
          @keyframes entradaAlerta {
            from {
              opacity: 0
              transform: translateX(-50%) translateY(-20px)
            }
            to {
              opacity: 1
              transform: translateX(-50%) translateY(0)
            }
          }          
          @keyframes saidaAlerta {
            from {
              opacity: 1
              transform: translateX(-50%) translateY(0)
            }
            to {
              opacity: 0
              transform: translateX(-50%) translateY(-20px)
            }
          }          
          .animate-entradaAlerta {
            animation: entradaAlerta 0.3s ease-out
          }          
          .animate-saidaAlerta {
            animation: saidaAlerta 0.3s ease-in forwards
          }          
          /* Barra de rolagem personalizada */
          ::-webkit-scrollbar {
            width: 4px
          }          
          ::-webkit-scrollbar-track {
            background: #f1f1f1
            border-radius: 10px
          }          
          ::-webkit-scrollbar-thumb {
            background: #059669
            border-radius: 10px
          }          
          ::-webkit-scrollbar-thumb:hover {
            background: #047857
          }         
          /* Transições suaves para todos os elementos */
          * {
            transition: all 0.2s ease
          }          
          /* Efeitos de interação para botões */
          button:hover {
            transform: translateY(-1px)
            box-shadow: 0 4px 12px rgba(5, 150, 105, 0.15)
          }          
          button:active {
            transform: translateY(0)
          }          
          /* Animação de entrada para cards */
          .card-carona {
            animation: entradaCard 0.3s ease-out
          }          
          @keyframes entradaCard {
            from {
              opacity: 0
              transform: translateY(20px)
            }
            to {
              opacity: 1
              transform: translateY(0)
            }
          }          
          /* Efeito de foco aprimorado para inputs */
          input:focus, select:focus, textarea:focus {
            box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1)
            border-color: #059669
          }          
          /* Responsividade para dispositivos menores */
          @media (max-width: 375px) {
            .max-w-sm {
              max-width: 100%
              margin: 0
              border-radius: 0
              padding: 0
            }
            
            .rounded-3xl {
              border-radius: 0
            }
          }          
          /* Animações de hover para cards */
          .bg-white:hover {
            transform: translateY(-2px)
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15)
          }          
          /* Gradientes animados */
          .bg-gradient-to-br {
            background-size: 200% 200%
            animation: gradienteMovimento 6s ease infinite
          }          
          @keyframes gradienteMovimento {
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
          /* Efeitos de pulse para elementos importantes */
          .animate-pulse {
            animation: pulseCustomizado 2s cubic-bezier(0.4, 0, 0.6, 1) infinite
          }          
          @keyframes pulseCustomizado {
            0%, 100% {
              opacity: 1
            }
            50% {
              opacity: 0.8
            }
          }          
          /* Melhorias visuais para checkboxes */
          input[type="checkbox"] {
            appearance: none
            width: 18px
            height: 18px
            border: 2px solid #d1d5db
            border-radius: 4px
            background-color: white
            cursor: pointer
            position: relative
          }          
          input[type="checkbox"]:checked {
            background-color: #059669
            border-color: #059669
          }          
          input[type="checkbox"]:checked::after {
            content: '✓'
            position: absolute
            top: -2px
            left: 2px
            color: white
            font-size: 12px
            font-weight: bold
          }          
          /* Animações de loading */
          .loading {
            animation: rotacao 2s linear infinite
          }          
          @keyframes rotacao {
            from {
              transform: rotate(0deg)
            }
            to {
              transform: rotate(360deg)
            }
          }
        `}
        </style>
      </div>
    </div>
  )
}
export default EcoRideSystem