function login(usuario, senha){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(usuario== 'ramon' && senha == 'test123'){
                resolve('logado')
            }else{
                reject('error')
            }
        }, 2000)
    }) 
}
const result = login('ramon', 'test123')
console.log(result)
result
    .then(msg=> console.log(msg))
    .catch(err=> console.log(err))
//then metodo de resposta para sucesso
//catch metodo de resposta para erro
