class Loja{
    constructor(){
        this.observadores =[]
    }
    addObservador(pessoa){
        this.observadores.push(pessoa)
    }
    notificacao(msg){
        this.observadores.forEach(obs => obs.atualizar(msg))
    }
}
class Pessoa{
    constructor(nome){
        this.nome = nome
    }
    atualizar(msg){
        console.log(`${this.nome } recebeu atualizacao da loja`, msg)
    }
}
const loja1 = new Loja()
const pessoa1 = new Pessoa('arthur')
loja1.addObservador(pessoa1)
const pessoa2 = new Pessoa('hames')
loja1.notificacao('notificacao test')
