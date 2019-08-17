const dia = require('../models/DatosDelDia');
const lamina = require('../models/Lamina');

const funciones = require('./funciones');
const routes = require('../routes/index');

const { Op } = Sequelize = require('sequelize');
// Query para obtener los registros del mes actual
let query = {
    where: {
        fecha: {
            [Op.gte]: new Date('2019-08-01'),
            [Op.lt]: new Date('2019-08-31')
        }
    }
};

exports.rendimientoPage = (req, res) => {
    if(routes.sesion.email == null) {
        res.redirect("/login");
    } else {
        lamina.findAll(query)
        .then(function(laminas) {
            let fechaActual = funciones.obtenerFecha();
            dia.findAll(query)
            .then(function(dia) {
                res.render('rendimiento', {
                    nombrePagina: 'Rendimiento',
                    nombreUsuario: global.nombreUsuario,
                    laminas: laminas,
                    datosDelDia: dia
                })
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }
    
}