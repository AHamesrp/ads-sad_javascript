/*
Pedro está organizando seus filmes favoritos. Crie um array chamado filmesFavoritos com três filmes de sua escolha. 
Modifique o primeiro filme para um novo título. Verifique se o último filme da lista é "Harry Potter". 
Se não for, adicione "Harry Potter" ao final da lista. Imprima a lista de filmes favoritos no final.
*/

let filmesFavoritos = ["Inception", "Matrix", "The Godfather"];
filmesFavoritos[0] = "Interstellar";
if (filmesFavoritos[filmesFavoritos.length - 1] !== "Harry Potter") {
    filmesFavoritos.push("Harry Potter");
}
console.log("Filmes Favoritos:", filmesFavoritos);
