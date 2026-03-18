class PagamentosAntigos{
    processarpagamento(valor){
        console.log('processando pagamento na api antiga')
    }
}
class PagamentosNovos{
    pagar(dados){
        console.log('faz outras coisas exclusivas do mtetodo novo')
    }
}
class AdaptadorDePagamentos{
    constructor(){
        this.ServicoDePagamentos = new PagamentosNovos()
    }
    processarpagamento(valor){
        this.ServicoDePagamentos.pagar({valor:valor})
    }
}