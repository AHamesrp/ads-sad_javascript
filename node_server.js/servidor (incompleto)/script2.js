const express = require('express')
const PORTA = 8000
const server = express()
server.use(express.json())

server.get('/soma', (req, res)=>{
    const resultado = somar(Number(req.query.num1), Number(req.query.num2))
    res.send(`o resultado da soma é ${resultado}`)
})
server.post('/diminui', (req, res)=>{
    const resultado = diminuir(Number(req.query.num1), Number(req.query.num2))
    res.body(`o resultado da subtração é ${resultado}`)
})
server.put('/multiplica', (req, res)=>{
    const resultado = multiplicar(Number(req.query.num1), Number(req.query.num2))
    res.body(`o resultado da multiplicação é ${resultado}`)
})
server.patch('/dividir', (req, res)=>{
    const resultado = dividir(Number(req.query.num1), Number(req.query.num2))
    res.body(`o resultado da divisão é ${resultado}`)
})

server.listen(PORTA, ()=>{
    console.log(`o servidor está online na porta ${PORTA}`)
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