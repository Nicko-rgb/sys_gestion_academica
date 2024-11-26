const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../db'); 

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
            model: 'Estudiantes',
            key: 'id_estudiante'
        }
    },
    id_asignatura: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Asignaturas',
            key: 'id_asignatura'
        }
    },
    nota: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    periodo_academico: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    fecha_emision: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    comentarios: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
});

module.exports = Notas;
