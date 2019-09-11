const Sequelize = require('sequelize');

const db = require('../config/database');

const lamina = db.define('lamina', {
    lamina_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    pram: {
        type: Sequelize.STRING
    },
    ancho: {
        type: Sequelize.FLOAT
    },
    largo: {
        type: Sequelize.FLOAT
    },
    espesor: {
        type: Sequelize.FLOAT
    },
    temperatura_cinta: {
        type: Sequelize.FLOAT
    },
    temperatura_paila: {
        type: Sequelize.FLOAT
    },
    al_efectivo: {
        type: Sequelize.FLOAT
    },
    velocidad: {
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
module.exports = db;
module.exports = lamina;
