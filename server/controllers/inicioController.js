// Modelos
const usuario = require('../models/Usuario');
const dia = require('../models/DatosDelDia');
const lamina = require('../models/Lamina');
const lineaProduccion = require('../models/linea_produccion');

const funciones = require('./funciones');
const routes = require('../routes/index');

const { Op } = Sequelize = require('sequelize');
// GET
exports.inicioPage = async (req, res) => {
    if(routes.sesion.email == null) {
        res.redirect("/login");
    } else {
        const lineas_produccion = await lineaProduccion.findAll();
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
            let fechaActual = funciones.obtenerFecha();
            dia.findAll({
                where: {
                    fecha: funciones.obtenerFecha(),
                    [Op.or]: [{linea_id: 1}, {linea_id: 2}, {linea_id: 3}] // Falta hacerlo dinámico
                }
            })
            .then(function(dias) {
                // Si ya hay un registro en datos del dia en el dia actual, ya no se permite introducir mas datos
                if(dias.length < lineas_produccion.length) {
                    res.render("index", {
                        nombrePagina: 'Ingreso de datos',
                        nombreUsuario: global.nombreUsuario,
                        lineas_produccion,
                        dias
                    })
                } else {
                    res.render("index/noForm.pug", {
                        nombrePagina: 'Ingreso de datos',
                        nombreUsuario: global.nombreUsuario
                    })
                }
            })
            .catch(error => console.log(error));
        })
    }
    
}
// POST
exports.agregarDatos = async (req, res) => {
    // valida que todos los campos estén llenos
    let {pram, ancho, largo, espesor, temperatura_cinta, temperatura_paila, al_efectivo, velocidad, linea_id} = req.body;
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
    if(!linea_id) {
        errores.push({"mensaje" : "Selecciona una linea de producción"});
    }
    const lineas_produccion = await lineaProduccion.findAll();
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
            velocidad,
            lineas_produccion
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
            fecha,
            linea_id
        })
        .then(async function(lamina) {
            const dias = await dia.findAll({
                where: {
                    fecha: funciones.obtenerFecha(),
                    [Op.or]: [{linea_id: 1}, {linea_id: 2}, {linea_id: 3}] // Falta hacerlo dinámico
                }
            });
            res.render('index', {
                nombrePagina: 'Ingreso de datos',
                successMessage,
                lineas_produccion,
                dias
            });
        })
        .catch(error => console.log(error));
    }
    console.log(req.body);
}

exports.finalizarJornada = (req, res) => {
    let {peso_aluminio, peso_hierro, consumo_zinc, dross_real, linea_id} = req.body;
    let fecha = Date();

    dia.create({
        peso_aluminio,
        peso_hierro,
        consumo_zinc,
        dross_real,
        fecha,
        linea_id
    })
    .then(dia => res.redirect("/inicio"))
    .catch(error => console.log(error));
}