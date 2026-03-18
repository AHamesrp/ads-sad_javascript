let meuArray = [1, 2, 3];
meuArray[0] = 4;
console.log(meuArray); 

let minhaString = "Olá";
minhaString[0] = "o";
console.log(minhaString);

/*Arrays em JavaScript são mutáveis, significa que pode
alterar seus elementos diretamente. Foi alterado o
primeiro elemento de 1 para 4, e a saída no console é [4, 2, 3].

Strings em JavaScript são imutáveis, o que significa que não pode
alterar diretamente os caracteres de uma string.
Quando tentamos alterar o primeiro caractere de de “O” para “o”,
a string não alterada. A saída no console
continua sendo "Olá".*/

localStorage.setItem('nome', 'Arthur');
localStorage.setItem('idade', '16');

let nome= localStorage.getItem('nome');
let idade= localStorage.getItem('idade');
console.log(nome);
console.log(idade);

localStorage.removeItem('idade');
localStorage.clear();

/*
Persistência: os dados armazenados no localStorage não expiram,
eles permanecem disponiveis até que sejam explicitamente removidos

Chave/valor: o localStorage armazena dadis como pares chave/valor,
onde ambos são strings. Usar o localStorage é mais simples para
manter dados persistentes entre execuções de um programa no navegador
*/

let saudacaoPrimitiva= 'olá';
console.log(saudacaoPrimitiva);

let saudacaoObjeto={
    saudacao: olá
};
console.log(saudacaoObjeto);

/*
Variável Primitiva: "saudacaoPrimitiva" é uma variável do tipo string,
um tipo de dado primitivo em JavaScript. Tipos primitivos são imutáveis
e armazenam valores diretamente.

Variável de Referência: "saudacaoobjeto" é uma variável que contém um
objeto. Objetos são tipos de dados de referência em JavaScript, significa
que a variável armazena uma referência ao local na memória onde o objeto
está armazenado, e não o valor diretamente.
*/

let arraySimple= [1, 2, 3];
console.log(arraySimple);

let arrayMulti= [[1, 2], [3, 4]];
console.log(arrayMulti);

/*
"arraySimples" (unidimensional) é um array simples que contém
os valores [1, 2, 3].

"arrayMulti" (multidimensional) é um array que contém outros 
rrays como seus elementos, formando uma estrutura multidimensional
com os valores [[1, 2], [3, 4]].
*/
