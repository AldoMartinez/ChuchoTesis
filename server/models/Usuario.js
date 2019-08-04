const Sequelize = require('sequelize');

const db = require('../config/database');

const usuario = db.define('usuario', {
    usuario_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombres: {
        type: Sequelize.STRING
    },
    apellidos: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    contrasena: {
        type: Sequelize.STRING
    }
},
    {
        freezeTableName: true
    }
);

module.exports = usuario;