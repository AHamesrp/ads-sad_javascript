const aluno = {
nome: "Arthur",
idade: 16,
curso: "Sistemas",
apresentacao() {
    console.log(`Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e curso ${this.curso}.`);
}
};
aluno.apresentacao();
  