const letra = 'b'
const vogais = ['a', 'e', 'i', 'o', 'u']

if(vogais.includes(letra)){
    console.log('vogal')
}

////////////////////////////////////////////////

const nota1 = 1
const nota2 = 2

const media = (nota1+nota2)/2

if(media>7){
    if(media==10){
        console.log('aprovado com distinção')
    }
}else{
    console.log('reprovado')
}

//////////////////////////////////////////////

const lista = [1,2,3]
let maior = lista[0]
for (let i=0; i<lista.length; i++){
    if(lista[i]>maior){
        maior = lista[i]
    }
}
console.log(maior)

/////////////////////////////////////////////