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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

npm (node package modules) - gerenciador de pacotes
o que é um pacote no node?, quando eu inicalizo um package.json eu inicializo um pacote (ex de pacote: servidor)

npm init -y (inicializa/cria um pacote)
npm install express (instalar modulo de nivel 3)

3 niveis de modulos
(o que ta pronto pra uso, os internos do node q precisa declarar e externo q precisa instalar e declarar)

node_modules (git ignore + nome do arq)

modulo (math matematica) ex math.random

versionamento (0.0.1) - (major(mudança grande), minor(mudança pequena), bugfix/patch(correção de erros))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

./arq q ta na mesma pasta
../arq q ta em outra pasta(sai da pasta)