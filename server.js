const express = require('express')
const mongoose = require('mongoose'); // es elestandar de orm para mongodb
const app = express()
const bodyParser = require('body-parser')
const port = 3000

// Middleware
//definimos el formato que va,os a ocupar
//app.use(bodyParser.json);

//es un standar para evitar un error de acceso a rutas en la etapa de desarrollo
//app.use(cors());
// es un atribiuto de seguridad
app.use(bodyParser.urlencoded({
  extended:false
}))


app.use(bodyParser.json());
// definimos nuestra hoja de rutas (index)
app.use (require('./routes/index'))

// app.get('/usuario', (req, res) => res.send('Hello World!'))

// hacemos la conexion con la base de datos ojo sgq es el nombre de la db
mongoose.connect('mongodb://localhost:27017/sga',{
  useNewUrlParser: true
},(err,res)=>{
  if(err) throw error;
  console.log(`Mongo is working ${6 + 7}`);
})


app.listen(port,() => console.log(`Corriendo in the port ${port}!`))
