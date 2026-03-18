
// console.log(1)

// setTimeout(()=>{console.log(2)}, 2000) //ñ mili, dois seg msm
// //setTimrout é uma function assincrona

// console.log(3)

//---------------------------------------------------------------------------------------//


// //implementando delay no node.js
// function delay(tempo){
//     const fim = Date.now() +tempo
//     while(Date.now()<fim){
//         //esperar
//     }
//     return
// }

// async function pedirPizza(callback, sabor){
//     console.log(`Fazendo uma pizza de sabor ${sabor}`)
//     //setTimeout(()=>{console.log('Pizza pronta')}, 5000)
//     await delay(5000)
//     console.log('pizza pronta')
//     callback()
// }
// function comerPizza(){
//     console.log('comendo pizza')
// }
// pedirPizza(comerPizza, 'calabresa')

//---------------------------------------------------------------------------------------//


function passo1(callback){
    setTimeout(()=>{
        console.log('passo1')
        callback()
    }, 1000)
}
function passo2(callback){
    setTimeout(()=>{
        console.log('passo2')
        callback()
    }, 2000)
}
function passo3(callback){
    setTimeout(()=>{
        console.log('passo3')
        callback()
    }, 3000)
}

//callback hell
passo1(()=>{
    passo2(()=>{
        passo3(()=>{
            console.log('fim')
        })
    })
})