// Se carga la configuración de la base de datos.
const sequelize = require('../config/database');

// Se cargan los mdoelos.
const dia = require('../models/DatosDelDia');
const lamina = require('../models/Lamina');
const lineaProduccion = require('../models/linea_produccion');

// Se cargan las utilidades.
const funciones = require('./funciones');
const routes = require('../routes/index');
const { Op } = Sequelize = require('sequelize');

// Fecha actual en el formato YYYYMM.
var añoMes = funciones.obtenerAñoMes();
añoMes = funciones.añoMesSinGuion(añoMes);

// Query para obtener los registros del mes actual
let query = {
    where: {
        [Op.and]: sequelize.literal("EXTRACT(YEAR_MONTH from fecha) = '" + añoMes + "'")
    },
    order: [['fecha', 'ASC']]
};

// Muestra la vista 'Rendimiento'.
exports.rendimientoPage = (req, res) => {
    if (routes.sesion.email == null) {
        res.redirect("/login");
    } else {
        lamina.findAll(query)
        .then(function(laminas) {
            dia.findAll(query)
            .then(async function(dia) {
                const lineas_produccion = await lineaProduccion.findAll();
                res.render('rendimiento', {
                    nombrePagina: 'Rendimiento',
                    nombreUsuario: global.nombreUsuario,
                    laminas: laminas,
                    datosDelDia: dia,
                    lineas_produccion
                })
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }
}