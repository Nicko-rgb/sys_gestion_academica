const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../db');
const Carreras = require('./carreras')

const Asignaturas = sequelize.define('Asignaturas', {
    id_asignatura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    carrera_id: {
        type: DataTypes.INTEGER,
        allowNull: false ,
        references: {
            model: Carreras,
            key: 'id_carrera'
        }
    },
});

module.exports = Asignaturas;