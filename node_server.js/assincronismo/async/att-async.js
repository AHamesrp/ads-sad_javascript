function pegarNumRandom(){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
                //gerar um numero aleatorio entre 0 e 10
                const number = Math.floor(Math.random()*11)
                //se este for maior q 5 retorna resolve
                //se este for menor ou igual a 5 retorna reject
                if(number <= 5){
                    reject(`menor/igual a 5 --> ${number}`)
                }else{
                    resolve(`maior q 5 --> ${number}`)
                }
        }, 2000)
    })
}
async function mostraNumRandom() {
    try{
        const numRandom = await pegarNumRandom()
        console.log(numRandom)
    }catch(err){
        console.log('ERROR:', err)
    }
}
mostraNumRandom()