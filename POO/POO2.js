// orientacao a objetos
// tentando sozinho, sem consulta nem cola

// exemplo de carro
// placa RAE4B63
// class Proprietario{
//     #nome_completo;
//     #cpf = 0
//     #placa;
//     constructor(nome_completo, cpf, placa){
//         this.nome_completo = nome_completo
//         this.cpf = cpf
//         this.placa = placa
//     }
//     get nome_completo(){
//         return this.#nome_completo
//     }
//     set nome_completo(string){
//         if(!placa){
//             console.log('Proprietario errado')
//         }else{
//             this.#nome_completo +=valor1
//         }
//     }
// }
class Carro{
    #velocidade = 0
    #preco = 0 
    #ano = 0
    #placa;
    constructor(marca, modelo, cor, preco, ano, placa){
        this.marca = marca
        this.modelo = modelo
        this.cor =cor
        this.preco = preco
        this.ano = ano
        this.placa = placa
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
        console.log(`O carro de 
            marca ${this.marca}, 
            modelo ${this.modelo}, 
            cor ${this.cor} é do 
            ano ${this.ano} com 
            preço de ${this.preco}mil
            placa: ${this.placa}
            multa: 
            `)
    }
    get velocidade(){
        return this.#velocidade
    }
    set velocidade(valor1){
        if(valor1<0){
            console.log('Erros, ñ pode ser menor que 0')
        }else{
            this.#velocidade +=valor1
        }
    }
    get preco(){
        return this.#preco
    }
    set preco(valor2){
        if(valor2<0){
            console.log('Erros, ñ pode ser menor que 0')
        }else{
            this.#preco +=valor2
        }
    }
    get ano(){
        return this.#ano
    }
    set ano(valor3){
        if(valor3<0){
            console.log('Erros, ñ pode ser menor que 0')
        }else{
            this.#ano +=valor3
        }
    }
    get placa(){
        return this.#placa
    }
    set placa(str) {
        const regex = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/
        if (!str || !regex.test(str)) {
            console.log('Colocar placa corretamente')
        } else {
            this.#placa = str
        }
    }
    
}

class Camionete extends Carro{
    constructor(marca, modelo, cor, preco, ano, carroceria, placa){
        super(marca, modelo, cor, preco, ano, placa)
        this.carroceria = carroceria
    }
    acelerar(){
        this.velocidade = 70
        console.log('vruuuuum')
    }
    freiar(){
        this.velocidade = -30
        console.log('stuuuuuu')
    }
    apresentar(){
        console.log(`Aviso de multa
            marca: ${this.marca}, 
            modelo: ${this.modelo}, 
            cor: ${this.cor},
            preço: ${this.preco}k,
            ano: ${this.ano}, 
            carroceria: ${this.carroceria}
            placa: ${this.placa}
            `)
    }   
}
const camionete = new Camionete('volkswagen', 'saveiro', 'branca', 70, 2021, 'aberta s/lona','REB1I82' )
camionete.apresentar()

