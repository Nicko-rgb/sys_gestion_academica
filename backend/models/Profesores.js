const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../db'); // Importa la instancia de sequelize

const Profesores = sequelize.define('Profesores', {
    id_profesor: {
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
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    carrera_asignada: {
        type: DataTypes.STRING(100), 
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('Docente', 'Jefe de Área', 'Secretaria'),
        allowNull: false
    }
});

module.exports = Profesores;
