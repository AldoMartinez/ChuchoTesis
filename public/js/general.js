// $("#finalJornada").submit(function(e) {
//     e.preventDefault();
//     if( $("#peso_aluminio").val() == "") {
//         alert("El aluminio es necesario");
//     }
// })
console.log(indicesExistentes);

const lineasSelect = document.getElementsByClassName('lp');

for (let index = 0; index < lineasSelect.length; index++) {
    const linea = lineasSelect[index];
    indicesExistentes.forEach(indice => {
        if(linea.value == indice.linea_id) {
            linea.disabled = true;
        }
    });
}

lineasSelect[0].disabled = true;
console.log(lineasSelect);