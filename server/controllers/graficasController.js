const dia = require('../models/DatosDelDia');
const lamina = require('../models/Lamina');

const funciones = require('./funciones');

exports.graficasPage = (req, res) => {
    lamina.findAll()
        .then(function(laminas) {
            let fechaActual = funciones.obtenerFecha();
            dia.findAll()
            .then(function(dia) {
                res.render('charts', {
                    nombreUsuario: global.nombreUsuario,
                    laminas: laminas,
                    datosDelDia: dia
                })
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
}