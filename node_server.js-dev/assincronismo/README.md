callback - promises - async await

assincronismo
singlethread (executa uma vez por vez) (node)
multithread (varias operações ao mesmo tempo)

callback, vai ser executada depois de uma função assincrona for concluida

async callback (req, res)=>{}
readFile (err, data)=>{}
promises(evitar callback hell) (forma de organizar callbacks) (ela retorna 3 estados do objetos (pendente, rejeitado, aprovado)
(quando deu certo obj.then(), quando deu errado obj.catch()

async await (evitar then e catch)
async function (){
try{
    await function (espero a função me retornar)
    *faz alguma coisa*
  }catch{
  }
}

outro exemplo 

try{
    await readFile
    console.log('')
  }catch{}
}