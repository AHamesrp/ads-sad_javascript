var produtos = []
function adicionarProduto(nome, preco, quantidade){
    if(!nome || !preco || !quantidade){
        console.log("Os valores precisam ser preenchidos")
        return
    }
    if(preco <= 0){
        console.log("O preço não pode ser zero")
        return
    }
    if(quantidade <= 0){
        console.log("A quantidade não pode ser 0 ou abaixo de zero")
        return
    }
    let produto = {
        nome: nome,
        preco: preco,
        quantidade: quantidade
    }
    produtos.push(produto)
}

function listarProdutos(){
    if(produtos.length === 0) {
        console.log("Sem produtos cadastrados")
    }else{
        for(i = 0; i< produtos.length; i++){
            console.log(`${i + 1}. ${produtos[i].nome}, R$${produtos[i].preco}, ${produtos[i].quantidade} unidades. `)
        }
    }
}

function calcularValor(){
    let valorTotal = 0
    for(i = 0; i < produtos.length; i++){
        valorTotal += produtos[i].preco * produtos[i].quantidade
    }
    console.log("Valor total = R$ ", valorTotal)
}

adicionarProduto('Monitor Gamer', 1300, 2)
adicionarProduto('Teclado Gamer', 680, 1)
adicionarProduto('Mouse Gamer', 1400, 1)
adicionarProduto('Mousepad Gamer', 450, 1)
adicionarProduto('Fone Gamer', 990, 1)
adicionarProduto('PC Gamer', 12000, 2)
adicionarProduto('Cadeira Ergonômica', 2800, 1)
adicionarProduto('Quadro do TaTa é fota',1500000, 1)

listarProdutos()
calcularValor()