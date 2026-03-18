// orientacao a objetos
// tentando sozinho, sem consulta nem cola

// exemplo de carro
class Carro{
    #velocidade
    #preco
    #ano
    constructor(marca, modelo, cor, preco, ano){
        this.marca = marca
        this.modelo = modelo
        this.cor =cor
        this.preco = preco
        this.ano = ano
    }
    acelerar(){
        this.#velocidade = 10
        console.log('niauu')
    }
    freiar(){
        this.#velocidade = -6
        console.log('niiii')
    }
    apresentar(){
        console.log(`O carro de marca ${this.marca}, modelo ${this.modelo}, cor ${this.cor} é do ano ${this.ano} com preço de ${this.preco}`)
    }
}
//let carro1 = new Carro('x', 'x', 'x', 0, 0)
//console.log(carro1)

class Argo extends Carro{
    constructor(marca, modelo, cor, preco, ano, passageiros){
        super(marca, modelo, cor, preco, ano)
        this.passageiros = passageiros

        // quando eu herdar uma class, copio o constructor com a nova carcateristica
        // adiciono o super com as mesmas carcateristicas da class que vou herdar
    }
}
// let carro2 = new Argo('fiat', 'argo', 'prata', 60, 2020, 4)
// console.log(carro2)

class Saveiro extends Carro{
    constructor(marca, modelo, cor, preco, ano, carroceria){
        super(marca, modelo, cor, preco, ano)
        this.carroceria = carroceria
    }
    
}
// let carro2 = new Saveiro('volks', 'saveiro', 'branca', 100, 2021, 'sim')
// console.log(carro2)