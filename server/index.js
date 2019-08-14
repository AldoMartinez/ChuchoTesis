// importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');


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

app.listen(3001);