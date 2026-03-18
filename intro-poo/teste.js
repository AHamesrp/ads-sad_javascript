/*
class Pessoa{
    constructor(nome, sobrenome, idade, cpf){
        this.nome =nome;
        this.sobrenome =sobrenome;
        this.idade =idade;
        this.cpf =cpf
    }
}
let pessoa1 = new Pessoa('arthur', 'hames', 17, 12345678900)
//console.log(pessoa1)
let pessoa2 = new Pessoa('leticia', 'loch', 16, 12345678900)
//console.log(pessoa2)
*/

/*
class Aluno extends Pessoa{
    constructor(nome, sobrenome, idade, cpf, turma){
        super(nome, sobrenome, idade, cpf)
        this.turma =turma
    }
}
let aluno = new Aluno('arthur', 'hames', 17, 12345678900, '3c')
*/

/*
class Veiculo{
    constructor(tipo, modelo, cor, velocidade, passageiros){
        this.tipo = tipo;
        this.modelo = modelo;
        this.cor = cor;
        this.velocidade = velocidade;
        this.passageiros = passageiros;

    }
    acelerar(){
        this.velocidade +=10
        console.log('vruuuum')
    }
    freiar(){
        this.velocidade -=5
        console.log('niiiiiiii')
    }
    apresentar(){
        console.log(`O ${this.tipo} de marca ${this.modelo} esta a ${this.velocidade} km/h`)
    }

}
let Veiculo1 =new Veiculo('caminhao', 'scania R420', 'branco perola', 0, 0)
let Veiculo2 =new Veiculo('moto', 'honda 7galo', 'vermelha', 0, 0)
Veiculo1.apresentar()
Veiculo2.apresentar()
Veiculo1.acelerar()
Veiculo2.acelerar()
Veiculo1.apresentar()
Veiculo2.apresentar()
Veiculo1.freiar()
Veiculo2.freiar()
Veiculo1.apresentar()
Veiculo2.apresentar()
*/

//carro, barco, aviao
class Veiculo{
    #velocidade
    constructor(tipo, modelo, cor, velocidade, passageiros){
        this.tipo = tipo;
        this.modelo = modelo;
        this.cor = cor;
        this.#velocidade = velocidade;
        this.passageiros = passageiros;
    }
    acelerar(){
        this.#velocidade =10
        console.log('vruuuum')
    }
    freiar(){
        this.#velocidade -=5
        console.log('niiiiiiii')
    }
    apresentar(){
        console.log(`O ${this.tipo} de marca ${this.modelo} esta a ${this.velocidade} km/h`)
    }
    get velocidade(){
        return this.#velocidade
    }
    set velocidade(valor){
        if(valor<0){
            console.log('ERRO, o valor nao pode ser menor que 0')
        }else{
            this.#velocidade +=valor
        }
    }
}

class Carro extends Veiculo{
    constructor(tipo, modelo, cor, velocidade, passageiros, rodas){
        super(tipo, modelo, cor, velocidade, passageiros)
        this.rodas =rodas
    }
    acelerar(){
        this.velocidade =10
        console.log('vruuuum')
    }
    freiar(){
        this.velocidade -=5
        console.log('niiiiiiii')
    }
}
let carro = new Carro("ford", "ranger antiga", "azul", 0, 2, 4)

class Barco extends Veiculo{
    constructor(tipo, modelo, cor, velocidade, passageiros, helices, casco){
        super(tipo, modelo, cor, velocidade, passageiros)
        this.helices =helices
        this.casco =casco
    }
    acelerar(){
        this.velocidade =1
        console.log('haaaaaannnnn')
    }
    freiar(){
        this.velocidade -=3
        console.log('~sem som~')
    }
}
let barco = new Barco("lancha", "yamaha", "branco", 60, 20, 2, 1, 1)

class Aviao extends Veiculo{
    constructor(tipo, modelo, cor, velocidade, passageiros, asas){
        super(tipo, modelo, cor, velocidade, passageiros)
        this.asas =asas
    }
    acelerar(){
        this.velocidade =40
        console.log('zuuuuuuuuu')
    }
    freiar(){
        this.velocidade -=60
        console.log('tchiuuu')
    }
}
let aviao = new Aviao("delta", "22", "cinza", 450, 2, 6)