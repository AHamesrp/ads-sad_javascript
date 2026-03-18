/*um sistema de fila de banco
um usuario seleciona uma opção: senha normal, senha preferencial
dependendo da sua seleção, ele é colocado em um vetor fila diferente

criar uma função que chama um usuario para o atendimento
se o ultimo usuario chamado foi preferencial, chama um normal
se o ultimo usuario chamado foi normal, verifica a existencia de um preferencial
caso nao haja um usuario preferencial, chama outro normal
*/

const fila = [];
const fila_preferencial= [];
let ultimo_chamado = 'normal'

const add_fila = (nome, preferencial)=>{
    if(preferencial){
        fila_preferencial.push(nome)
    }else{
        fila.push(nome)
    }
}

const chamar_pessoas=()=>{
    if(ultimo_chamado == 'normal' && fila_preferencial.length > 0 ){
        let proximo = fila_preferencial.shift()
        console.log(`por favor senhor ${proximo} guichê 01`)
        ultimo_chamado = 'preferencial'
    }else if(ultimo_chamado == 'preferencial' && fila.length > 0){
        let proximo = fila.shift()
        console.log(`por favor ${proximo} guichê 02`)
        ultimo_chamado = 'normal'
    }else{
        console.log("não há mais pessoas na fila.")
    }
}

add_fila('ramon', true)
add_fila('kauã', false)
add_fila('Ana', true)
add_fila('lucas', false)
add_fila('arthur', true)
console.log('ok')
chamar_pessoas()
chamar_pessoas()
chamar_pessoas()
chamar_pessoas()
chamar_pessoas()
chamar_pessoas()
