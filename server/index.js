// importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');

require('dotenv').config({path: 'variables.env'});

const db = require('./config/database');

db.authenticate()
    .then(() => console.log("DB conectada"))
    .catch(error => console.log(error));

// configurar express
const app = express();

// habilitar pug
app.set('view engine', 'pug');

// añadir las vistas
app.set('views', path.join(__dirname, './views'));

// cargar una carpeta estatica public
app.use(express.static('public'));

// Genera la ruta
app.use((req, res, next) => {
    res.locals.ruta = req.path;
    return next();
})

// ejecuta el bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// Cargar las rutas
app.use('/', routes());


// Puerto y host para la app

// Como el host '0.0.0.0' no es válido, heroku asigna un host automáticamente
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3001;

app.listen(port, host, () => {
    console.log("El servidor esta funcionando");
});