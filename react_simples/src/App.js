import React from 'react'

const PrimeiroComponente = () => {
  return (
    <div>
      <h1>
        Inteligência Artificial: Transformando o Futuro da Tecnologia
      </h1>
      <img 
        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop" 
        alt="Inteligência Artificial" 
      />
      <p>
        A inteligência artificial está revolucionando diversos setores da economia e da sociedade. 
        Desde assistentes virtuais até sistemas de diagnóstico médico, a IA tem se mostrado uma 
        ferramenta poderosa para automatizar processos, analisar grandes volumes de dados e 
        auxiliar na tomada de decisões complexas.
      </p>
    </div>
  )
}
const SegundoComponente = () => {
  const nomeUsuario = "Arthur Hames"
  const idade = 17
  const profissao = "Backend"
  
  const dadosProjeto = {
    nome: "React",
    tecnologia: "React e Js",
    prazo: "1 mes"
  }
  return (
    <div>
      <h2>
        Perfil do Desenvolvedor
      </h2>
      <p>
        Olá! Meu nome é {nomeUsuario} e tenho{' '} {idade} anos. Trabalho com{' '}m 
        {profissao} e atualmente estou desenvolvendo o projeto {dadosProjeto.nome}{' '}
        utilizando {dadosProjeto.tecnologia}. Este projeto tem um prazo de entrega de 
        {dadosProjeto.prazo} e está sendo desenvolvido por mim.
      </p>
    </div>
  )
}
//Componente que roda ambos os componentes
export default function App() {
  return (
    <div>
      <PrimeiroComponente />
      <SegundoComponente />
    </div>
  )
}