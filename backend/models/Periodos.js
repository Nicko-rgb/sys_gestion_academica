const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../db');


const Periodos = sequelize.define('Periodos', {
    id_periodo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    fecha_inicio: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
});

module.exports = Periodos;