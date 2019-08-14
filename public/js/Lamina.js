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

    obtenerIndiceCalculado() {
        this.indiceCalculado = this.dross_calculado / this.areaTotal;
    }

    obtenerIndiceReal() {
        this.indiceReal = this.dross_real / this.areaTotal;
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


