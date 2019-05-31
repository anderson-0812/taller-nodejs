// vana  estar configuraciones de
// DB
// Tokens

// OJO los proceessn con la configuracion ayuda
 // a identificar
// ambientes de devep y de produccion

// configuracion para DB
let urlDB;
// es una irl deun gestio de base gratuito https://cloud.mongodb.com/v2/5cef2bdf9ccf6416a17691e0#clusters?fastPoll=true
// urlDB = 'mongodb://admin:admin123@ds263816.mlab.com:63816/sga2'

if(process.env.ENV == 'dev'){
  urlDB = 'mongodb://localhost:27017/sga2' // 2017 es un puerto x defecto
}else{
  urlDB = process.env.MONGO_URI
}
process.env.urlDB = urlDB

// configuracion para Puerto

// le digo que en caso de que tengamospuerto en heroku coja ese o si no 3500
process.env.PORT = process.env.PORT || 3500;

// ocupamos apra que jwt funcione
process.env.SEED = process.env.SEED || "jwtsecretdev" // jwtsecretdev sera la palabra firma
process.env.CADUCIDAD = process.env.CADUCIDAD || "1d" // definimos el tiempo de expiracion
