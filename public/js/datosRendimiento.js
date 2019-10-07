
var indicesAsignados = asignarLaminasIndices(datosDelDia, laminas);

// Linea de producción seleccionada.
const lpSeleccionada = document.getElementById('lineaProduccionS');

// Acomodo de datos para la gráfica.
var [fechas, valores, indiceReal, drossCalculado, area] = asignarValores(indicesAsignados, lpSeleccionada);

// Cambia los valores de la gráfica cuando se selecciona otra linea de producción.
lpSeleccionada.addEventListener("change", function() {
    let [fechas, valores, indiceReal, drossCalculado, area] = asignarValores(indicesAsignados, lpSeleccionada);
    
    // Indice calculado vs Indice real Chart.
    config.data.labels = fechas;
    config.data.datasets[0].data = valores;
    config.data.datasets[1].data = indiceReal;
    
    // Dross calculado Chart.
    configBarChart.data.labels = fechas;
    configBarChart.data.datasets[0].data = drossCalculado;
    
    // Area Chart.
    areaChartConfig.data.labels = fechas;
    areaChartConfig.data.datasets[0].data = area;
    
    // Actualiza los valores de las gráficas.
    window.indicesChart.update();
    drossChartRendimiento.update();
    window.areaChart.update();
});

// Asigna cada dato de una lamina a su correspondiente indice (tomando en cuenta la linea de producción).
function asignarLaminasIndices(indices, laminas) {
    var indicesArray = [];
    indices.forEach(dato => {
        var datoDelDia = new DatoDelDia(dato.peso_aluminio, dato.peso_hierro, dato.consumo_zinc, dato.dross_real, dato.fecha, dato.linea_id);
    
        // Crea un objeto Lamina si las fechas de la lámina y el índice coinciden.
        laminas.forEach(lamina => {
            if(datoDelDia.fecha == lamina.fecha && datoDelDia.linea_id == lamina.linea_id) {
                var laminaObject = new Lamina(lamina.pram,lamina.ancho, lamina.largo, lamina.espesor, lamina.velocidad, lamina.al_efectivo, lamina.temperatura_cinta, lamina.temperatura_paila, lamina.fecha);
                datoDelDia.sumarQ(laminaObject.q_kg);
                datoDelDia.sumaArea(laminaObject.area);
            }
        })
        datoDelDia.obtenerDrossCalculado();
        datoDelDia.obtenerIndiceCalculado();
        datoDelDia.obtenerIndiceReal();
        indicesArray.push(datoDelDia);
    });
    return indicesArray;
}

// Extrae la información de los índices y crea los arreglos necesarios
// para poder mostrar los datos en las gráficas.
// Opcion 
// 0 -> Retorna todos los array's
// Cualquier otra opcion -> retorna solo los indices reales y las fechas
function asignarValores(indicesAsignados, lineaProduccion, opcion=0) {
    let fechas = [];
    let valores = [];
    let indiceReal = [];
    let drossCalculado = [];
    let area = [];
    indicesAsignados.forEach(datoPorDia => {
        if (datoPorDia.linea_id == lineaProduccion.value) {
            let fecha = new Date(datoPorDia.fecha); // Retorna la fecha con un dia anterior
            fecha.setDate(fecha.getDate() + 1); // Añade un dia a la fecha
            fechas.push(fecha);

            // Índice calcuado con 4 dígitos.
            let icCuatroDigitos = datoPorDia.indiceCalculado.toFixed(2);
            valores.push(icCuatroDigitos);

            // Índice real con 4 dígitos.
            let irCuatroDigitos = datoPorDia.indiceReal.toFixed(2);
            indiceReal.push(irCuatroDigitos);

            // Dross calculado con 4 dígitos.
            let drossCuatroDigitos = datoPorDia.dross_calculado.toFixed(2);
            drossCalculado.push(drossCuatroDigitos);

            // Área con 4 dígitos.
            let areaCuatroDigitos = datoPorDia.areaTotal.toFixed(2);
            area.push(areaCuatroDigitos);
        }
    });
    if (opcion == 0) {
        return [fechas, valores, indiceReal, drossCalculado, area];
    } else {
        return [fechas, indiceReal];
    }
}