const express = require('express');
const router = express.Router();

const usuario = require('../models/Usuario');
//var usuarioID = null;
global.usuarioID = null;
module.exports = function() {
    router.get('/login', (req, res) => {
        res.render('login');
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
            res.render("index", {
                nombres: nombresUsuario,
                apellidos: apellidosUsuario
            })
        })
    });
    router.post('/inicio', (req, res) => {
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
                    res.redirect('/login');
                }
            })
            .catch(error => console.log(error))
        
        //res.render('login');
    });
    router.get('/graficas', (req, res) => {
        res.render("charts");
    });
    router.get('/tabla', (req, res) => {
        res.render("tables");
    });
    return router
}