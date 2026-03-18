function validaPrimeiroDigito(cpf){
    let sum =0;
    for(let i=0; i<9; i++){
        sum+=cpf[i] * (10-i);
    }
    const resto = (sum*10) %11;
    if(resto <10){
        return cpf[9] ==resto;
    }
    return cpf[9] ==0;
}
function validaSegundoDigito(cpf){
    let sum =0;
    for(let i=0; i<10; i++){
        sum+=cpf[i] * (11-i);
    }
    const resto = (sum*10) %11;
    if(resto <10){
        return cpf[10] ==resto;
    }
    return cpf[10] ==0;
}
function validarRepetido(cpf){
    const primeiro =cpf[0];
    let diferente = false;
    for(let i=1; i<cpf.length; i++){
        if(cpf[i] !=primeiro){
            diferente =true;
        }
    }
    return diferente;
}
function validarCPF(cpf){
    if(cpf.length !=11){
        return false;
    }
    if(!validarRepetido(cpf)){
        return false;
    }
    if(!validaPrimeiroDigito(cpf)){
        return false;
    }
    if(!validaSegundoDigito(cpf)){
        return false;
    }
    return true;
}
const cpf ='13478410916'.split('').map((e)=> parseInt(e));
const cpfValido =validarCPF(cpf);
console.log(cpfValido);