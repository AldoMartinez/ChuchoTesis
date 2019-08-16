// importar express
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');
const db = require('./config/database');

require('dotenv').config({path: 'variables.env'});

db.authenticate()
    .then(() => console.log("DB conectada"))
    .catch(error => console.log(error));

// configurar express
const app = express();

// habilitar pug
app.set('view engine', 'pug');

// añadir las vistas
app.set('views', path.join(__dirname, './views'));

// Configura la session para el login
app.use(session({
    secret: 'ssshhh',
    saveUninitialized: true,
    resave: true
}));

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