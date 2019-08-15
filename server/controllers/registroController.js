exports.registroPage = (req, res) => {
    res.render('registro');
}

exports.registroCuenta = (req, res) => {
    // valida que todos los campos estén llenos
    let {nombres, apellidos, correo, contrasena, contrasenaRepeat} = req.body;

    let errores = [];
    if(!nombres) {
        errores.push({'mensaje' : 'Agrega tus nombres'})
    }
    if(!apellidos) {
        errores.push({'mensaje' : 'Agrega tus apellidos'})
    }
    if(!correo) {
        errores.push({'mensaje' : 'Agrega tu correo'})
    }
    if(!contrasena) {
        errores.push({'mensaje' : 'Agrega tu contraseña'})
    }
    if(!contrasenaRepeat) {
        errores.push({'mensaje' : 'Confirma tu contraseña'})
    }

    // revisar los errores
    if(errores.length > 0) {
        // muestra la vista con errores
        res.render('registro', {
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
        .then(usuario => res.redirect('/login'))
        .catch(error => console.log(error));
    }
    console.log(req.body);
}