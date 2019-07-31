const express = require('express')
const app = express();
const Acceso = require('../models/acceso');
const date = require('date-and-time');
const dateFormat = require('dateformat');
const Sala = require('../models/sala');


const mongoose = require('mongoose');
// variable de date
let now = new Date();

app.get('/acceso',(req,res)=>{
  Acceso.find({state:true}).exec((err,accesos)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }

    if(!accesos){
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.status(200).json({
      ok: true,
      accesos
    })
  })
});

app.get('/acceso/:idUser',(req,res)=>{
  // console.log(req);
  let idUser = req.params.idUser;

  Acceso.find({state:true,user:idUser}).exec((err,accesos)=>{
    console.log("Acceso");
    console.log(accesos);
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }

    if(!accesos){
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.status(200).json({
      ok: true,
      accesos
    })
  })
});

app.post('/acceso',(req,res)=>{
  let body = req.body
  // Valido si user o sala estan vacios
  console.log('SALA ')
  console.log(body.sala)

  if (body.sala == undefined) {
    console.log('SALA VACIO')
    return null;

  }

  let accesos_guardar_entrada = new Acceso({
    date:dateFormat(now,"dddd, d 'de' mmmm, yyyy"),
    // la A es la region
    hour:date.format(now,"hh:mm:ss A"),
    user: body.user,
    sala: body.sala,
    typeAccess: "ENTRADA"
  })

  let accesos_guardar_salida = new Acceso({
    date:dateFormat(now,"dddd, d 'de' mmmm, yyyy"),
    // la A es la region
    hour:date.format(now,"hh:mm:ss A"),
    user: body.user,
    sala: body.sala,
    typeAccess: "SALIDA"
  })

  // El findOne trae solo un dato
  console.log('user')
  console.log(body.user)
  Acceso.findOne((
    {user:body.user}
  ),(err,result)=>{

    if(err){
      console.log('err')
      console.log(err)
      return res.status(500).json({
        ok:false,
        err
      })
    }

    if(result === null){
        accesos_guardar_entrada.save();

    console.log('resultado busqueda NULL')
    console.log(result)
      return res.status(200).json({
        ok:true,
        acceso:accesos_guardar_entrada
      })
    }else{
      if(result.typeAccess === 'SALIDA'){

    console.log('resultado busqueda == salida')
    console.log(result)
        accesos_guardar_entrada.save();
        return res.status(200).json({
          ok:true,
          acceso:accesos_guardar_entrada
        })
      }else {
        if(result.typeAccess === 'ENTRADA')

    console.log('resultado busqueda == ENTRADA')
    console.log(result)
        accesos_guardar_salida.save();
        return res.status(200).json({
          ok:true,
          acceso:accesos_guardar_salida
        })
      }
    }
  }).sort({
    // nos tare el ultimo registro ordenado desencedntemente antes de ejecutar la funciones de guardado

    _id: -1
  });
});

module.exports = app
