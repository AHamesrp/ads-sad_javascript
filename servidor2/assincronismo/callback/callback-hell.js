//att callback hell

function prapararMacarrao(callback){
    setTimeout(()=>{
        console.log('preparando macarrão')
        callback()
    }, 1000)
}
function ferverAgua(callback){
    setTimeout(()=>{
        console.log('fervendo água do macarrão')
        callback()
    }, 2000)
}
function cozinharMacarrao(callback){
    setTimeout(()=>{
        console.log('cozinhando macarrão')
        callback()
    }, 3000)
}
function escorrerMacarrao(callback){
    setTimeout(()=>{
        console.log('escorrendo água do macarrão')
        callback()
    }, 4000)
}
function servirPrato(callback){
    setTimeout(()=>{
        console.log('servindo prato de macarrão')
        callback()
    }, 5000)
}

prapararMacarrao(()=>{
    ferverAgua(()=>{
        cozinharMacarrao(()=>{
            escorrerMacarrao(()=>{
                servirPrato(()=>{
                    console.log('Prato Servido')
                })
            })
        })
    })
})






