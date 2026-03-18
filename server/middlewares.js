const jwt= require(jsonwebtoken)


function validarCookie(req, res, next){
    const token= req.cookie.token
    const verificado= jwt.verify(token,process.env.JWTtoken)
    if (!verificado){
        res.status(300).json({msg:'Usuario não autenticado'}) 
    }
    next()
}

module.exports={ validarCookie }