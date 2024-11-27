const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../db'); 
const Estudiantes = require('./Estudiantes')

const Notas = sequelize.define('Notas', {
    id_nota: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_estudiante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Estudiantes,
            key: 'id_estudiante'
        }
    },
    curso: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    notas1: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    notas2: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    notas3: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    promedio: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
});

module.exports = Notas;
