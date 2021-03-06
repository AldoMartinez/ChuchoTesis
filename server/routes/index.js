const express = require('express');
const router = express.Router();

// Controladores
const loginController = require('../controllers/loginController');
const registroController = require('../controllers/registroController');
const inicioController = require('../controllers/inicioController');
const rendimientoController = require('../controllers/rendimientoController');
const tablaController = require('../controllers/tablaController');
const lineasProduccionController = require('../controllers/lineasProduccionController');
const registroHistoricoController = require('../controllers/registroHistoricoController');

// Variables
global.usuarioID = null;
global.nombreUsuario = "";
global.lineaProduccion = 0;

// Maneja las rutas URL y decide que controlador usar dependiendo
// la ruta que se le pase.
module.exports = function() {
    router.get("/", loginController.loginControllerGet);
    router.get('/login', loginController.loginControllerGet);
    router.post('/login', loginController.infoUsuario);
    router.get('/registro', registroController.registroPage);
    router.post('/registro', registroController.registroCuenta);
    router.get('/inicio', inicioController.inicioPage);
    router.post('/inicio', inicioController.agregarDatos);
    router.post("/valoresFinales", inicioController.finalizarJornada);
    router.get('/rendimiento', rendimientoController.rendimientoPage);
    router.get('/tabla', tablaController.tablaPage);
    router.post('/tabla', tablaController.registrosPorMes);
    router.get('/lineas_produccion', lineasProduccionController.verLineasProduccion);
    router.post('/agregarLinea', lineasProduccionController.agregarLineaProduccion);
    router.get('/registro_historico', registroHistoricoController.registroHistoricoGet);
    router.get("/consultaIndicesReales/:mes1&:lp", registroHistoricoController.consultarDatos);
    return router
}