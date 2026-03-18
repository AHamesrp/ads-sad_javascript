var f = 1;
var p = 2;
var pl = (f*p)/(p*f);
var y = 1;
var yl = (a*y);
var a = (-p)/(p);

let cm = (100);
let pol = 0.0254;

if(f>0){
    console.log("côncavo")
}else if(f==0){
    console.log("plano")
}else if(f<0){
   console.log("convexo")
}else{
    return;
}

if(p>0){
    console.log("Pode")
}else if(p<=0){
    console.log("Não pode")
}else{
    return;
}

if(pl>0){
    console.log("imagem real (fora do espelho)")
}else if(pl<0){
    console.log("imagem virtual (dentro do espelho)")
}else if(pl=f){
    console.log("imagem imprópria (ñ formou imagem)")
}else{
    return;
}

if(y>0){
    console.log("Objeto pra cima")
}else if(y==0){
    console.log("Objeto não existe")
}else if(y<0){
    console.log("Objeto pra baixo")
}else{
    return;
}

if(yl>0){
    console.log("Mede em CM")
}else if(yl==0){
    console.log("Mede em M")
}else if(yl<0){
    console.log("Mede em POL")
}else{
    return;
}

if(a){
    console.log("imagem direita")
}else if(a){
    console.log("imagem invertida")
}else{
    return;
}

