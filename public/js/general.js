
const lineasSelect = document.getElementsByClassName('lp');


for (let index = 0; index < lineasSelect.length; index++) {
    const linea = lineasSelect[index];
    indicesExistentes.forEach(indice => {
        if(linea.value == indice.linea_id) {
            linea.disabled = true;
        }
    });
}

// Call the dataTables jQuery plugin
$(document).ready(function() {
    $('#dataTable').DataTable();
  });
