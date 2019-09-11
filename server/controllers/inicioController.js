// Se cargan los modelos
const usuario = require('../models/Usuario');
const dia = require('../models/DatosDelDia');
const lamina = require('../models/Lamina');
const lineaProduccion = require('../models/linea_produccion');

// Se cargan las utilidades
const funciones = require('./funciones');
const routes = require('../routes/index');
const { Op } = Sequelize = require('sequelize');

// Se ejecuta cuando se carga la página 'Ingreso de datos'
exports.inicioPage = async (req, res) => {
    if (routes.sesion.email == null) {
        res.redirect("/login");
    } else {
        const lineas_produccion = await lineaProduccion.findAll();
        const lineasProduccionArray = funciones.crearArrayLP(lineas_produccion);
        usuario.findAll({
            where: {
                usuario_id: global.usuarioID
            }
        }).then(function(user) {
            global.nombreUsuario = user[0].nombres + " " + user[0].apellidos;
            dia.findAll({
                where: {
                    fecha: funciones.obtenerFecha(),
                    [Op.or]: lineasProduccionArray 
                }
            })
            .then(function(dias) {

                // Si ya hay un registro en datos del dia en el dia actual
                // ya no se permite introducir mas datos.
                if (dias.length < lineas_produccion.length) {
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

// Se ejecuta cuando se agrega una lamina.
exports.agregarDatos = async (req, res) => {

    // Valida que todos los campos estén llenos
    let {pram, ancho, largo, espesor, temperatura_cinta, temperatura_paila, al_efectivo, velocidad, linea_id} = req.body;
    let fecha = Date();
    let errores = [];
    if (!pram) {
        errores.push({"mensaje" : "Agrega la pram"});
    }
    if (!ancho) {
        errores.push({"mensaje" : "Agrega el ancho"});
    }
    if (!largo) {
        errores.push({"mensaje" : "Agrega el largo"});
    }
    if (!espesor) {
        errores.push({"mensaje" : "Agrega el espesor"});
    }
    if (!temperatura_cinta) {
        errores.push({"mensaje" : "Agrega la temperatura de cinta"});
    }
    if (!temperatura_paila) {
        errores.push({"mensaje" : "Agrega la temperatura de paila"});
    }
    if (!al_efectivo) {
        errores.push({"mensaje" : "Agrega el aluminio efectivo"});
    }
    if (!velocidad) {
        errores.push({"mensaje" : "Agrega la velocidad"});
    }
    if (!linea_id) {
        errores.push({"mensaje" : "Selecciona una linea de producción"});
    }
    const lineas_produccion = await lineaProduccion.findAll();
    if (errores.length > 0) {
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
        // Agrega los datos de la lamina en la base de datos
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
            const lineasProduccionArray = funciones.crearArrayLP(lineas_produccion);
            const dias = await dia.findAll({
                where: {
                    fecha: funciones.obtenerFecha(),
                    [Op.or]: lineasProduccionArray
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

// Guarda el índice del día en la base de datos.
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
