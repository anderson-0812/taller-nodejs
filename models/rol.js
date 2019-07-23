const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let rolSchema = new Schema({
  name:{
    type:String,
    required:[true,"El nombre es requerido"]

  },
  // description:{
  //   type:String,
  //   required:[true,"El description es requerido"]
  // },
  state:{
    type: Boolean,
    default:true
  }
});


// en esta parte creo la tabla le paso el nombre y su esquema
module.exports  = mongoose.model('Rol',rolSchema);
