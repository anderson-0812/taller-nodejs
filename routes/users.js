
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const User = require('../models/user'); // importo al modelo
const bcrypt = require('bcrypt') // encriptar la contraseña
// Middleware
//definimos el formato que va,os a ocupar
// app.use(bodyParser.json);
// // es un atribiuto de seguridad
// app.use(bodyParser.urlencoded({
//   extended:false
// }))

// estructura de funcion get
//ojo: '/usuario' hace referencia solo alnombre de la url
// app.get('/usuario',(req,res) => {
//   res.json({
//     "ok":true,
//     "msg":"All ok"
//   });
// })
// obtenemos elusuario
app.get("/user", (req,res) => {
  // find(aqui van las condiciones de busquedas)
  User.find({
    "state":true
  }).exec((err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        "err": err
      })
    }
    res.status(200).json({
      ok: true,
      usuarioDB
    })
  })
});

// Editar
app.put("/user/:id",(req,res)=>{
  let id = req.params.id;
  let body = req.body;

  // cargamos los valores
  let usuarioPorEditar = {
    name: body.name,
    lastName: body.lastName,
    email: body.email,
    username: body.username,
    password: body.password,
    age: body.age,
    rol: body.rol

  }

  User.findByIdAndUpdate(id, usuarioPorEditar, {
    new: true,
    runValidators: true
  }, (err, usuarioDB)=>{
    if (err) {

      return usuarioDB.status(500).json({
        ok: false,
        err
      })
    }
    if (!usuarioDB) {
      return usuarioDB.status(400).json({
        ok: false,
        usuarioDB
      })
    }
    res.status(200).json({
      ok: true,
      usuarioDB
    })

  })
})

// guardar
app.post("/user",(req,res)=>{
  let body =req.body;
  //objeto a guardar
  let userGuardar = new User({
    name: body.name,
    lastName: body.lastName,
    email: body.email,
    username: body.username,
    password: bcrypt.hashSync(body.password,10), // estoy encriptando 10 veces al pass
    age: body.age,
    rol: body.rol,
    state: body.state
  });
  userGuardar.save((err,usuarioDB)=>{
    if(err){
      return res.json({
        ok:false,
        error: err
      });
    }

    if(!usuarioDB){
      return res.status(400).json({
        ok:false,
        error:err
      });
    }

    res.status(200).json({
      ok:true,
      data:usuarioDB
    });
  })

})

// eliminamos
app.delete("/user/:id",(req,res)=>{
  let id = req.params.id
  let usuarioState = {
    state:false
  }

  User.findByIdAndUpdate(id,usuarioState,{
    new:true,
    runValidators:true
  },(err,usuarioDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    if(!usuarioDB){
      ok:false,
      usuarioDB
    }

    res.status(200).json({
      ok:true,
      usuarioDB
    })
  })
});
module.exports = app

//app.use (requiere('./routes/index'))
//app.get('/usuario', (req, res) => res.send('Hello World!'))


//app.listen(port, () => console.log(`Corriendo in the port ${port}!`))
