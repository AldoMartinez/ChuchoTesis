const usuario = require('../models/Usuario');

exports.loginControllerGet = (req, res) => {
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