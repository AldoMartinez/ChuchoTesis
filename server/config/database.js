const Sequelize = require('sequelize');

module.exports = new Sequelize('chuchoTesis', 'root', 'root', {
    host: '127.0.0.1',
    port: '8889',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    operatorsAliases: false
});