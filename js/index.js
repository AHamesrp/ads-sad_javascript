// Definição das "estruturas"
class Passageiro {
    constructor() {
        this.nome = "";
        this.documento = "";
        this.statusEmbarque = false;
        this.bagagemRegistrada = false;
    }
}

class Voo {
    constructor(numero, destino, horario, capacidade) {
        this.numero = numero;
        this.destino = destino;
        this.horario = horario;
        this.capacidade = capacidade;
        this.quantidadeEmbarcados = 0;
    }
}

class Bagagem {
    constructor() {
        this.peso = 0.0;
        this.tipo = "";
        this.autorizada = false;
    }
}

// Variáveis principais
const passageiros = [];
const voos = [
    new Voo("GOL123", "São Paulo", "14:30", 5),
    new Voo("AZU456", "Rio de Janeiro", "16:00", 7),
    new Voo("LAT789", "Brasília", "18:45", 6)
];
const bagagens = [];
let quantPassageiros = 0;

// Funções principais
function cadastrarPassageiro() {
    if (quantPassageiros >= 10) {
        console.log("Limite de passageiros atingido.\n");
        return -1;
    }

    const passageiro = new Passageiro();
    const bagagem = new Bagagem();

    const nome = prompt("Digite o nome do passageiro:");
    const documento = prompt("Digite o documento do passageiro:");

    passageiro.nome = nome;
    passageiro.documento = documento;

    passageiros.push(passageiro);
    bagagens.push(bagagem);

    quantPassageiros++;

    console.log("Passageiro cadastrado com sucesso!\n");
    return quantPassageiros;
}

function consultarVoosDisponiveis() {
    console.log("\nVoos disponíveis:");
    voos.forEach((voo, index) => {
        console.log(`${index + 1} - Número: ${voo.numero} | Destino: ${voo.destino} | Horário: ${voo.horario}`);
    });
}

function verificarBagagem(peso, tipo) {
    return peso <= 30 && (tipo === "mala" || tipo === "mochila");
}

function realizarEmbarque(indPassageiro, indVoo) {
    if (indPassageiro < 1 || indPassageiro > quantPassageiros) {
        console.log("Passageiro inválido.\n");
        return;
    }

    if (indVoo < 1 || indVoo > voos.length) {
        console.log("Voo inválido.\n");
        return;
    }

    const passageiro = passageiros[indPassageiro - 1];
    const voo = voos[indVoo - 1];

    if (passageiro.statusEmbarque) {
        console.log("Passageiro já embarcou.\n");
        return;
    }

    if (voo.quantidadeEmbarcados >= voo.capacidade) {
        console.log("Voo cheio, embarque não permitido.\n");
        return;
    }

    passageiro.statusEmbarque = true;
    voo.quantidadeEmbarcados++;

    console.log("Embarque realizado com sucesso!\n");
}

function emitirBilhete(indPassageiro, indVoo) {
    if (indPassageiro < 1 || indPassageiro > quantPassageiros) {
        console.log("Passageiro inválido.\n");
        return;
    }

    if (indVoo < 1 || indVoo > voos.length) {
        console.log("Voo inválido.\n");
        return;
    }

    const passageiro = passageiros[indPassageiro - 1];
    const voo = voos[indVoo - 1];

    console.log("\n------ Bilhete ------");
    console.log(`Passageiro: ${passageiro.nome}`);
    console.log(`Documento: ${passageiro.documento}`);
    console.log(`Status Embarque: ${passageiro.statusEmbarque ? "Embarcado" : "Não embarcado"}`);
    console.log(`Voo: ${voo.numero}`);
    console.log(`Destino: ${voo.destino}`);
    console.log(`Horário: ${voo.horario}`);
    console.log("--------------------\n");
}

function encerrarSistema() {
    console.log("Encerrando o sistema. Até logo!\n");
}

// Menu interativo usando prompt-sync
const prompt = require('prompt-sync')();

function principal() {
    let opcao = 0;

    while (opcao !== 6) {
        console.log("\n=== Menu ===");
        console.log("1 - Cadastrar Passageiro");
        console.log("2 - Consultar Voos Disponíveis");
        console.log("3 - Registrar Bagagem");
        console.log("4 - Realizar Embarque");
        console.log("5 - Emitir Bilhete");
        console.log("6 - Encerrar Sistema");

        opcao = parseInt(prompt("Escolha uma opção: "));

        switch (opcao) {
            case 1:
                cadastrarPassageiro();
                break;

            case 2:
                consultarVoosDisponiveis();
                break;

            case 3:
                if (quantPassageiros === 0) {
                    console.log("Nenhum passageiro cadastrado.\n");
                } else {
                    const indPassageiro = parseInt(prompt(`Informe o índice do passageiro (1 a ${quantPassageiros}): `));
                    if (indPassageiro < 1 || indPassageiro > quantPassageiros) {
                        console.log("Passageiro inválido.\n");
                    } else {
                        const peso = parseFloat(prompt("Informe o peso da bagagem (kg): "));
                        const tipo = prompt("Informe o tipo da bagagem (mala/mochila): ");

                        const bagagem = bagagens[indPassageiro - 1];
                        bagagem.peso = peso;
                        bagagem.tipo = tipo;
                        bagagem.autorizada = verificarBagagem(peso, tipo);

                        const passageiro = passageiros[indPassageiro - 1];
                        passageiro.bagagemRegistrada = bagagem.autorizada;

                        if (bagagem.autorizada) {
                            console.log("Bagagem autorizada!\n");
                        } else {
                            console.log("Bagagem NÃO autorizada.\n");
                        }
                    }
                }
                break;

            case 4:
                if (quantPassageiros === 0) {
                    console.log("Nenhum passageiro cadastrado.\n");
                } else {
                    const indPassageiro = parseInt(prompt(`Informe o índice do passageiro (1 a ${quantPassageiros}): `));
                    consultarVoosDisponiveis();
                    const indVoo = parseInt(prompt("Informe o índice do voo (1 a 3): "));
                    realizarEmbarque(indPassageiro, indVoo);
                }
                break;

            case 5:
                if (quantPassageiros === 0) {
                    console.log("Nenhum passageiro cadastrado.\n");
                } else {
                    const indPassageiro = parseInt(prompt(`Informe o índice do passageiro (1 a ${quantPassageiros}): `));
                    consultarVoosDisponiveis();
                    const indVoo = parseInt(prompt("Informe o índice do voo (1 a 3): "));
                    emitirBilhete(indPassageiro, indVoo);
                }
                break;

            case 6:
                encerrarSistema();
                break;

            default:
                console.log("Opção inválida.\n");
        }
    }
}

principal();
