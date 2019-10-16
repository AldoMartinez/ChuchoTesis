// Variables del formulario.
const mes1 = document.getElementById('mes1');
const lineaProduccionSeleccionada = document.getElementById('lpRH');
const form = document.getElementById('indicesComparacionForm');

// Obtiene los datos correspondientes a los meses seleccionados en el formulario.
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validarCamposRH()) {
        alert("Todos los campos son requeridos");
        return;
    }
    const url = "/consultaIndicesReales/" + mes1.value + "&" + lineaProduccionSeleccionada.value;
    console.log(url);
    fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            console.log(data);

            // Actualiza los valores de la tabla.
            const indicesAsignadosMes1 = asignarLaminasIndices(data.indices1, data.laminas1);
            let fechasChart = obtenerDiasMes();
            let [indicesRealesMes1, indicesCalculadosMes1] = convertir31Valores(indicesAsignadosMes1);

            // Validación de los datos de cada mes.
            var mensaje = "";
            if (indicesAsignadosMes1.length == 0) {
                var nombreMes1 = obtenerNombreMes(mes1.value);
                mensaje = mensaje + nombreMes1 + " no contiene datos";
            }

            // Muestra alerta si alguno de los meses no contiene datos.
            if(mensaje.length != 0) {
                alert(mensaje);
            }
            actualizarTabla(fechasChart, indicesRealesMes1, indicesCalculadosMes1);
        })
        .catch(error => console.log(error));
});

// Valida que los campos no estén vacíos del Registro Historico.
function validarCamposRH() {
    if(mes1.value == "" || lineaProduccionSeleccionada.value == "") {
        return false
    }
    return true;
}

// Asigna los valores a la gráfica.
function actualizarTabla(fechasChart, indicesReales, indicesCalculados) {

    // Pasa los valores a la configuración de la tabla.
    configIndicesRealesChart.data.labels = fechasChart;
    configIndicesRealesChart.data.datasets[0].label = "Indice Real";
    configIndicesRealesChart.data.datasets[0].data = indicesReales;
    configIndicesRealesChart.data.datasets[1].label = "Indice Calculado";
    configIndicesRealesChart.data.datasets[1].data = indicesCalculados;
    indicesRealesChart.update();
}

// Retorna los 31 dias del mes.
function obtenerDiasMes() {
    var diasDelMes = []
    for (let index = 1; index <= 31; index++) {
        let dia = index.toString();
        diasDelMes.push(dia);
    }
    return diasDelMes;
}

// Retorna el array con 31 valores.
function convertir31Valores(indices) {
    var indicesReales = [];
    var indicesCalculados = [];
    if (indices.length == 31) {
        indices.forEach(element => {
            if (element.indiceReal == Infinity || element.indiceCalculado == Infinity) {
                indicesReales.push("0");
                indicesCalculados.push("0");
            } else {
                indicesReales.push(element.indiceReal.toFixed(2));
                indicesCalculados.push(element.indiceCalculado.toFixed(2));
            }
        });
        return [indicesReales, indicesCalculados];
    }
    for (let x = 1; x <= 31; x++) {
        indicesReales.push("0");
        indicesCalculados.push("0");
        for (let j = 0; j < indices.length; j++) {
            let fecha = new Date(indices[j].fecha);
            fecha.setDate(fecha.getDate() + 1);
            if (fecha.getDate() == x) {
                if (indices[j].indiceReal != Infinity && indices[j].indiceCalculado != Infinity) {
                    indicesReales.pop();
                    indicesCalculados.pop();
                    indicesReales.push(indices[j].indiceReal.toFixed(2));
                    indicesCalculados.push(indices[j].indiceCalculado.toFixed(2));
                }
            }
        }
    }
    return [indicesReales, indicesCalculados];
}

// Retorna el nombre del mes que se le pasa su numero.
function obtenerNombreMes(mesSeleccionado) {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var numeroMesString = mesSeleccionado.slice(-2);
    var numeroMes = parseInt(numeroMesString) - 1;
    return meses[numeroMes];
}