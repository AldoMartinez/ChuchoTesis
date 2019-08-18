const Sequelize = require('sequelize');

const db = require('../config/database');

const dia = db.define('datos_del_dia', {
    dia_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    peso_aluminio: {
        type: Sequelize.FLOAT
    },
    peso_hierro: {
        type: Sequelize.FLOAT
    },
    consumo_zinc: {
        type: Sequelize.FLOAT
    },
    dross_real: {
        type: Sequelize.FLOAT
    },
    fecha: {
        type: Sequelize.DATEONLY
    },
    linea_id: {
        type: Sequelize.INTEGER
    }
},
    {
        freezeTableName: true
    }
);

module.exports = dia;