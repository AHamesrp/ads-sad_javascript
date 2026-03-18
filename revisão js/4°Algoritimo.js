/*
Ana está organizando suas tarefas diárias. 
Crie um array inicialmente vazio chamado 'tarefas'. Solicite a Ana para adicionar três tarefas à lista.
Remova a segunda tarefa da lista e, em seguida, adicione "ligar para o médico" ao final da lista. 
Imprima a lista de tarefas atualizada no final.
*/

let tarefas = [];
function adicionarTarefa(tarefa) {
    tarefas.push(tarefa);
}
for (let i = 0; i < 3; i++) {
    let tarefa = prompt("Adicione uma tarefa à lista:");
    adicionarTarefa(tarefa);
}
tarefas.splice(1, 1);
adicionarTarefa("ligar para o médico");
console.log("Lista de tarefas:", tarefas);
