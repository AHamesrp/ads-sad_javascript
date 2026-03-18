const matriz = [
    [1, 2, 3],
    [4, 5, 6]
];
  
console.log("Matriz original:");
console.table(matriz);
  
const elementoSegundaLinhaTerceiraColuna = matriz[1][2];
console.log("Elemento na segunda linha, terceira coluna:", elementoSegundaLinhaTerceiraColuna);
matriz[0][1] = 99;
console.log("Matriz atualizada:");
console.table(matriz);
  