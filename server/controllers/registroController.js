// Carga los modelos.
const usuario = require('../models/Usuario');
const routes = require('../routes/index');

exports.registroPage = (req, res) => {
    if (routes.sesion.email == null) {
        res.redirect("/login");
    } else {
        res.render('registroCuenta', {
            nombrePagina: 'Registro'
        });
    }
    
}

exports.registroCuenta = (req, res) => {

    // Valida que todos los campos estén llenos.
    let {nombres, apellidos, correo, contrasena, contrasenaRepeat} = req.body;
    let errores = [];
    if (!nombres) {
        errores.push({'mensaje' : 'Agrega tus nombres'});
    }
    if (!apellidos) {
        errores.push({'mensaje' : 'Agrega tus apellidos'});
    }
    if (!correo) {
        errores.push({'mensaje' : 'Agrega tu correo'});
    }
    if (!contrasena) {
        errores.push({'mensaje' : 'Agrega tu contraseña'});
    }
    if (!contrasenaRepeat) {
        errores.push({'mensaje' : 'Confirma tu contraseña'});
    }
    if (contrasenaRepeat != contrasena) {
        errores.push({'mensaje' : "Las contraseñas no coinciden"});
    }

    // Valida si se encontraron o no errores en el formulario de registro de cuenta.
    if (errores.length > 0) {

        // Muestra la vista con errores.
        res.render('registroCuenta', {
            nombrePagina: 'Registro',
            errores,
            nombres,
            apellidos,
            correo
        })
    } else {

        // Guarda la nueva cuenta en la base de datos.
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