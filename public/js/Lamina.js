function Lamina(pram, ancho, largo, espesor, velocidad, aluminio, Tcinta, Tpaila, fecha) {
    this.pram = pram;
    this.largo = largo;
    this.ancho = ancho;
    this.espesor = espesor;
    this.velocidad = velocidad;
    this.aluminio = aluminio;
    this.Tcinta = Tcinta;
    this.Tpaila = Tpaila;
    this.fecha = fecha;

    this.area = obtenerArea(largo, ancho, espesor);
    this.ILT_nm = obtenerILT_nm(aluminio);
    this.ILT_m = obtenerILT_m(this.ILT_nm);
    this.tiempo = obtenerTiempo(velocidad);
    this.Tcinta_k = obtenerTcintaK(Tcinta);
    this.Tpaila_k = obtenerTpailaK(Tpaila);
    this.Tbano = obtenerTbano(this.Tcinta_k, this.Tpaila_k, this.tiempo, espesor);
    this.D = obtenerDiffusionCoefficient(this.Tbano);
    this.q_m3 = obtenerFeDifussion(this.D, this.ILT_m, this.area, velocidad);
    this.q_kg = obtenerQ_kg(this.q_m3);

    function obtenerArea(largo, ancho, espesor) {
        const primerBloque = 2 * largo * ancho / 1000;
        const segundoBloque = 2 * largo * espesor / 1000;
        const tercerBloque = 2 * ancho * espesor / 1000;
        const area = primerBloque + segundoBloque + tercerBloque;

        return area;
    }

    function obtenerILT_nm(aluminio) {
        const resultado = 866 + (366 * Math.log(aluminio));

        return resultado;
    }

    function obtenerILT_m(ILT_nm) {
        const resultado = ILT_nm * (0.000000001);

        return resultado;
    }

    function obtenerTiempo(velocidad) {
        const resultado = 2.76 / (velocidad / 60);

        return resultado;
    }

    function obtenerTpailaK(Tpaila) {
        return Tpaila + 273.15;
    }

    function obtenerTcintaK(Tcinta) {
        return Tcinta + 273.15;
    }

    function obtenerTbano(Tcinta_k, Tpaila_k, tiempo, espesor) {
        const diferenciasT = Tcinta_k - Tpaila_k;

        const numeroAExponenciar = (-1500 * tiempo) / (7880 * (espesor / 1000) * 477);
        const segundoFactor = Math.exp(numeroAExponenciar);

        return diferenciasT * segundoFactor + Tpaila_k;
    }


    // Obtiene el coeficiente de difusión de los atomos del metal
    function obtenerDiffusionCoefficient(Tbano) {
        const constante = 0.00000034779;
        const numeroAExponenciar = -139024 / (8.314 * Tbano);

        const resultado = constante * Math.exp(numeroAExponenciar);

        return resultado;
    }

    // Obtiene la difusión del hierro
    function obtenerFeDifussion(D, ILT_m, area, velocidad) {
        const primerFactor = (D * 99.991) / ILT_m;
        const tercerFactor = 2.76;
        const cuartoFactor = 1 / (velocidad / 60);

        const resultado = primerFactor * area * tercerFactor * cuartoFactor;

        return resultado;
    }

    function obtenerQ_kg(q_m3) {
        return q_m3 * 7880;
    }
}

class DatoDelDia {
    constructor(peso_aluminio, peso_hierro, consumo_zinc, dross_real, fecha) {
        this.peso_aluminio = peso_aluminio;
        this.peso_hierro = peso_hierro;
        this.consumo_zinc = consumo_zinc;
        this.dross_real = dross_real;
        this.fecha = fecha;
        // Suma de las q en kg del dia
        this.qTotal = 0;
        this.dross_calculado = 0;
        this.areaTotal = 0;
        this.indiceCalculado = 0;
        this.indiceReal = 0;
    }

    sumarQ(q_kg) {
        this.qTotal = this.qTotal + q_kg;
    }

    sumaArea(area) {
        this.areaTotal += area;
    }

    obtenerFe(peso_hierro, consumo_zinc, q) {
        var fe = (peso_hierro * consumo_zinc / 100) + q;

        return fe;
    }

