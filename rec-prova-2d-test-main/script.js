class Personagem{
    #vida
    #forca
    #mana
    constructor(vida, forca, mana){
        this.#vida = vida
        this.#forca = forca
        this.#mana = mana
    }
    atacar(){
        this.atacar = atacar
        console.log('atcaaaaaarrr')
    }
    defender(){
        this.defender = defender
        console.log('aguente firmee')
    }
    usarMagia(){
        this.usarMagia = feitico
        console.log('pshhhhi (enfeiticando)')
    }
    get vida(){
        return this.#vida
    }
    set vida(valor){
        this.#vida = valor
    }
    get forca(){
        return this.#forca
    }
    set forca(valor){
        this.#forca = valor
    }
    get mana(){
        return this.#mana
    }
    set mana(valor){
        this.#mana = valor
    }  
}
class Guerreiro extends Personagem{
    #espada
    constructor(vida, forca, mana, espada){
        super(vida, forca, mana)
        this.#espada = 50 //espada tira 50 de vida e 50 de forca
        this.forca = this.#espada
        this.vida = 150
        this.mana = 0
    }
    atacar(){
        this.#espada = golpear
        console.log('tchin thinchin')
    }
    get espada(){
        return this.#espada
    }
    set espada(valor){
        this.#espada = valor
    }
}
class Mago extends Personagem{
    #pocao
    constructor(vida, forca, mana, pocao){
        super(vida, forca, mana)
        this.#pocao = 100 //pocao tira 100 de vida e 100 de forca
        this.forca = this.#pocao
        this.vida = 200
        this.mana = this.#pocao
    }
    atacar(){
        this.pocao = lancar
        console.log('psssshhhiuuu ppaaaa')
    }
    get pocao(){
        return this.#pocao
    }
    set pocao(valor){
        this.#pocao = valor
    }
}
class Arqueiro extends Personagem{
    #arco_flecha
    constructor(vida, forca, mana, arco_flecha){
        super(vida, forca, mana)
        this.#arco_flecha = 100 //arco_flecha tira 100 de vida e 100 de forca
        this.forca = this.#arco_flecha
        this.vida = 100
        this.mana = this.#arco_flecha +=15
    }
    atacar(){
        this.arco_flecha = atirar
        console.log('mirar, apontar, atirar')
    }
    get arco_flecha(){
        return this.#arco_flecha
    }
    set arco_flecha(valor){
        this.#arco_flecha = valor
    }
    
}
function batalhar(p1, p2, p3){
    //p1 =150 vd 50 dano
    //p2 =200 vd 100 dano
    //p3 =100 vd 100 dano
    switch(p1, p2, p3){
        case 'p1 x p2':
            return p2(this.vida =50)
        case 'p1 x p3':
            return p1(this.vida =50)
        case 'p2 x p3':
            return p2(this.vida =100)
        default:
            if(p1(this.vida)||p2(this.vida)||p3(this.vida) > this.vida ==50){
                console.log(`este personagem ${aa} ganhou`)
            } 
    }
}

const p1 = new Guerreiro()
console.log(p1)
const p2 = new Mago()
console.log(p2)
const p3 = new Arqueiro()
console.log(p3)