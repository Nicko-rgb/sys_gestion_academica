const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../db'); // Importa la instancia de sequelize
const Estudiante = require('./Estudiantes')

const Matricula = sequelize.define('Matriculas', {
    id_matricula: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_estudiante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Estudiante,
            key: 'id_estudiante'
        }
    },
    monto: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    nombre_periodo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    fecha_matricula: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_matricula: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'Matricula'
    }
});

module.exports = Matricula;
