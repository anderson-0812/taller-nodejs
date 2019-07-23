const express = require('express');
const app = express();
const Rol = require('../models/rol');

app.get('/rol',(req,res)=>{
  // ojo find(aqui van las condiciones de busqueda){}
  Rol.find({state:true}).exec((err,rolDB)=>{
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
  let body = req.body

  let rolParaGuardar = new Rol({
    name: body.name,
    // description: body.description
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
      rolDB
    });
  });
});

// Editar
app.put('/rol/:id',(req,res)=>{
  let id = req.params.id;
  let body = req.body;

  // cargo datos
  let rolPorEditar = {
    name: body.name,
    description: body.description
  }

  Rol.findByIdAndUpdate(id,rolPorEditar,{
    new: true,
    runValidators:true
  },(err,rolDB)=>{
    if(err){
      return rolDB.status(500).json({
        ok:false,
        err
      })
    }
    if(!rolDB){
      return rolDB.status(400).json({
        ok: false,
        rolDB
      })
    }
    res.status(200).json({
      ok:true,
      rolDB
    })
  })
});

// eliminamos
app.delete("/rol/:id",(req,res)=>{
  let id = req.params.id;
  let rolState = {
    state:false
  }

  Rol.findByIdAndUpdate(id,rolState,{
    new:true,
    runValidators:true
  },(err,rolDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    if(!rolDB){
      ok:true,
      rolDB
    }

    res.status(200).json({
      ok:true,
      rolDB
    })
  })
})


module.exports = app;
