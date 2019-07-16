require('./config/config') // esto va siempre al inicio apra q tomaesta configuracion antes q todo
const express = require('express')
const mongoose = require('mongoose'); // es elestandar de orm para mongodb
const app = express()
const bodyParser = require('body-parser')
// const port = 3500

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
// mongoose.connect('mongodb://localhost:27017/sga',{
// para heroku mongoose.connect(process.env.MONGO_URI
// para Local mongoose.connect('mongodb://localhost:27017/sga2'
// mongoose.connect('mongodb://localhost:27017/sga',{ //process.env.URLDB =>  de esatamnera s epone cuando ya tenemos configurado nuestro archivo config con la DB
// para local
mongoose.connect(process.env.URLDB,{ //process.env.URLDB =>  de esatamnera s epone cuando ya tenemos configurado nuestro archivo config con la DB
  useNewUrlParser: true
},(err, res)=>{
  if(err) throw error;
  console.log(`Mongo is working ${6 + 7}`);
})
console.log('Desde server la urlde ladb '+ process.env.URLDB);

// sola esta linea es para heroku
app.listen(process.env.PORT,() => console.log(`Corriendo in the port ${process.env.PORT}!`))
