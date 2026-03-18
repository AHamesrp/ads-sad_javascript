new Promise((resolve, reject)=>{
    resolve('done')
    reject('fail')
})
.then(result => console.log(result))
//
new Promise((resolve, reject)=>{
    setTimeout(()=> resolve('done', 100))
})
//
new Promise((resolve, reject)=>{
    resolve(1)
    
})
.then(result => result *2)
.then(result => result *2)
.then(result => console.log(result))
//
function loadImage(src){
    return new Promise((resolve, reject)=>{
        const img=new Image()
        img.onload=()=>resolve(img)
        img.onerror=reject
        img.src=src
    })
}
//
new Promise((resolve)=>{
    console.log(1)
    resolve(2)
}).then(result=>console.log(result))
//