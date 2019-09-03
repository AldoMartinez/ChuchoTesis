const usuario = require('../models/Usuario');
const routes = require('../routes/index');

exports.registroPage = (req, res) => {
    if(routes.sesion.email == null) {
        res.redirect("/login");
    } else {
        res.render('registroCuenta', {
            nombrePagina: 'Registro'
        });
    }
    
}

exports.registroCuenta = (req, res) => {
    // valida que todos los campos estén llenos
    let {nombres, apellidos, correo, contrasena, contrasenaRepeat} = req.body;

    let errores = [];
    if(!nombres) {
        errores.push({'mensaje' : 'Agrega tus nombres'});
    }
    if(!apellidos) {
        errores.push({'mensaje' : 'Agrega tus apellidos'});
    }
    if(!correo) {
        errores.push({'mensaje' : 'Agrega tu correo'});
    }
    if(!contrasena) {
        errores.push({'mensaje' : 'Agrega tu contraseña'});
    }
    if(!contrasenaRepeat) {
        errores.push({'mensaje' : 'Confirma tu contraseña'});
    }
    if(contrasenaRepeat != contrasena) {
        errores.push({'mensaje' : "Las contraseñas no coinciden"});
    }

    // revisar los errores
    if(errores.length > 0) {
        // muestra la vista con errores
        res.render('registroCuenta', {
            nombrePagina: 'Registro',
            errores,
            nombres,
            apellidos,
            correo
        })
    } else {
        // guardar la cuenta en la base de datos
        usuario.create({
            nombres,
            apellidos,
            correo,
            contrasena
        })
        .then(usuario => res.render('registroCuenta', {
            nombrePagina: 'Registro',
            successMessage: 'Se creo la cuenta correctamente'
        }))
        .catch(error => console.log(error));
    }
    console.log(req.body);
}