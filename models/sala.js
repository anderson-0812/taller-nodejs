const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let salaSchema = new Schema({
  name:{
    type:String,
    required:[true,"El nombre es requerido"]
  },
  description:{
    type:String,
    required:[true,"La descripcion es requerida"]
  },
  state:{
    type:Boolean,
    default:true
  }
});

// creo la tabla, paso el nombre y su esquema
module.exports =  mongoose.model('Sala',salaSchema);
