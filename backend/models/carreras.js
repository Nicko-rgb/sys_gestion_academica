const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../db');
const Carreras = sequelize.define('Carreras', {
    id_carrera: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    codigo: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    duracion: {
        type: DataTypes.INTEGER, // Duración en semestres o años
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING(20), // Ejemplo: "activo" o "inactivo"
        allowNull: false
    }
});

module.exports = Carreras;
