const sqlite=require('sqlite3')
const {open}=('sqlite')

const db= new sqlite.Database('./teste.db',(err)=>{
   console.log(err) 
})
let sql=`CREATE TABLE IF NOT EXISTS usuarios(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 nome TEXT,
 cpf TEXT,
 email TEXT UNIQUE
)`

//db.exec(sql, (err)=>{
//   console.log(err) 
//})
//
//let sql2=`INSERT INTO usuarios (nome, cpf, email) VALUES(?, ?, ?)`
//
//db.run(sql2,['Mauricio','28747543287275','Mauricio@gmail.com'],(data,err)=>{
//    if (err){
//        console.log(err)
//        return
//    }
//    else{
//        console.log(data)
//    }
//})

async function conectar() {
  const db = open({
    filename:'./teste.db',
    driver: sqlite.Database
  })
  return db
}

async function altetartabela(db) {
  let sql=`ALTER TABLE usuarios ADD COLUM TEXT senha`
  
}