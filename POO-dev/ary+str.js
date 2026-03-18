class Carro {
    #placa;

    constructor(placa) {
        this.placa = placa; // Usando o setter para inicializar a placa
    }

    get placa() {
        return this.#placa;
    }

    set placa(str) {
        // Validação simples para verificar se a placa é uma string válida
        const regex = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/; // Exemplo de regex para placas no formato "AAA0A00"
        if (!str || !regex.test(str)) {
            console.log('Erros, placa errada');
        } else {
            this.#placa = str; // Definindo a placa
        }
    }
}

// Exemplo de uso
const carro = new Carro('RAE4B63');
console.log(carro.placa); // Saída: RAE4B63