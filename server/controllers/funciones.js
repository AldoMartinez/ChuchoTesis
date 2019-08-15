 exports.obtenerFecha = function() {
    var currentTime = new Date();
    var month = ("0" + (currentTime.getMonth() + 1)).slice(-2)
    var day = ("0" + currentTime.getDate()).slice(-2)
    var year = currentTime.getFullYear();
    const fecha = year + "-" + month + "-" + day;

    return fecha;
}