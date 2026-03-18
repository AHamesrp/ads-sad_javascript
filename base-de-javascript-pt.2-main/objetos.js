const carro = {
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2022,
    detalhes() {
        console.log(`Detalhes do carro: Marca: ${this.marca}, Modelo: ${this.modelo}, Ano: ${this.ano}`);
}
}; 
carro.detalhes(); 
carro.cor = "Prata"; 
console.log("Carro atualizado:", carro);
  