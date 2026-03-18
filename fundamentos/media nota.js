//Script da notas do aluno: calcular a média e dar o resultado:
//***Aprovado com conceito A, média maior que 8
//***Aprovado com conceito B, média maior que 6
//***Reprovado (trimestre) com conceito C, média menor que 6
//***Reprovado (anual) com conceito F, média menor que 4

var notas = [1, 1, 1]
var soma = 0;
for (var i=0; i<notas.length; i++){
    
    soma += notas[i]
}
var media = soma / notas.length;
console.log(media);

if(media>=8){
    console.log('(A) Aprovado, parabéns')
}else if(media>=6){ 
    console.log('(B) Aprovado, pode melhorar')
}else if(media>=4){ 
    console.log('(C) Reprovação no trimestre, estudar mais')
}else{ 
    console.log('(F) Reprovação anual, só não vadiar que passa de ano')
}
