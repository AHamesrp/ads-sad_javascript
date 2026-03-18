/*
Criar um array para armazenar os produtos.
Implementar uma função para adicionar novos produtos ao array.
Implementar uma função para remover um produto do array.
Implementar uma função para listar todos os produtos cadastrados.
Implementar uma função para retornar apenas um dos produtos cadastrados.
Validar os dados antes de adicionar um produto.
*/

let produtos = [];

function validarProduto(produto) {
    return produto || produto.nome || produto.preco;
}
function adicionarProduto(produto) {
    if (validarProduto(produto)) {
        produtos.push(produto);
        console.log("Produto adicionado ao seu carrinho.");
    } else {
        console.log("Dados do produto inválidos.");
    }
}

function removerProduto(nome) {
    produtos = produtos.filter(produto=>produto.nome !== nome);
    console.log("Produto removido do seu carrinho.");
}

function listarProdutos() {
    console.log("Seu carrinho:");
    produtos.forEach(produto=>console.log(`${produto.nome}, R$${produto.preco}`));
}

function buscarProduto(nome) {
    const produto = produtos.find(produto=>produto.nome === nome);
    if (produto) {
        console.log(`Produtos restantes no carrinho: ${produto.nome}, R$${produto.preco}`);
    } else {
        console.log("Produto não encontrado.");
    }
}

adicionarProduto({nome: "Mouse", preco: 800.0});
adicionarProduto({nome: "Teclado", preco: 200.0});
listarProdutos();
removerProduto("Teclado");
buscarProduto("Mouse");
listarProdutos();
