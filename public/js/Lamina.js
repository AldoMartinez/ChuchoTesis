// Clase Lamina
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
        const diferenciasTemperatura = Tcinta_k - Tpaila_k;
        const numeroAExponenciar = (-1500 * tiempo) / (7880 * (espesor / 1000) * 477);
        const segundoFactor = Math.exp(numeroAExponenciar);
        return diferenciasTemperatura * segundoFactor + Tpaila_k;
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