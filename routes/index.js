
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
app.use(require('./users'));
app.use(require('./rol'));
app.use(require('./sala')); 

//ponemos la direccion donde vaya a buscar mi codigo
//'./users' => nombre del archivo
// app.use(require('./roles'));
// app.use(require('./salas'));
// app.use(require('./accesos'));

// espeficicamos q solo exporte loq
//este en alsvariables app para q levante el proyecto
module.exports = app;

//app.use (require('./routes/index'))
//app.get('/usuario', (req, res) => res.send('Hello World!'))


//app.listen(port, () => console.log(`Corriendo in the port ${port}!`))
