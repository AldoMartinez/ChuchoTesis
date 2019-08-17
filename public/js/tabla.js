// fetch("/tabla-mes")
//     .then(function(res) {
//         return res.json();
//     })
//     .then(function(laminas) {
//         let html = '';

//         laminas.forEach(lamina => {
//             html += `
//                 <tr role="row" class="odd">
//                     <td class="sorting_1">${lamina.id}</td>
//                     <td>${lamina.pram}</td>
//                 </tr>
//             `;
//         });
//         $('#registros').html(html);
//         // document.getElementById('registros').innerHTML = html;
//     })

// $('#seleccionMes').change(function() {
//     const mesSeleccionado = document.getElementById('seleccionMes');
//     console.log(mesSeleccionado.value);
//     window.location.href = "/tabla";
// })