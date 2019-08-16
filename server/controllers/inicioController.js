const usuario = require('../models/Usuario');
const dia = require('../models/DatosDelDia');
const lamina = require('../models/Lamina');

const funciones = require('./funciones');

exports.inicioPage = (req, res) => {
    var nombresUsuario = "";
    var apellidosUsuario = "";
    usuario.findAll({
        where: {
            usuario_id: global.usuarioID
        }
    }).then(function(user) {
        nombresUsuario = user[0].nombres;
        apellidosUsuario = user[0].apellidos;
        global.nombreUsuario = nombresUsuario + " " + apellidosUsuario;
    })

    let fechaActual = funciones.obtenerFecha();
    dia.findAll({
        where: {
            fecha: funciones.obtenerFecha()
        }
    })
    .then(function(dia) {
        console.log("Datos del dia");
        console.log(dia.length);
        // Si ya hay un registro en datos del dia en el dia actual, ya no se permite introducir mas datos
        if(dia.length == 0) {
            res.render("index", {
                nombrePagina: 'Ingreso de datos',
                nombreUsuario: global.nombreUsuario
            })
        } else {
            res.render("index/noForm.pug", {
                nombrePagina: 'Ingreso de datos',
                nombreUsuario: global.nombreUsuario
            })
        }
    })
    .catch(error => console.log(error));
}

exports.agregarDatos = (req, res) => {
    // valida que todos los campos estén llenos
    let {pram, ancho, largo, espesor, temperatura_cinta, temperatura_paila, al_efectivo, velocidad} = req.body;
    let fecha = Date();

    let errores = [];
    if(!pram) {
        errores.push({"mensaje" : "Agrega la pram"});
    }
    if(!ancho) {
        errores.push({"mensaje" : "Agrega el ancho"});
    }
    if(!largo) {
        errores.push({"mensaje" : "Agrega el largo"});
    }
    if(!espesor) {
        errores.push({"mensaje" : "Agrega el espesor"});
    }
    if(!temperatura_cinta) {
        errores.push({"mensaje" : "Agrega la temperatura de cinta"});
    }
    if(!temperatura_paila) {
        errores.push({"mensaje" : "Agrega la temperatura de paila"});
    }
    if(!al_efectivo) {
        errores.push({"mensaje" : "Agrega el aluminio efectivo"});
    }
    if(!velocidad) {
        errores.push({"mensaje" : "Agrega la velocidad"});
    }

    if(errores.length > 0) {
        res.render('index', {
            errores,
            pram,
            ancho,
            largo,
            espesor,
            temperatura_cinta,
            temperatura_paila,
            al_efectivo,
            velocidad
        })
    } else {
        let successMessage = "Datos agregados correctamente";
        // agrega los datos de la lamina en la base de datos
        lamina.create({
            pram,
            ancho,
            largo,
            espesor,
            temperatura_cinta,
            temperatura_paila,
            al_efectivo,
            velocidad,
            fecha
        })
        .then(lamina => res.render('index', {
            nombrePagina: 'Ingreso de datos',
            successMessage
        }))
        .catch(error => console.log(error));
    }
    console.log(req.body);
}

exports.finalizarJornada = (req, res) => {
    let {peso_aluminio, peso_hierro, consumo_zinc, dross_real} = req.body;
    let fecha = Date();

    dia.create({
        peso_aluminio,
        peso_hierro,
        consumo_zinc,
        dross_real,
        fecha
    })
    .then(dia => res.redirect("/inicio"))
    .catch(error => console.log(error));
}