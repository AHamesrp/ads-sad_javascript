import React, { useState } from 'react'

const Contador = () => {
  const [contador, setContador] = useState(0)
  const handleClick = (evento) => {
    console.log("Evento de Clique Ativado!", evento)
    setContador(contador + 1)
  }
  return (
    <div>
      <p>Você clicou {contador} {contador === 1 ? 'vez' : 'vezes'}!</p>
      <button onClick={handleClick}>Clique aqui</button>
    </div>
  )
}
export default Contador