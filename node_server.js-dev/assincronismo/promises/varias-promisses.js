const tarefa1 = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve('tarefa 1')
    }, 2000)
})
const tarefa2 = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve('tarefa 2')
    }, 3000)
})
const tarefa3 = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve('tarefa 3')
    }, 4000)
})

Promise.all([tarefa1, tarefa2, tarefa3]).then(
    resultados => console.log('tudo finalizado')
)
Promise.race([tarefa1, tarefa2, tarefa3]).then(
    resultado => console.log('a primeira a terminar foi: ', resultado)
)