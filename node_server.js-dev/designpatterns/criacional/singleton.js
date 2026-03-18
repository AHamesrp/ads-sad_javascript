class BancoDeDados{
    constructor(){
        if(!BancoDeDados.instance){
            BancoDeDados.instance = this;
        }
        return BancoDeDados.instance
    }
    conectar(){
        console.log('conectando')
    }
}
const db1 = new BancoDeDados()
const db2 = new BancoDeDados()
console.log(db1 === db2)