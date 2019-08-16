const lamina = require('../models/Lamina');
const routes = require('../routes/index');

exports.tablaPage = (req, res) => {
    if(routes.sesion.email == null){
        res.redirect("login");
    } else {
        lamina.findAll()
        .then(function(laminas) {
            res.render('tables', {
                nombrePagina: 'Datos',
                nombreUsuario: global.nombreUsuario,
                laminas: laminas
            })
        })
        .catch(error => console.log(error));
    }
    
}