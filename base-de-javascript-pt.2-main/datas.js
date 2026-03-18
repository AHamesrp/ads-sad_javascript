const primeiroDiaDoAno = new Date(new Date().getFullYear(), 0, 1);
const hoje = new Date();

const diferencaEmMilissegundos = hoje - primeiroDiaDoAno;
const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
console.log("Diferença em dias:", diferencaEmDias);

const dia = hoje.getDate();
const mes = hoje.getMonth() + 1; // Lembrando que o mês é indexado em zero
const ano = hoje.getFullYear();
const dataFormatada = `${dia}/${mes}/${ano}`;
console.log("Data formatada:", dataFormatada);
