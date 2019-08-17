const sequelize = require('../config/database');
const lamina = require('../models/Lamina');

const routes = require('../routes/index');
const funciones = require('./funciones');

const { Op } = Sequelize = require('sequelize');

exports.tablaPage = async (req, res) => {
    if(routes.sesion.email == null){
        res.redirect("login");
    } else {
        fechaPicker = funciones.obtenerAñoMes();
        let añoMes = funciones.añoMesSinGuion(fechaPicker);
        // Query para obtener los registros del mes indicado
        let query = {
            where: {
                [Op.and]: sequelize.literal("EXTRACT(YEAR_MONTH from fecha) = '" + añoMes + "'")
            }
        };
        const laminas = await lamina.findAll(query)
        res.render('tables', {
            nombrePagina: 'Datos',
            nombreUsuario: global.nombreUsuario,
            laminas: laminas,
            fechaPicker
        })
    }
    
}
exports.registrosPorMes = async (req, res) => {
    let { mes } = req.body;
    let añoMes = funciones.añoMesSinGuion(mes);
    fechaPicker = mes;
    let whereLabel = "EXTRACT(YEAR_MONTH from fecha) = '" + añoMes + "'";
    let query = {
        where: {
            [Op.and]: sequelize.literal(whereLabel)
        }
    };
    const laminas = await lamina.findAll(query)
    res.render('tables', {
        nombrePagina: 'Datos',
        nombreUsuario: global.nombreUsuario,
        laminas: laminas,
        fechaPicker
    })

}