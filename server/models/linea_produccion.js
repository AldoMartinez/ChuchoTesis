const Sequelize = require('sequelize');
const db = require('../config/database');

const linea_produccion = db.define('linea_produccion', {
    linea_id: {
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nombre: {
        type: Sequelize.TEXT
    }
},
{
    freezeTableName: true
});

module.exports = linea_produccion;