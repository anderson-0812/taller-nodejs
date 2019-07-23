const express = require('express')
const app = express();
const PermisoAcceso = require('../models/permiso');
const date = require('date-and-time');
const dateFormat = require('dateformat');
const Sala = require('../models/sala');


const mongoose = require('mongoose');
// variable de date
let now = new Date();

app.get('/permiso',(req,res)=>{
  PermisoAcceso.find({state:true}).exec((err,permisos)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }

    if(!permisos){
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.status(200).json({
      ok: true,
      permisos
    })
  })
});


app.post('/permiso',(req,res)=>{
  let body = req.body

  let permiso_guardar_entrada = new PermisoAcceso({
    // date:dateFormat(now,"dddd, d 'de' mmmm, yyyy"),
    day: body.day,
    day_create:dateFormat(now,"dddd, d 'de' mmmm, yyyy"),
    // la A es la region
    hour:date.format(now,"hh:mm:ss A"),
    start_time:body.start_time,
    end_time:body.end_time,
    rol: body.rol,
    sala: body.sala,
    // typeAccess: "ENTRADA"
  })
  permiso_guardar_entrada.save((err,permisoDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    if(!permisoDB){
      return res.status(400).json({
        ok:false,
        permisoDB
      })
    }
    res.status(200).json({
      ok: true,
      permisoDB
    });
  });
});

app.put('/permiso/:id',(req,res)=>{
  let id = req.params.id;
  let body = req.body

  let permiso_editar = {
    // date:dateFormat(now,"dddd, d 'de' mmmm, yyyy"),
    day: body.day,
    day_create:dateFormat(now,"dddd, d 'de' mmmm, yyyy"),
    // la A es la region
    hour:date.format(now,"hh:mm:ss A"),
    start_time:body.start_time,
    end_time:body.end_time,
    rol: body.rol,
    sala: body.sala,
  }

  PermisoAcceso.findByIdAndUpdate(id,permiso_editar,{
    new: true,
    runValidators: true
  },(err, permisoDB)=>{
    if(err){
      return permisoDB.status(500).json({
        ok: false,
        err
      })
    }
    if(!permisoDB){
      return permisoDB.status(400).json({
        ok: false,
        permisoDB
      })
    }
    res.status(200).json({
      ok:true,
      permisoDB
    })
  });
})


// eliminar
app.delete("/permiso/:id",(req,res)=>{

  let id = req.params.id;
  let permisoState = {
    state:false
  }

  
  PermisoAcceso.findByIdAndUpdate(id,permisoState,{
    new:true,
    runValidators:true
  },(err,permisoDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    if(!permisoDB){
      // return permisoDB.status(400).json({
        ok:false,
        permisoDB
      // })
    }
    res.status(200).json({
      ok:true,
      permisoDB
    });
  });
});
module.exports = app
