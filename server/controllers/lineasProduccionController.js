const lineaProduccion = require('../models/linea_produccion');

exports.verLineasProduccion = async(req, res) => {
    const lineas = await lineaProduccion.findAll();
    res.render('lineasProduccion', {
        nombrePagina: 'Lineas de producción',
        lineas
    });
}

exports.agregarLineaProduccion = (req, res) => {
    let { nombre } = req.body;
    let errores = [];
    if(!nombre) {
        errores.push("El nombre es necesario");
    }

    if(errores.length > 0){
        res.render('lineasProduccion', {
            nombrePagina: 'Lineas de producción',
            errores
        })
    } else {
        lineaProduccion.create({
            nombre
        })
        .then(linea => res.redirect('/lineas_produccion'))
        .catch(error => console.log(error));
    }
}