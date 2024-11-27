const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../db');
const Postulantes = require('./Postulantes')
const Carreras =require('./carreras')

const Estudiantes = sequelize.define('Estudiantes', {
    id_estudiante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_postulante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Postulantes,
            key: 'id_postulante'
        }
    },
    nombres: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    direccion: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    id_carrera: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Carreras,
            key: 'id_carrera'
        }
    },
    condicion: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Estudiantes;