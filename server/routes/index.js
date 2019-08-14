const express = require('express');
const router = express.Router();

const usuario = require('../models/Usuario');
const lamina = require('../models/Lamina');
const dia = require('../models/DatosDelDia');

//var usuarioID = null;
global.usuarioID = null;
global.nombreUsuario = "";
module.exports = function() {
    router.get('/login', (req, res) => {
        res.render('login');
    });
    router.post('/login', (req, res) => {
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
                        error: mensajeError,
                        correo
                    });
                }
            })
            .catch(error => console.log(error))
    });
    router.get('/registro', (req, res) => {
        res.render('registro');
    });
    // cuando se crea un usuario
    router.post('/registro', (req, res) => {
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
    });
    router.get('/inicio', (req, res) => {
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

        let fechaActual = obtenerFecha();
        dia.findAll({
            where: {
                fecha: obtenerFecha()
            }
        })
        .then(function(dia) {
            console.log("Datos del dia");
            console.log(dia.length);
            // Si ya hay un registro en datos del dia en el dia actual, ya no se permite introducir mas datos
            if(dia.length == 0) {
                res.render("index", {
                    nombreUsuario: global.nombreUsuario
                })
            } else {
                res.render("index/noForm.pug", {
                    nombreUsuario: global.nombreUsuario
                })
            }
        })
        .catch(error => console.log(error));
    });
    router.post('/inicio', (req, res) => {
        // valida que todos los campos estén llenos
        let {pram, ancho, largo, espesor, temperatura_cinta, temperatura_paila, al_efectivo, hierro, velocidad} = req.body;
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
        if(!hierro) {
            errores.push({"mensaje" : "Agrega el hierro"});
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
                hierro,
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
                hierro,
                velocidad,
                fecha
            })
            .then(lamina => res.render('index', {
                successMessage
            }))
            .catch(error => console.log(error));
        }
        console.log(req.body);
    });
    router.post("/valoresFinales", (req, res) => {
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
    })
    router.get('/graficas', (req, res) => {
        lamina.findAll()
            .then(function(laminas) {
                let fechaActual = obtenerFecha();
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
    });
    router.get('/tabla', (req, res) => {
        lamina.findAll()
            .then(function(laminas) {
                res.render('tables', {
                    nombreUsuario: global.nombreUsuario,
                    laminas: laminas
                })
            })
            .catch(error => console.log(error));
    });
    return router
}

function obtenerFecha() {
    var currentTime = new Date();
    var month = ("0" + (currentTime.getMonth() + 1)).slice(-2)
    var day = ("0" + currentTime.getDate()).slice(-2)
    var year = currentTime.getFullYear();
    const fecha = year + "-" + month + "-" + day;

    return fecha;
}