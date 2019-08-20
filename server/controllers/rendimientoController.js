const sequelize = require('../config/database');

const dia = require('../models/DatosDelDia');
const lamina = require('../models/Lamina');
const lineaProduccion = require('../models/linea_produccion');

const funciones = require('./funciones');
const routes = require('../routes/index');

const { Op } = Sequelize = require('sequelize');

var añoMes = funciones.obtenerAñoMes();
añoMes = funciones.añoMesSinGuion(añoMes);
// Query para obtener los registros del mes actual
let query = {
    where: {
        [Op.and]: sequelize.literal("EXTRACT(YEAR_MONTH from fecha) = '" + añoMes + "'")
    },
    order: [['fecha', 'ASC']]
};

exports.rendimientoPage = (req, res) => {
    if(routes.sesion.email == null) {
        res.redirect("/login");
    } else {
        lamina.findAll(query)
        .then(function(laminas) {
            let fechaActual = funciones.obtenerFecha();
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