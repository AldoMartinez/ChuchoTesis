// Linea seleccionada en el select.
const lineasSelect = document.getElementsByClassName('lp');

// Solo puede existir un índice por linea de producción y por dia.
// Deshabilita la linea de producción en el select
// cuando ya existe un índice registrado en el dia actual
// en la base de datos.
for (let index = 0; index < lineasSelect.length; index++) {
    const lineaProduccion = lineasSelect[index];
    indicesExistentes.forEach(indice => {
        if (lineaProduccion.value == indice.linea_id) {
            lineaProduccion.disabled = true;
        }
    });
}

// Inicializa la tabla de los datos con la librería DataTables.
$(document).ready(function() {
    $('#dataTable').DataTable({
        dom: 'Bfrtip',
        buttons: ['excel', 'pdf', 'print']
    });
});
