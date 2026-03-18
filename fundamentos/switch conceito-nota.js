var conceito = 'A';

// if( conceito == 'A'){
//     console.log('Aprovado')
// }else if( conceito == 'B'){
//     console.log('Aprovado')
// }else if( conceito == 'C'){
//     console.log('Recuperação')
// }else if( conceito == 'NE'){
//     console.log('Pedir pro familiar pagar a multa pra fazer a recuperação')
// }else{
//     throw new Error('Não há conceito')
// }

switch(conceito){
case 'A':
console.log('Aprovado')
break;
case 'B':
console.log('Aprovado')
break;
case 'C':
console.log('Reprovado')
break;
case 'NE':
console.log('Pagar Multa')
break;
default:
throw new Error('Faltou adicionar conceito')
}