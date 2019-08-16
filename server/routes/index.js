const express = require('express');
const router = express.Router();

// Controladores
const loginController = require('../controllers/loginController');
const registroController = require('../controllers/registroController');
const inicioController = require('../controllers/inicioController');
const graficasController = require('../controllers/graficasController');
const tablaController = require('../controllers/tablaController');

//var usuarioID = null;
global.usuarioID = null;
global.nombreUsuario = "";
var sesion;
module.exports = function() {
    router.get("/", loginController.loginControllerGet);
    router.get('/login', loginController.loginControllerGet);
    router.post('/login', loginController.infoUsuario);
    router.get('/registro', registroController.registroPage);
    // cuando se crea un usuario
    router.post('/registro', registroController.registroCuenta);
    router.get('/inicio', inicioController.inicioPage);
    router.post('/inicio', inicioController.agregarDatos);
    router.post("/valoresFinales", inicioController.finalizarJornada);
    router.get('/graficas', graficasController.graficasPage);
    router.get('/tabla', tablaController.tablaPage);
    return router
}