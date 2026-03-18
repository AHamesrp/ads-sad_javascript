servidores - backend - api

protocolo//host:porta/recurso?variaveis
localhost:8000/xxxxxx

método{get, post, put, patch, delete, head, options}

get {header -> url, não usa body}
post{header, body}
put{}
delete{}

get -> pegar info
post -> cria info
put -> atualiza (tudo) info
patch -> atualiza (umam ou poucas) info
delete -> deleta info

- cliente - servidor
- uso dos metodos http - get, post, put, patch, delete
- nomeclatura de rotas
- correta utilização de códigos de status - 100-199, 200-299, 300-399, 400-499, 500-599

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

git, npm, assincronismo, design patterns, api rest/restful

git{
  git clone (clona o repositorio nuvem para o local)
  git pull (puxa de outra branch para a minha branch)
  git restore --staged . (ou nome do arq) processo inverso de staging
}

design patterns (associado a POO)
(solução para erro em POO)
-criação, estrutura, relação de um obj com outro
(criacionais(singleton), estruturais(adapter), relacionais(observer))- (estudar o conceito básico, olhar 1 ex de cada um /cod)

npm (node package modules) - gerenciador de pacotes
o que é um pacote no node?, quando eu inicalizo um package.json eu inicializo um pacote (ex de pacote: servidor)

npm init -y (inicializa/cria um pacote)
npm install express (instalar modulo de nivel 3)

3 niveis de modulos
(o que ta pronto pra uso, os internos do node q precisa declarar e externo q precisa instalar e declarar)

node_modules (git ignore + nome do arq)

modulo (math matematica) ex math.random

versionamento (0.0.1) - (major(mudança grande), minor(mudança pequena), bugfix/patch(correção de erros))

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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

./arq q ta na mesma pasta
../arq q ta em outra pasta(sai da pasta)