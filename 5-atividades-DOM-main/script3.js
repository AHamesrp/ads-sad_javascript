document.getElementById('bt_tarefa').addEventListener('click', addTarefa)


//inicializar lista vazia
//verifcar se existe uma lista no locastorage
let listaTarefas = JSON.parse(localStorage.getItem('tarefas')) || []

//fazer um laço for pra cada tarefa, chamar a função addTarefa
listaTarefas.forEach(element => {
    criarElemento(element)
});

function addTarefa() {
    //pegar o valor de dentro do input e armazenar em uma variavel
    const inputTarefa = document.getElementById('input_Tarefa').value
    
    //verificar o valor do input e dar um alert se estiver vazio
    if(!inputTarefa){
        alert('O input está vazio!')
    }
    //nao permitir duas tarefas iguais
    if(listaTarefas.includes(inputTarefa)){
        alert('Este input já foi adicionado!')
        return;
    }
   
    //add tarefa no array tarefas
    listaTarefas.push(inputTarefa)

    //transforma o array em string e coloca a lista de tarefas no localStorage
    localStorage.setItem('tarefas', JSON.stringify(listaTarefas))

    criarElemento(inputTarefa)
}

function criarElemento(inputTarefa){
    //limpar escrita no input
    document.getElementById('input_Tarefa').value = ""
    
    //criar um elemento <LI>
    const elemento_tarefa = document.createElement('li')
    elemento_tarefa.className = 'item_tarefa'
    
    //add o texto do input no novo <LI>
    const conteudoTarefa = document.createElement('p')
    conteudoTarefa.textContent = inputTarefa

    //add um botao para deletar tarefa no novo <LI>
    const botaoDeletar = document.createElement('button')
    botaoDeletar.textContent = 'Deletar Tarefa'
    botaoDeletar.addEventListener('click', () => {
        //remove o elemento tarefa da tela
        elemento_tarefa.remove()
        //filtra a tarefa a ser removida
        listaTarefas = listaTarefas.filter((tarefa) => tarefa !== inputTarefa)
        //salva novamente a lista de tarefa no localStorage
        localStorage.setItem('tarefas', JSON.stringify(listaTarefas))
    })

    //add um botao para completar a tarefa mo <LI>
    const botaoCompletar = document.createElement('button')
    botaoCompletar.textContent= 'Completar Tarefa'
    botaoCompletar.addEventListener('click', () => {
        conteudoTarefa.classList.toggle('completada')
    })

    //adicionar o novo elemento <LI> a tag <ul>
    elemento_tarefa.appendChild(conteudoTarefa)
    elemento_tarefa.appendChild(botaoCompletar)
    elemento_tarefa.appendChild(botaoDeletar)
    document.getElementById('lista_tarefa').appendChild(elemento_tarefa)
}