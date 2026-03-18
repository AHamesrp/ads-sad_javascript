const express = require('express')
const fs = require('fs')
const PORTA = 8000

const server = express()
server.use(express.json())

server.options('/', (req, res)=>{
    res.status(200).json({msg:'ta ok'})
})
server.get('/tarefas',(req, res)=>{
    fs.readFile('./banco.json', 'utf-8', (err, data)=>{
        if(err){
            res.status(500).json({erro:err})
        }
        console.log(typeof(data))
        res.status(200).json(data)
    })
})
server.get('/tarefas/:id',(req, res)=>{
    const tarefa_id = req.params.tarefa_id
    let msg=''
    let cod_err =200
    fs.readFile('./banco.json', 'utf-8',(err, data)=>{
        if(err){
            res.status(500).json({error:err})
        }
        const lista_tarefa = JSON.parse(data) //procurar pela tarefa de ID informado (.find)
        const tarefa = lista_tarefa.find((item)=> item.id == tarefa_id)
        msg = tarefa
        if(!tarefa){
            cod_err =404 //caso n ache return 404
            msg ='tarefa ñ encontrada'
        }
        res.status(cod_err).json(msg)
    })
})
server.post('./tarefas', (req, res)=>{
    const {titulo, descrição, dificuldade, user_id} = req.body
    fs.readFile('./banco.json', 'utf-8', (err, data)=>{
        if(err){
            res.status(500).json({erro:err})
        }
        const lista_tarefa = JSON.parse(data)
        lista_tarefa.push({
            id: StaticRange.now(),
            titulo: titulo,
            descricao: descricao,
            dificuldade: dificuldade,
            user_id: user_id
        })
        fs.writeFile('./banco.json', JSON.stringify(lista_tarefa), (err)=>{
            if(err){
               res.status(500).json({msg:err}) 
            }
        })
        res.status(200).json(data)
    })
})


server.listen(PORTA, ()=>(console.log('servidor rodando na porta 8000')))