import React from 'react';

// Primeiro Componente - Artigo sobre Tecnologia
const PrimeiroComponente = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', margin: '20px' }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>
        Inteligência Artificial: Transformando o Futuro da Tecnologia
      </h1>
      <img
        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop" 
        alt="Inteligência Artificial" 
        style={{width:'100%', maxWidth:'400px', height:'250px', objectFit:'cover', borderRadius:'8px'}}
      />
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666', marginTop: '15px' }}>
        A inteligência artificial está revolucionando diversos setores da economia e da sociedade. 
        Desde assistentes virtuais até sistemas de diagnóstico médico, a IA tem se mostrado uma 
        ferramenta poderosa para automatizar processos, analisar grandes volumes de dados e 
        auxiliar na tomada de decisões complexas.
      </p>
    </div>
  )
}
// Segundo Componente - Interpolação de Variáveis
const SegundoComponente = () => {
  // 3 variáveis JavaScript
  const nomeUsuario = "Arthur Hames"
  const idade = 17
  const profissao = "Backend"
  
  // Objeto com 4 propriedades
  const dadosProjeto = {
    nome: "Agent SDR",
    tecnologia: "Workflows, API e Database",
    prazo: "5 meses"
  }
  return (
    <div style={{ padding: '20px', backgroundColor: '#e8f4f8', margin: '20px' }}>
      <h2 style={{ color: '#333', marginBottom: '15px' }}>
        Perfil do Desenvolvedor
      </h2>
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
        Olá! Meu nome é 
        <strong style={{ color: '#0066cc' }}>{nomeUsuario}</strong> 
        e tenho{' '} 
        <strong style={{ color: '#00aa44' }}>{idade} anos</strong>. 
        Trabalho com{' '} 
        <strong style={{ color: '#8a2be2' }}>{profissao}</strong> 
        e atualmente estou desenvolvendo o projeto 
        <strong style={{ color: '#ff6600' }}>"{dadosProjeto.nome}"</strong>{' '} 
        utilizando 
        <strong style={{ color: '#cc0000' }}>{dadosProjeto.tecnologia}</strong>. 
        Este projeto tem um prazo de entrega de 
        <strong>{dadosProjeto.prazo}</strong> 
        e está sendo desenvolvido por mim.
      </p>
    </div>
  )
}
// Componente principal que renderiza ambos os componentes
export default function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f0f0', padding: '20px' }}>
      <PrimeiroComponente />
      <SegundoComponente />
    </div>
  )
}