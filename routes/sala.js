const express = require('express')
const app = express();
const Sala = require('../models/sala');
// extraer datos
app.get('/sala',(req,res)=>{

  Sala.find({"state":true}).exec((err,salaDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    res.status(200).json({
      ok:true,
      salaDB
    })
  })
});

// guardar datos
app.post('/sala',(req,res)=>{
  let body = req.body

  let salaParaGuardar = new Sala({
    name:body.name,
    description:body.description
  });

  salaParaGuardar.save((err,salaDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    if(!salaDB){
      return res.status(400).json({
        ok:false,
        salaDB
      })
    }
    res.status(200).json({
      ok:true,
      salaDB
    });
  });
});

//Editar
app.put('/sala/:id',(req,res)=>{
  let id = req.params.id;
  let body = req.body;

  // cargamos los datos
  let salaPorEditar = {
    name: body.name,
    description: body.description
  }

  Sala.findByIdAndUpdate(id,salaPorEditar,{
    new: true,
    runValidators: true
  },(err, salaDB)=>{
    if(err){
      return salaDB.status(500).json({
        ok: false,
        err
      })
    }
    if(!salaDB){
      return salaDB.status(400).json({
        ok: false,
        salaDB
      })
    }
    res.status(200).json({
      ok:true,
      salaDB
    })
  })
})

// eliminar
app.delete("/sala/:id",(req,res)=>{

  let id = req.params.id;
  let salaState = {
    state:false
  }

  Sala.findByIdAndUpdate(id,salaState,{
    new:true,
    runValidators:true
  },(err,salaDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    if(!salaDB){
      // return salaDB.status(400).json({
        ok:false,
        salaDB
      // })
    }
    res.status(200).json({
      ok:true,
      salaDB
    });
  });
});
module.exports = app
