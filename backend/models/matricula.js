const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../db'); // Importa la instancia de sequelize
const Matriculas = sequelize.define('Matriculas', {
    id_matricula: {
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
    periodo_academico: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    fecha_matricula: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    estado_matricula: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    tipo_matricula: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    observaciones: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
});

module.exports = Matriculas;
