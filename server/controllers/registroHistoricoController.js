// Se carga la configuración de la base de datos.
const sequelize = require('../config/database');

// Se cargan los modelos.
const dia = require('../models/DatosDelDia');
const lamina = require('../models/Lamina');
const lineaProduccion = require('../models/linea_produccion');

// Se cargan las utilidades.
const funciones = require('./funciones');
const routes = require('../routes/index');
const { Op } = Sequelize = require('sequelize');

// Muestra la vista del 'Registro Histórico'
exports.registroHistoricoGet = async (req, res) => {
    if (routes.sesion.email == null) {
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
// y retorna los datos de la laminas e indices en el response.
exports.consultarDatos = async (req, res) => {
    const añoMes1 = funciones.añoMesSinGuion(req.params.mes1);
    var query = obtenerQuery(añoMes1, req.params.lp);
    const laminas1 = await lamina.findAll(query);
    const indices1 = await dia.findAll(query);
    const resultados = {
        laminas1: laminas1,
        indices1: indices1
    }
    res.send(resultados);
}

// Se le pasa el añoMes del que se quiere traer todo los registros
function obtenerQuery(añoMes, lineaProduccion) {
    // Query para obtener los registros del mes actual
    let query = {
        where: {
            [Op.and]: sequelize.literal("EXTRACT(YEAR_MONTH from fecha) = '" + añoMes + "'"),
            linea_id: lineaProduccion
        },
        order: [['fecha', 'ASC']]
    };
    return query;
}