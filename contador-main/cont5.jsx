import React, { useState } from 'react'

function Contador() {
  const [cliques, setCliques] = useState(0)
  const handleClick = () => {
    setCliques(cliques + 1)
  }
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Contador de Cliques</h1>
      <button
        onClick={handleClick}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Clique aqui
      </button>
      <p style={{ fontSize: '18px' }}>Cliques: {cliques}</p>
      {cliques === 5 && (
        <p style={{ marginTop: '20px', fontSize: '18px', color: 'green' }}>
          Parabéns, você clicou 5 vezes!
        </p>
      )}
    </div>
  )
}
export default Contador