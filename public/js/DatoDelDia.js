class DatoDelDia {
    constructor(peso_aluminio, peso_hierro, consumo_zinc, dross_real, fecha, linea_id) {
        this.peso_aluminio = peso_aluminio;
        this.peso_hierro = peso_hierro;
        this.consumo_zinc = consumo_zinc;
        this.dross_real = dross_real;
        this.fecha = fecha;
        this.linea_id = linea_id;
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
    // El indice se obtiene de la división del dross (g) entre Area (m^2)
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