    obtenerAl(peso_aluminio, consumo_zinc) {
        var al = peso_aluminio * consumo_zinc / 100;

        return al;
    }

    obtenerDrossCalculado() {
        var al = this.obtenerAl(this.peso_aluminio, this.consumo_zinc);
        var fe = this.obtenerFe(this.peso_hierro, this.consumo_zinc, this.qTotal);

        var dross = (al + fe) / 0.05;

        this.dross_calculado = dross;
    }
    // El indice se obtiene de la división del dross (Kg) entre Area (m^2)
    obtenerIndiceCalculado() {
        // let drossGramos = this.dross_calculado * 1000;
        // this.indiceCalculado = drossGramos / this.areaTotal;
        this.indiceCalculado = this.dross_calculado / this.areaTotal;
    }

    obtenerIndiceReal() {
        // let drossGramos = this.dross_real * 1000;
        // this.indiceReal = drossGramos / this.areaTotal;
        this.indiceReal = this.dross_real / this.areaTotal;
    }
}

class PuntoCartesiano {
    constructor(fecha, valor) {
        this.x = fecha;
        this.y = valor;
    }
}

var datosFinalesPorDia = [];

datosDelDia.forEach(dato => {
    var datoDelDia = new DatoDelDia(dato.peso_aluminio, dato.peso_hierro, dato.consumo_zinc, dato.dross_real, dato.fecha);

    // Crea un objeto Lamina si las fechas coinciden
    data.forEach(lamina => {
        if(datoDelDia.fecha == lamina.fecha) {
            var laminaObject = new Lamina(lamina.pram,lamina.ancho, lamina.largo, lamina.espesor, lamina.velocidad, lamina.al_efectivo, lamina.temperatura_cinta, lamina.temperatura_paila, lamina.fecha);
            datoDelDia.sumarQ(laminaObject.q_kg);
            datoDelDia.sumaArea(laminaObject.area);
        }
    })
    datoDelDia.obtenerDrossCalculado();
    datoDelDia.obtenerIndiceCalculado();
    datoDelDia.obtenerIndiceReal();
    datosFinalesPorDia.push(datoDelDia);
});

console.log(datosFinalesPorDia);

// Acomodo de datos para la gráfica
var fechas = [];
var valores = [];

datosFinalesPorDia.forEach(datoPorDia => {
    let fecha = new Date(datoPorDia.fecha);
    fechas.push(fecha);
    valores.push(datoPorDia.indiceCalculado);
    // let coordenada = new PuntoCartesiano(fecha, datoPorDia.indiceCalculado);
    // chartData.push(coordenada);
});

console.log(fechas);


// DEPRECATED
window.randomScalingFactor = function() {
    let valor = Math.round(Samples.utils.rand(0, 10));
    return valor
};
var timeFormat = 'MM/DD/YYYY';
function newDate(days) {
    let fecha = moment().add(days, 'd').toDate();
    console.log(fecha);
    return fecha;
}
function newDateString(days) {
    return moment().add(days, 'd').format(timeFormat);
}
var color = Chart.helpers.color;
var config = {
    type: 'line',
    data: {
        labels: fechas,
        datasets: [{
            label: 'Indice Calculado',
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            fill: false,
            lineTension: 0,
            data: valores,
        }, {
            label: 'Indice Real',
            //backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
            //borderColor: window.chartColors.blue,
            fill: false,
            backgroundColor: "rgba(78, 115, 223, 0.05)",
            borderColor: "rgba(78, 115, 223, 1)",
            pointRadius: 3,
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "rgba(78, 115, 223, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
        }]
    },
    options: {
        maintainAspectRatio: false,
        layout: {
            padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
            }
        },
        title: {
            text: 'Chart.js Time Scale'
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'day',
                    parser: timeFormat,
                    round: 'day'
                    // tooltipFormat: 'll HH:mm'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Indice'
                },
                gridLines: {
                    color: "rgb(234, 236, 244)",
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2],
                    zeroLineBorderDash: [2]
                }
            }]
        },
    }
};
window.onload = function() {
    var ctx = document.getElementById('myAreaChart').getContext('2d');
    window.myLine = new Chart(ctx, config);
};