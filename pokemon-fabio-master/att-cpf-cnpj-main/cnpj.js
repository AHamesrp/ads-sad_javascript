/*
gerador 8 numeros aleatorios
adicionar 0001 ao final dos 8 digitos
para gerar o 13 digito: multiplico pelo array 543298765432
somo tudo
faço a divisão
pego o modulo da divisão
verificao se o resultado é menor q dois
*/

function multiplicarNumero(array_cnpj, array_multiplicaçao){
    let soma =0
    for(let i=0; i<array_cnpj.length; i++){
        soma += array_cnpj[i] *array_multiplicaçao[i]
    }
    let resto = soma %11
    let digito
    if(resto<2){
        digito =0
    }else{
        digito= 11-resto
    }
    return digito
}
function gerarCNPJ(){
    let numero_base = Math.floor(Math.random() * 100000000)
    numero_base = numero_base.toString() + '0001'
    array_cnpj = numero_base.split('')
    array_multiplicaçao = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    let digito1 = multiplicarNumero(array_cnpj, array_multiplicaçao) // retorna digito1
    array_cnpj.push(digito1.toString()) // pegar digito1 acrescentar no array_cnpj
    array_multiplicaçao.unshift(6) //acrescentar um valor no array_multiplicação
    let digito2 = multiplicarNumero(array_cnpj, array_multiplicaçao) //retorna digito2
    array_cnpj.push(digito2.toString())
    return array_cnpj.join('')
}
let cnpj = gerarCNPJ()
console.log(cnpj)