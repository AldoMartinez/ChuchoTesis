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
    temperatura_bano: {
        type: Sequelize.FLOAT
    },
    al_efectivo: {
        type: Sequelize.FLOAT
    },
    hierro: {
        type: Sequelize.FLOAT
    },
    velocidad: {
        type: Sequelize.FLOAT
    }
},
    {
        freezeTableName: true
    }
);

module.exports = lamina;
