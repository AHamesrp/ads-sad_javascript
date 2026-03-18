const textoinput = document.getElementById("input")
const botao = document.getElementById("idbotao") //aqui estamos pegando o id do botao para interagir com ele
const mensagem = document.getElementsByTagName("p")

botao.addEventListener('click', function (){
    const valorTexto = textoinput.value;
    if(valorTexto == ""){
        mensagem[0].textContent = 'Escreva alguma coisa'
    }else{
        mensagem[0].textContent = `voce escreveu: ${valorTexto}`
    }
})