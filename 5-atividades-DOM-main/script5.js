var numberToFind = 0;
var attemps = 0;

function refresh(){
    //gera um numero aleatorio
    numberToFind = parseInt(Math.random()*100);
    console.log(numberToFind)
}
function verifyNumber(){
    var bet = document.getElementById('bet').value
    if(bet>100 || bet<1){
        alert('Número Inválido');
        return;
    }

    if(bet>numberToFind){
        attemps++;
        alert('Menor');
    }else if(bet<numberToFind){
        attemps++;
        alert('Maior');
    }else{
        alert('Acertou, com '+attemps+' erros');
    }
}
refresh();

function atualizarLista() {
    const lista = document.getElementById('listaNumeros');
    lista.innerHTML = ''; // Limpa a lista existente

    numerosDigitados.forEach(num => {
        const li = document.createElement('li');
        li.textContent = num;
        lista.appendChild(li);
    });
}