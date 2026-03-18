const dataAtual = new Date();
const dataNascimento = new Date("2007-10-02");
let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
const mesAtual = dataAtual.getMonth();
const mesNascimento = dataNascimento.getMonth();

if (mesAtual < mesNascimento || (mesAtual === mesNascimento && dataAtual.getDate() < dataNascimento.getDate())) {
  idade--;
}

console.log("Idade:", idade);
