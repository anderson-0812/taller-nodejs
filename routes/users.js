
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const User = require('../models/user'); // importo al modelo

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
  User.find().exec((err, usuarioDB) => {
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
    nombre: body.nombre,
    apellido: body.apellido,
    edad: body.edad
  }

  User.findByIdAndUpdate(id, userEdit, {
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
    nombre:body.nombre,
    apellido:body.apellido,
    edad:body.edad
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
module.exports = app

//app.use (requiere('./routes/index'))
//app.get('/usuario', (req, res) => res.send('Hello World!'))


//app.listen(port, () => console.log(`Corriendo in the port ${port}!`))
