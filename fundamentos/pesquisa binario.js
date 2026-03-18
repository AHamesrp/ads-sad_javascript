const array_ordenado = [1, 3, 7, 12, 15, 16, 18, 19, 22, 23, 25, 26, 28];
const valor_procurado = 168

let inicio = 0
let fim = array_ordenado.length - 1

while(inicio != fim){
    meio=Math.floor((fim-inicio)/2)

    if(array_ordenado [meio] == valor_procurado){
        console.log(`o numero foi encontrado ${contador} tentativas`)
        return meio

    }else if(array_ordenado[meio]<valor_procurado){
        inicio = meio+1

    }else if(array_ordenado[meio]>valor_procurado){
        fim = meio-1

    }
}
