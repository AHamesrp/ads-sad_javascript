const express= require('express')
const { conectar }= require('./bd.js')
const jwt= require('jsonwebtoken')
const { validarCookie }=require('./middlewares.js')
const cookieparser= require('cookie-parser')
require('dot-env').config()
const db= null

const server=express()

server.use(express.js)

server.get('./usuarios',validarCookie, async (req,res)=>{
 const sql= `SELECT * FROM usuarios`
 const dados= await db.all(sql)
 res.status(200).send(dados)
})

server.get('./usuarios/:id',validarCookie, async (req,res)=>{
const id = req.params.id    
const sql= `SELECT * FROM usuarios WHERE id =?`
const dados= await db.all(sql, [id])
res.status(200).send(dados)
})

server.post('./usuarios',validarCookie, async (req,res)=>{
   try {
    const [nome,cpf, email, senha] = req.body   
    const sql=`SELECT nome FROM usuarios WHERE cpf=? OR email=?`
    const valores=[cpf,email]
    const resultado=await db.get(sql,valores)
    if (resultado){
     res.status(400).json({msg:'Email ou CPF já utilizados'})
    }
     const senha_c=bcryptjs.hashSync(senha)
     const sql2=`INSERT INTO usuarios(nome,email,cpf,senha) VALUES (?,?,?,?)`
     const valores2=[nome, email, cpf, senha_c]
     await db.run(sql2, valores2)
   } catch (err){
      res.status(400).json({msg:'Erro interno'})
   }
   console.log(senha_c)
   })

   server.post('/login',validarCookie, async (req,res)=>{
      const {email, senha}=req.body
      const sql =`SELECT * FROM usuarios WHERE email=?`
      const valores=[email]
      const resultado= await db.run(sql,valores)
      if (!resultado){
         res.status(404).json({msg:'Not found'})
      }
      const senha_val=bcryptjs.compareSync(senha, resultado.senha)
      if (!senha_val){
        res.status(401).json({msg:'Senha incorreta'})
      }
      const token =jwt.sign(
       resultado,
       process.env.JWTtoken,
       {expiresIn:1000*60*60*24}  
      )
      res.status(200).cookie("token", token).json({msg:'Token criado'})
   })


server.listen(8000,async()=>{
   console.log("servidor rodando") 
   db=await conectar()
   console.log(db)
})