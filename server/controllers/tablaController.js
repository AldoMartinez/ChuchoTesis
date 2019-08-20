const sequelize = require('../config/database');
const lamina = require('../models/Lamina');
const lineaProduccion = require('../models/linea_produccion');

const routes = require('../routes/index');
const funciones = require('./funciones');

const { Op } = Sequelize = require('sequelize');
// GET
exports.tablaPage = async (req, res) => {
    if(routes.sesion.email == null){
        res.redirect("login");
    } else {
        fechaPicker = funciones.obtenerAñoMes();
        let añoMes = funciones.añoMesSinGuion(fechaPicker);
        let query = getQuery(añoMes);
        lineaProduccion.hasMany(lamina, {foreignKey: 'linea_id'});
        lamina.belongsTo(lineaProduccion,{foreignKey: 'linea_id'});
        const laminas = await lamina.findAll(query);
        console.log(laminas);
        res.render('tables', {
            nombrePagina: 'Datos',
            nombreUsuario: global.nombreUsuario,
            laminas: laminas,
            fechaPicker
        })
    }
    
}
// Al cambar el mes
exports.registrosPorMes = async (req, res) => {
    let { mes } = req.body;
    let añoMes = funciones.añoMesSinGuion(mes);
    fechaPicker = mes;
    let query = getQuery(añoMes);
    lineaProduccion.hasMany(lamina, {foreignKey: 'linea_id'});
    lamina.belongsTo(lineaProduccion,{foreignKey: 'linea_id'});
    const laminas = await lamina.findAll(query);
    res.render('tables', {
        nombrePagina: 'Datos',
        nombreUsuario: global.nombreUsuario,
        laminas: laminas,
        fechaPicker
    })

}
// Query para obtener los registros del mes indicado y hacer inner join con linea de produccion
function getQuery(añoMes) {
    let query = {
        include: [{
            model: lineaProduccion,
            required: true
        }],
        where: {
            [Op.and]: sequelize.literal("EXTRACT(YEAR_MONTH from lamina.fecha) = '" + añoMes + "'")
        }
    };
    return query;
}