const fs = require('fs')
const express = require('express')
const PORTA = 8000
//inicializar o server
const server = express()
server.use(express.json())

//cria uma rota simples
server.options('/', (req, res)=>{
    res.status(200).json({msg: 'ta ok'})
})

server.get('/tarefa', (req, res)=>{
    //fs.readFile(caminho, transformação, callback)
    fs.readFile('./banco.json','utf-8' ,(err, data) => {
        //./arq q ta na mesma pasta
        //../arq q ta em outra pasta(sai da pasta)
        if(err){
            res.status(500).json({erro:err})
        }
        console.log(typeof(data))
        res.status(200).json(data)
    })
    //listar uma tarefa especifica, caso n existir retornar 404
    server.get('tarefas/:id', (req, res)=>{
        const tarefa_id = req.params.tarefa_id
        //retorna 200 e os dados caso ache
        let msg =''
        let cod_err =200
        //ler o arq banco.json
        fs.readFile('./banco.json','utf-8' ,(err, data) => {
            //./arq q ta na mesma pasta
            //../arq q ta em outra pasta(sai da pasta)
            if(err){
                res.status(500).json({erro:err})
            }
            //procurar pela tarefa de ID informado (.find)
            const lista_tarefa = JSON.parse(data)
            const tarefa = lista_tarefa.find((item)=> item.id == tarefa_id)
            msg = tarefa
            if(!tarefa){
                //retorna 404 caso n ache
                cod_err =404
                msg ='tarefa nao encontrada'
            }
            res.status(cod_err).json(msg)
        })
    })   
})
//criar uma tarefa
server.post('./tarefas',(req, res)=>{
    const {titulo, descricao, dificuldade, user_id} = req.body
    fs.readFile('./banco.json','utf-8' ,(err, data) => {
        if(err){
            res.status(500).json({erro:err})
        }
        const lista_tarefa = JSON.parse(data)
        lista_tarefa.push({
            id: Date.now(),
            titulo: titulo,
            descricao: descricao,
            dificuldade: dificuldade,
            user_id: user_id
        })
        fs.writeFile('./banco.json', JSON.stringify(lista_tarefa), (err) =>{
            if(err){
                res.status(500).json({msg:err})
            }
        })
        res.status(200).json(data)
    })
})


//atualiza uma tarefa
//deletar uma tarefa
//criar um CRUD em um arq json utilizando Restful

//manda o server ouvir na porta 8000
server.listen(PORTA, ()=> (console.log('servidor rodando na porta 8000')))



//pedir ajuda do ramon para rodar no postman
//pedir ajuda npm terminal
//pedir ajuda para rodar o servidor