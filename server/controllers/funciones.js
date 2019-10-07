// Retorna la fecha actual con el formato YYYY-MM-DD
 exports.obtenerFecha = function() {
    var currentTime = new Date();
    var month = ("0" + (currentTime.getMonth() + 1)).slice(-2)
    var day = ("0" + currentTime.getDate()).slice(-2)
    var year = currentTime.getFullYear();
    const fecha = year + "-" + month + "-" + day;
    return fecha;
}

// Retorna la fecha actual con el formato YYYY-MM
exports.obtenerAñoMes = function() {
    var currentTime = new Date();
    var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
    var year = currentTime.getFullYear();
    const fecha = year + "-" + month;
    return fecha;
}

// La fecha retornada por el selector del mes tiene el formato YYYY-MM.
// Esta función retorna la misma fecha en formato YYYYMM.
exports.añoMesSinGuion = function(fecha) {
    let nuevaFecha = fecha.replace("-", "");
    return nuevaFecha;
}

// Retorna un array con los objetos de linea de producción
exports.crearArrayLP = function (consultaBD) {
    var lineasDeProduccion = [];
    consultaBD.forEach(linea => {
        const linea_produccion = {linea_id: linea.linea_id};
        lineasDeProduccion.push(linea_produccion);
    });
    return lineasDeProduccion;
}