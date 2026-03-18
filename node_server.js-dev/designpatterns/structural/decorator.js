class Notificacao{
    enviarMsg(msg){
        console.log('enviando uma msg')
    }
}
class DecoratorNotificacao{
    constructor(){
        this.notificacao = new Notificacao()

    }
    enviarMsg(msg){
        console.log('alguma coisa antes de enviar msg')
        this.notificacao.enviarMsg(msg)
    }
}
const notif = new DecoratorNotificacao()
notif.enviarMsg('test')