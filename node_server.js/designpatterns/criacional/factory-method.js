class Notificacao{
    enviar(mensagem){        
        console.log(mensagem)
    }
}
class NotificacaoWPP extends Notificacao{
    enviar(mensagem){
        console.log('msg no zap', mensagem)
    }
}
class NotificacaoEMAIL extends Notificacao{
    enviar(mensagem){
        console.log('msg no email', mensagem)
    }
}
class NotificacaoSMS extends Notificacao{
    enviar(mensagem){
        console.log('msg no sms', mensagem)
    }
}
class Notificacaofactory{
    criarNotificacao(tipo){
        switch(tipo){
            case 'email':
                return new NotificacaoEMAIL()
            case 'wpp':
                return new NotificacaoWPP()
            case 'sms':
                return new NotificacaoSMS()
            default:
                throw new Error('Este tipo de notificacao nao existe')
            
        }
    }
}

Notificacaofactory.criarNotificacao('email').enviar('teste')
Notificacaofactory.criarNotificacao('sms').enviar('teste sms')
Notificacaofactory.criarNotificacao('pombo-correio').enviar('teste q da errado')