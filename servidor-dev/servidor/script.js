const http = require('http')
const url = require('url')
const PORTA = 8000
const server = http.createServer((req, res) =>{
    const {pathname, query}=url.parse(req.url)
    console.log(pathname) //pathname = é o caminho do recurso
    console.log(query) //query = variaveis q to mandando
    if(rota == '/soma'){
        const resultado = somar(1,2)
        res.end(`o resultado da soma é: ${resultado}`)
    }else if(rota == '/diminuir'){
        const resultado = diminuir(1,2)
        res.end(`o resultado da subtração é: ${resultado}`)
    }else if(rota == '/multiplicar'){
        const resultado = multiplicar(1,2)
        res.end(`o resultado da multiplicação é: ${resultado}`)
    }else if(rota == '/dividir'){
        const resultado = dividir(1,2)
        res.end(`o resultado da divisão é: ${resultado}`)
    }else{
        res.writeHead(404)
    }
})
server.listen(PORTA, ()=>{
    console.log(`o servidor esta rodando na porta ${PORTA}`)
})

function somar(num1, num2){
    return num1+num2
}
function diminuir(num1, num2){
    return num1-num2
}
function multiplicar(num1, num2){
    return num1*num2
}
function dividir(num1, num2){
    return num1/num2
}