// Retorna la fecha actual
// 2019-08-19
 exports.obtenerFecha = function() {
    var currentTime = new Date();
    var month = ("0" + (currentTime.getMonth() + 1)).slice(-2)
    var day = ("0" + currentTime.getDate()).slice(-2)
    var year = currentTime.getFullYear();
    const fecha = year + "-" + month + "-" + day;

    return fecha;
}
// Retorna la fecha actual
// 2019-08
exports.obtenerAñoMes = function() {
    var currentTime = new Date();
    var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);

    var year = currentTime.getFullYear();
    const fecha = year + "-" + month;

    return fecha;
}
// La fecha es un string (2019-08 => 201908)
exports.añoMesSinGuion = function(fecha) {
    let nuevaFecha = fecha.replace("-", "");
    return nuevaFecha;
}

// Crea un array con los objetos de linea de producción
exports.crearArrayLP = function (consultaBD){
    var lp = [];
    consultaBD.forEach(linea => {
        const linea_produccion = {linea_id: linea.linea_id};
        lp.push(linea_produccion);
    });
    return lp;
}