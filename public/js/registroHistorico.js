
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
            const indicesAsignadosMes1 = asignarLaminasIndices(data.indices1, data.laminas1);
            const indicesAsignadosMes2 = asignarLaminasIndices(data.indices2, data.laminas2);
            let [fechasMes1, indicesRealesMes1] = asignarValores(indicesAsignadosMes1, lineaProduccionSeleccionada, 1);
            let [fechasMes2, indicesRealesMes2] = asignarValores(indicesAsignadosMes2, lineaProduccionSeleccionada, 1);
            
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
function mostrarTabla() {
    
}