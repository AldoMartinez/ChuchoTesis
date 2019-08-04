var inicio = document.getElementById('inicioSB');
var graficas = document.getElementById('graficasSB');
var tabla = document.getElementById('tablaSB');
var botonesSB = document.getElementById("accordionSidebar");
var botones = botonesSB.getElementsByClassName('nav-item');

for (var i=0; i < botones.length; i++) {
    botones[i].addEventListener('click', function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}


tabla.addEventListener('click', function() {
    console.log(botones);
    console.log("Tabla pulsado");
});