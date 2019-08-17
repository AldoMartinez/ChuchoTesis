const usuario = require('../models/Usuario');
const routes = require('../routes/index');

exports.loginControllerGet = (req, res) => {
    var date = new Date("2019-02-13");
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log(firstDay);
    console.log(lastDay);
    routes.sesion = req.session;
    routes.sesion.email = null;
    res.render('login', {
        nombrePagina: 'Login'
    });
}

exports.infoUsuario = (req, res) => {
    let {correo, contrasena} = req.body;
    var usuarios = [];
    usuario.findAll()
        .then(function(usuariosConsulta) {
            usuarios = usuariosConsulta;
            var usuarioCorrecto = false
            usuarios.forEach(user => {
                if(correo == user.correo && contrasena == user.contrasena) {
                    usuarioCorrecto = true;
                    global.usuarioID = user.usuario_id;
                }
            });
            if(usuarioCorrecto) {
                routes.sesion = req.session;
                routes.sesion.email = correo;
                res.redirect('/inicio');
            } else {
                let mensajeError = "El correo y la contraseña ingresados no coinciden";
                res.render('login', {
                    nombrePagina: 'Login',
                    error: mensajeError,
                    correo
                });
            }
        })
        .catch(error => console.log(error))
}