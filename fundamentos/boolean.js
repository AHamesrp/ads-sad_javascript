var estaFrio = true;

if (estaFrio) {
  console.log("Está frio lá fora!");
} else {
  console.log("Não está frio.");
}

estaFrio = !estaFrio;
console.log("Agora está frio?", estaFrio);

var estaQuente = false;

var resultado1 = estaFrio && estaQuente;
var resultado2 = estaFrio || estaQuente;

console.log("Resultado com AND:", resultado1);
console.log("Resultado com OR:", resultado2);
