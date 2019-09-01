
const mes1 = document.getElementById('mes1');
const mes2 = document.getElementById('mes2');
const lineaProduccionSeleccionada = document.getElementById('lpRH');
const form = document.getElementById('indicesComparacionForm');



form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(!validarCamposRH()){
        alert("Todos los campos son requeridos");
        return;
    }
    if(!validarMeses()) {
        alert("Los meses no deben coincidir");
        return;
    }
    const url = "/consultaIndicesReales/" + mes1.value + "&" + mes2.value + "&" + lineaProduccionSeleccionada.value;
    fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            // Actualiza los valores de la tabla
            const indicesAsignadosMes1 = asignarLaminasIndices(data.indices1, data.laminas1);
            const indicesAsignadosMes2 = asignarLaminasIndices(data.indices2, data.laminas2);
            let [fechasMes1, indicesRealesMes1] = asignarValores(indicesAsignadosMes1, lineaProduccionSeleccionada, 1);
            console.log(fechasMes1);
            console.log(indicesRealesMes1);
            let [fechasMes2, indicesRealesMes2] = asignarValores(indicesAsignadosMes2, lineaProduccionSeleccionada, 1);
            // let fechasChart = masFechas(fechasMes1, fechasMes2);
            let fechasChart = [];
            fechasMes1.forEach(fecha => {
                fechasChart.push(fecha);
            });
            fechasMes2.forEach(fecha => {
                fechasChart.push(fecha);
            });
            actualizarTabla(fechasChart, indicesRealesMes1, indicesRealesMes2);
        })
        .catch(error => console.log(error));
});

// Valida que los campos no estén vacíos del Registro Historico
function validarCamposRH() {
    if(mes1.value == "" || mes2.value == "" || lineaProduccionSeleccionada.value == "") {
        return false
    }
    return true;
}
// Valida que los meses no sean los mismos
function validarMeses() {
    if(mes1.value == mes2.value) {
        return false
    }
    return true;
}
// Asigna los valores a la gráfica
function actualizarTabla(fechasChart, indicesRealesMes1, indicesRealesMes2) {
    console.log(configIndicesRealesChart);
    console.log(window.indicesRealesChart);
    // Pasa los valores a la configuración de la tabla
    configIndicesRealesChart.data.labels = fechasChart;
    configIndicesRealesChart.data.datasets[0].data = indicesRealesMes1;
    configIndicesRealesChart.data.datasets[1].data = indicesRealesMes2;

    indicesRealesChart.update();
}

// Retorna el array de fechas que contiene más datos
function masFechas(fechasMes1, fechasMes2) {
    let contadorMes1 = fechasMes1.length;
    let contadorMes2 = fechasMes2.length;

    return contadorMes1 >= contadorMes2 ? fechasMes1 : fechasMes2;
}