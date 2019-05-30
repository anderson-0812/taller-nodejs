const express = require('express')
const app = express();
const PermisoAcceso = require('../models/permiso_acceso');
const date = require('date-and-time');
const dateFormat = require('dateformat');
const Sala = require('../models/sala');

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
});

module.exports = app
