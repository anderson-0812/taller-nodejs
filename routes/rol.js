const express = require('express');
const app = express();
const Rol = require('../models/rol');

app.get('/rol',(req,res)=>{
  // ojo find(aqui van las condiciones de busqueda){}
  Rol.find().exec((err,rolDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    res.status(200).json({
      ok: true,
      rolDB
    })
  })
});

app.post('/rol',(req,res)=>{
  let body = req.bodyParser

  let rolParaGuardar = new Rol({
    name: body.name,
    description: body.description
  });

  rolParaGuardar.save((err,rolDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    if(!rolDB){
      return res.status(400).json({
        ok:false,
        rolDB
      })
    }
    res.status(200).json({
      ok: true,
      usuarioDB
    });
  });
});

app.put('/rol',(req,res)=>{

});



module.exports = app;
