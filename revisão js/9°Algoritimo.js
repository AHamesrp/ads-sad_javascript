/*
Carlos está definindo suas metas para a semana. Crie um array inicialmente vazio chamado metasSemana.
Adicione três metas à lista. Verifique se a segunda meta é "exercício físico". Se não for, 
modifique-a para "praticar esportes". Imprima a lista de metas semanais no final.

Dicas: Empurrar em inglês - If
*/

let metasSemana = [];
function adicionarMeta(meta) {
    metasSemana.push(meta);
}
adicionarMeta("ler um livro");
adicionarMeta("exercício físico");
adicionarMeta("aprender programação");
if (metasSemana[1] !== "exercício físico") {
    metasSemana[1] = "praticar esportes";
}
console.log("Metas Semanais:", metasSemana);
