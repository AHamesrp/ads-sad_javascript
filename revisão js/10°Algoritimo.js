/*
 Crie um vetor de 10 números e peça para o usuário qual número ele deseja verificar se existe no vetor. 
 Caso exista, o programa deve mostrar todos os índices que ele se encontra.

 Dicas: Use dois vetores - Use um laços de repetição
*/

let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let numeroParaVerificar = parseInt(prompt("Digite o número que deseja verificar no vetor:"));
let indices = [];
for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] === numeroParaVerificar) {
        indices.push(i);
    }
}
if (indices.length > 0) {
    console.log(`O número ${numeroParaVerificar} foi encontrado nos índices: ${indices.join(', ')}`);
} else {
    console.log(`O número ${numeroParaVerificar} não foi encontrado no vetor.`);
}
