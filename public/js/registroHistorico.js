// fetch("/consultaIndicesReales", {method: "POST"})
//     .then(function(res) {
//         return res.json();
//     })
//     .then(function(data) {
//         console.log(data);
//     });

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
            console.log(data);
        })
        .catch(error => console.log(error));
});

// Valida que los campos no estén vacíos del Registro Historico
function validarCamposRH() {
    console.log(mes1.value);
    console.log(mes2.value);
    console.log(lineaProduccionSeleccionada.value);
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