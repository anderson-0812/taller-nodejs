const jwt = require('jsonwebtoken')
let verificartoken = (req,res,next)=>{
  let token = req.get('token'); // obtenemos el tokena  verificar
  jwt.verify(token,process.env.SEED,(err,result)=>{
    if(err){
      return res.status(500).json({
        ok: false,
        err: {
          message: "Token no valido"
        }
      })
    }

    // estamos verificando el usuario
    req.usuario = result.usuario
    next()
  })
}

module.exports = verificartoken
