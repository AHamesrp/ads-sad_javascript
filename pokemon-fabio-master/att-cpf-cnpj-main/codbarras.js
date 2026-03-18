/*
VERIFICAR

Todo código de barras do tipo EAN tem 13 digitos
Os 12 primeiros dígitos são o número base, o último é o verificador
Para calcular o verificador:
Multiplique os dígitos em posições ímpares por 1
Multiplique os dígitos em posições pares por 3
Some todos os resultados
O dígito verificador é o número que, somado ao total, resulta em um múltiplo de 10
Depois, extraia as informações do código.
Os primeiros 3 dígitos representam o pais de origem
Dos digitos 4 a 7, extraímos o código do fabricante
Os últimos dígitos representam o código do produto.
*/

const bancoDeDados = {
    paises: [
        { codigo: '789', nome: 'Brasil' },
        { codigo: '690', nome: 'China' },
        { codigo: '880', nome: 'Coreia do Sul' },
        { codigo: '000', nome: 'Estados Unidos' },
        { codigo: '400', nome: 'Alemanha' },
        { codigo: '030', nome: 'Canadá' },
        { codigo: '076', nome: 'Reino Unido' },
        { codigo: '950', nome: 'Argentina' },
        { codigo: '003', nome: 'França' },
        { codigo: '073', nome: 'México' }
    ],
    fabricantes: [
        { codigo: '7891', nome: 'Fabricante A' },
        { codigo: '6902', nome: 'Fabricante B' },
        { codigo: '8812', nome: 'Fabricante C' },
        { codigo: '4001', nome: 'Fabricante D' },
        { codigo: '9501', nome: 'Fabricante E' },
        { codigo: '0301', nome: 'Fabricante F' },
        { codigo: '0761', nome: 'Fabricante G' },
        { codigo: '0031', nome: 'Fabricante H' },
        { codigo: '0731', nome: 'Fabricante I' },
        { codigo: '0131', nome: 'Fabricante J' }
    ],
    produtos: [
        { codigoEAN: '78912', nome: 'Produto A', fabricante: 'Fabricante A', pais: 'Brasil' },
        { codigoEAN: '69012', nome: 'Produto B', fabricante: 'Fabricante B', pais: 'China' },
        { codigoEAN: '88012', nome: 'Produto C', fabricante: 'Fabricante C', pais: 'Coreia do Sul' },
        { codigoEAN: '40012', nome: 'Produto D', fabricante: 'Fabricante D', pais: 'Alemanha' },
        { codigoEAN: '95012', nome: 'Produto E', fabricante: 'Fabricante E', pais: 'Argentina' },
        { codigoEAN: '03012', nome: 'Produto F', fabricante: 'Fabricante F', pais: 'Canadá' },
        { codigoEAN: '07612', nome: 'Produto G', fabricante: 'Fabricante G', pais: 'Reino Unido' },
        { codigoEAN: '00312', nome: 'Produto H', fabricante: 'Fabricante H', pais: 'França' },
        { codigoEAN: '07312', nome: 'Produto I', fabricante: 'Fabricante I', pais: 'México' },
        { codigoEAN: '01312', nome: 'Produto J', fabricante: 'Fabricante J', pais: 'Estados Unidos' }
    ]
}
function validarEAN (cod_barras){
    if(cod_barras.length !=13){
        return 'codigo invalido'
    }
    //calcula digito verificador e compara
    cod_barras = cod_barras.split('')
    let soma = 0
    for(let i=0; i<cod_barras.length -1; i++){
        if(i%2!=0){
            soma += parseInt(cod_barras[i]*3)
        }else{
            soma += parseInt(cod_barras[i])
        }
    }
    //pega a variavel soma e ver quanto falta para o proximo multiplo de 10
    let digito = (10- soma%10)%10
    if(digito != cod_barras[12]){
        return 'invalido'
    }
    return 'codigo valido'
}
let codigo = '7891234567895'
let resultado = validarEAN(codigo)
console.log(resultado)  

function procuraProduto(cod_barras){
    let país = cod_barras.slice(0, 3)
    let fabricante = cod_barras.slice(3, 7)
    let produto = cod_barras.slice(7, 12)

    //procurando o pais
    let nome_pais = bancoDeDados.paises.find((item)=>item.codigo==pais)
    console.log(nome_pais.nome)



    console.log(pais)
    //separar os dados do meu cod de barras 
    // em pais, fabricante e produto
    //procurar no banco de dados

    //se existir, retorna, se nao existir,
    //envia msg de nao encontrado
    /*if(existir){
        return
    }else{
        return 'nao encontrado'
    }
    */
}
