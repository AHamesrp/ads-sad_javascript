const chave1 = Symbol();
const chave2 = Symbol();
console.log("chave1 === chave2:", chave1 === chave2);
const usuario = {};
usuario[chave1] = "Valor da propriedade com chave1";
console.log("Valor da propriedade com chave1:", usuario[chave1]);
