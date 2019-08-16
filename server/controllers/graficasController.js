const dia = require('../models/DatosDelDia');
const lamina = require('../models/Lamina');

const funciones = require('./funciones');
const routes = require('../routes/index');

exports.graficasPage = (req, res) => {
    if(routes.sesion.email == null) {
        res.redirect("/login");
    } else {
        lamina.findAll()
        .then(function(laminas) {
            let fechaActual = funciones.obtenerFecha();
            dia.findAll()
            .then(function(dia) {
                res.render('charts', {
                    nombrePagina: 'Gráficas',
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