// class Burguer{
//     constructor(pao, carne, queijo, salada, molho){
//         this.pao = pao
//         this.carne = carne
//         this.queijo = queijo
//         this.salada = salada
//         this.molho = molho
//     }
//     descricao(){
//         return `voce pediu um hamburger de ${this.pao}, ${this.carne}`
//     }
// }
// const hamburger1 = new Burguer('trigo', 'patinho', 'mussarela', true, 'maionese')
// console.log(hamburger1.descricao())

class BurguerBuilder{
    #pao 
    #carne 
    #queijo 
    #salada 
    #molho
    #bacon
    #qtd_carnes
    constructor(){
        this.#pao = 'tradicional',
        this.#carne = 'bovina',
        this.#queijo = 'mussarela',
        this.#salada = false,
        this.#molho = null,
        this.#bacon = false,
        this.#qtd_carnes = 1
    }
    set pao(novo_pao){
        this.#pao = novo_pao
        return this
    }
    set carne(nova_carne){
        this.#carne = nova_carne
        return this
    }
    set queijo(novo_queijo){
        this.#queijo = novo_queijo
        return this
    }
    set salada(salada){
        // inversor de estado, salada começa false ent é vdd
        // salada comça vdd ent é falsa
        this.#salada = this.#salada ? false:true
        return this
    }
    set molho(novo_molho){
        this.#molho = novo_molho
        return this
    }
    set bacon(bacon){
        // inversor de estado, bacon começa false ent é vdd
        // bacon começa vdd ent é falsa
        this.#bacon = this.#bacon ? false:true
        return this
    }
    get burguer(){
        return `hamburguer de carne ${this.carne} no pao ${this.pao}`
    }
}
const hamburger2 = new BurguerBuilder()
hamburger2.pao = 'trigo'
hamburger2.carne = 'bovina'
console.log(hamburger2)