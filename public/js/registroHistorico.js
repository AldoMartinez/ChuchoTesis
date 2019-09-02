
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
            // let [fechasMes1, indicesRealesMes1] = asignarValores(indicesAsignadosMes1, lineaProduccionSeleccionada, 1);
            // console.log(fechasMes1);
            // console.log(indicesRealesMes1);
            // let [fechasMes2, indicesRealesMes2] = asignarValores(indicesAsignadosMes2, lineaProduccionSeleccionada, 1);
            let fechasChart = obtenerDiasMes();
            let indicesRealesMes1 = convertir31Valores(indicesAsignadosMes1);
            let indicesRealesMes2 = convertir31Valores(indicesAsignadosMes2);
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

// Retorna los 31 dias del mes
function obtenerDiasMes() {
    var diasDelMes = []
    for (let index = 1; index <= 31; index++) {
        let dia = index.toString();
        diasDelMes.push(dia);
    }
    return diasDelMes;
}

// Retorna el array con 31 valores
function convertir31Valores(indices) {
    var valores = [];
    for (let x = 1; x <= 31; x++) {
        valores.push("0");
        for (let j = 0; j < indices.length; j++) {
            let fecha = new Date(indices[j].fecha);
            fecha.setDate(fecha.getDate() + 1);
            if(fecha.getDate() == x) {
                valores.pop();
                let indiceReal = indices[j].indiceReal.toFixed(4);
                valores.push(indiceReal);
            }
        }
        
    }
    return valores;
}