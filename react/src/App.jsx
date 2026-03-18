import Titulo from "./Titulo"
import Teste from "./Teste"

function App(){
  return( 
    <div>
      <Titulo />
      <Teste nome="Pikachu do Ash" idade={19}/>
      <Titulo />
      <Teste />
     </div>
  )
}

export default App