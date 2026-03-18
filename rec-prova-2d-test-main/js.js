class Personagem {
    constructor(nome, vida, ataque) {
        this.nome = nome;
        this.vida = vida;
        this.ataque = ataque;
    }

    atacar(oponente) {
        console.log(`${this.nome} ataca ${oponente.nome}, causando ${this.ataque} de dano.`);
        oponente.receberDano(this.ataque);
    }

    receberDano(dano) {
        this.vida -= dano;
        if (this.vida <= 0) {
            console.log(`${this.nome} foi derrotado!`);
        }
    }
}

class Guerreiro extends Personagem {
    constructor(nome) {
        super(nome, 120, 15);
    }

    atacar(oponente) {
        console.log(`${this.nome} golpeia com sua espada ${oponente.nome}, causando ${this.ataque + 5} de dano.`);
        oponente.receberDano(this.ataque + 5);
    }
}

class Mago extends Personagem {
    constructor(nome) {
        super(nome, 80, 20);
    }

    atacar(oponente) {
        console.log(`${this.nome} lança um feitiço contra ${oponente.nome}, causando ${this.ataque + 3} de dano.`);
        oponente.receberDano(this.ataque + 3);
    }
}

class Jogo {
    constructor() {
        this.personagens = [];
    }

    adicionarPersonagem(personagem) {
        this.personagens.push(personagem);
    }

    iniciarBatalha() {
        this.personagens.forEach(personagem => {
            let oponente = this.personagens.find(p => p !== personagem && p.vida > 0);
            if (oponente) {
                personagem.atacar(oponente);
            }
        });
    }
}

class Combate {
    static batalhar(p1, p2) {
        console.log(`Batalha entre ${p1.nome} e ${p2.nome}!`);
        while (p1.vida > 0 && p2.vida > 0) {
            p1.atacar(p2);
            if (p2.vida > 0) {
                p2.atacar(p1);
            }
        }
    }
}

class Turno {
    static iniciarTurno(personagens) {
        personagens.forEach(personagem => {
            let acao = Math.random();
            let oponente = personagens.find(p => p !== personagem && p.vida > 0);
            if (acao < 0.5 && oponente) {
                personagem.atacar(oponente);
            } else {
                console.log(`${personagem.nome} se defende!`);
            }
        });
    }
}

// Exemplo de uso
let guerreiro = new Guerreiro("Arthur");
let mago = new Mago("Gandalf");

let jogo = new Jogo();
jogo.adicionarPersonagem(guerreiro);
jogo.adicionarPersonagem(mago);

console.log("Iniciando batalha:");
Combate.batalhar(guerreiro, mago);
