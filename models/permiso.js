const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let typeAccess = {
  values: ['ENTRADA','SALIDA'],
  message: '{VALUE} no es valido para el acceso'
}

let PermisoSchema = new Schema({
  // date: String,
  day: String,
  start_time: String,
  end_time: String,
  day_create: String,
  hour: String,
  rol:{
    type:Schema.Types.ObjectId,
    ref:"Rol",
    required:[true,'Deberia ser asignado']
  },
  // user:{
  //   type:Schema.Types.ObjectId,
  //   ref:"User",
  //   required:[true,'Deberia ser asignado']
  // },
  sala:{
    type:Schema.Types.ObjectId,
    ref:"Sala",
    required:[true,'Deberia ser asignado']
  },
  // typeAccess: {
  //   type: String,
  //   enum: typeAccess
  // },
  state:{
    type:Boolean,
    default:true
  }
});

module.exports = mongoose.model('Permiso',PermisoSchema);
