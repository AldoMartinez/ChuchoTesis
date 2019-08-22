const sequelize = require('../config/database');

const dia = require('../models/DatosDelDia');
const lamina = require('../models/Lamina');
const lineaProduccion = require('../models/linea_produccion');

const funciones = require('./funciones');
const routes = require('../routes/index');

const { Op } = Sequelize = require('sequelize');

var añoMes = funciones.obtenerAñoMes();
añoMes = funciones.añoMesSinGuion(añoMes);
// GET
exports.registroHistoricoGet = async (req, res) => {
    if(routes.sesion.email == null) {
        res.redirect('/login');
    } else {
        const lineas_produccion = await lineaProduccion.findAll();
        res.render('registroHistorico', {
            nombrePagina: 'Registro Histórico',
            lineas_produccion
        });
    }
}
// Consulta los datos de los meses y linea de producción seleccionados
exports.consultarDatos = (req, res) => {
    console.log(req.params);
    res.send({hola: "Usando fetch api"});
}