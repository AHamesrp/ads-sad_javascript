//Interação com eventos:

/*
O DOM também permite a interação dinâmica com eventos do usuário,
como cliques, movimentos do mouse, e teclas pressionadas
*/

const botao = document.querySelector('button');
botao.addEventListener('click', function() {
    alert('Botão foi clicado!');
});
