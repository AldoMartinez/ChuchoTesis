
var datosFinalesPorDia = [];
// Asigna cada dato de una lamina a su correspondiente indice (tomando en cuenta la linea de producción)
datosDelDia.forEach(dato => {
    var datoDelDia = new DatoDelDia(dato.peso_aluminio, dato.peso_hierro, dato.consumo_zinc, dato.dross_real, dato.fecha, dato.linea_id);

    // Crea un objeto Lamina si las fechas coinciden
    data.forEach(lamina => {
        if(datoDelDia.fecha == lamina.fecha && datoDelDia.linea_id == lamina.linea_id) {
            var laminaObject = new Lamina(lamina.pram,lamina.ancho, lamina.largo, lamina.espesor, lamina.velocidad, lamina.al_efectivo, lamina.temperatura_cinta, lamina.temperatura_paila, lamina.fecha);
            datoDelDia.sumarQ(laminaObject.q_kg);
            datoDelDia.sumaArea(laminaObject.area);
        }
    })
    datoDelDia.obtenerDrossCalculado();
    datoDelDia.obtenerIndiceCalculado();
    datoDelDia.obtenerIndiceReal();
    datosFinalesPorDia.push(datoDelDia);
});

// Obtener linea de producción seleccionada
const lpSeleccionada = document.getElementById('lineaProduccionS');

// Acomodo de datos para la gráfica
var [fechas, valores, indiceReal, drossCalculado, area] = asignarValores();

function asignarValores() {
    let fechas = [];
    let valores = [];
    let indiceReal = [];
    let drossCalculado = [];
    let area = [];
    
    this.datosFinalesPorDia.forEach(datoPorDia => {
        if(datoPorDia.linea_id == lpSeleccionada.value) {
            let fecha = new Date(datoPorDia.fecha); // Retorna la fecha con un dia anterior
            fecha.setDate(fecha.getDate() + 1); // Añade un dia a la fecha
            fechas.push(fecha);
            // Indice calcuado con 4 digitos
            let icCuatroDigitos = datoPorDia.indiceCalculado.toFixed(4);
            valores.push(icCuatroDigitos);
            // Indice real con 4 digitos
            let irCuatroDigitos = datoPorDia.indiceReal.toFixed(4);
            indiceReal.push(irCuatroDigitos);
            // Dross calculado con 4 dígitos
            let drossCuatroDigitos = datoPorDia.dross_calculado.toFixed(4);
            drossCalculado.push(drossCuatroDigitos);
            // Area con 4 digitos
            let areaCuatroDigitos = datoPorDia.areaTotal.toFixed(4);
            area.push(areaCuatroDigitos);
            
        }
    });
    return [fechas, valores, indiceReal, drossCalculado, area];
}
// Cambia los valores de la grafica cuando se selecciona otra linea de producción
lpSeleccionada.addEventListener("change", function() {
    let [fechas, valores, drossCalculado, area] = asignarValores();
    // Indice calculado vs Indice real Chart
    config.data.labels = fechas;
    config.data.datasets[0].data = valores;
    config.data.datasets[1].data = indiceReal;
    // Dross calculado Chart
    configBarChart.data.labels = fechas;
    configBarChart.data.datasets[0].data = drossCalculado;
    // Area Chart
    areaChartConfig.data.labels = fechas;
    areaChartConfig.data.datasets[0].data = area;

    // Actualizar valores de las graficas
    window.indicesChart.update();
    drossChartRendimiento.update();
    window.areaChart.update();
});
