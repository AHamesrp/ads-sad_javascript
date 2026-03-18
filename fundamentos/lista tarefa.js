// Array para armazenar as tarefas
let tarefas = [];

// Função para adicionar uma nova tarefa
function adicionarTarefa(descricao) {
    const tarefa = {
        descricao: descricao,
        concluida: false
    };
    tarefas.push(tarefa);
    console.log(`Tarefa "${descricao}" adicionada com sucesso!`);
}

// Função para listar todas as tarefas
function listarTarefas() {
    console.log("Lista de Tarefas:");
    tarefas.forEach((tarefa, indice) => {
        const status = tarefa.concluida ? "Concluída" : "Pendente";
        console.log(`${indice + 1}. ${tarefa.descricao} - ${status}`);
    });
}

// Função para remover uma tarefa específica
function removerTarefa(indice) {
    if (indice >= 0 && indice < tarefas.length) {
        const tarefaRemovida = tarefas.splice(indice, 1);
        console.log(`Tarefa "${tarefaRemovida[0].descricao}" removida com sucesso!`);
    } else {
        console.log("Índice inválido. Nenhuma tarefa removida.");
    }
}

// Função para marcar uma tarefa como concluída
function concluirTarefa(indice) {
    if (indice >= 0 && indice < tarefas.length) {
        tarefas[indice].concluida = true;
        console.log(`Tarefa "${tarefas[indice].descricao}" marcada como concluída!`);
    } else {
        console.log("Índice inválido. Nenhuma tarefa marcada como concluída.");
    }
}

adicionarTarefa("Estudar JavaScript");
adicionarTarefa("Estudar PHP");
listarTarefas();
concluirTarefa(0);
listarTarefas();
removerTarefa(0);
listarTarefas();
