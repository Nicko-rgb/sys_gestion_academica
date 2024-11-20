const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../db');
const Estudiantes = sequelize.define('Estudiantes', {
    id_estudiante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        allowNull: false,
        unique: true
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    carrera_id: {
        type: DataTypes.INTEGER,
        allowNull: false // Relacionado con la tabla Carreras
    }
});

module.exports = Estudiantes;