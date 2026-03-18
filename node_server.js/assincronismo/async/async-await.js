function pegarUsuario(){
    return new Promise((resolve, reject)=>{
        setTimeout(
            () => {
            resolve('ramon brignoli')
        }, 2000)
    })
}

// const result = pegarUsuario()
// result.then(msg=> console.log(msg))
// //forma padrao de pegar a resposta da Promise

async function mostrasUsuario() {
    const usuario = await pegarUsuario()
    console.log(usuario)
}
mostrasUsuario()