
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

// Middleware
//definimos el formato que va,os a ocupar
app.use(bodyParser.json);
// es un atribiuto de seguridad
app.use(bodyParser.urlencoded({
  extended:false
}))


// estructura de funcion get
//ojo: '/usuario' hace referencia solo alnombre de la url
app.get('/usuario',(req,res) => {
  res.json({
    "ok":true,
    "msg":"All ok"
  });
})

//app.post()
module.exports = app

//app.use (requiere('./routes/index'))
//app.get('/usuario', (req, res) => res.send('Hello World!'))


//app.listen(port, () => console.log(`Corriendo in the port ${port}!`))
