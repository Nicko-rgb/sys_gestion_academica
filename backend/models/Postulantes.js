const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../db'); // Importa la instancia de sequelize

const Postulantes = sequelize.define('Postulantes', {
    id_postulante: {
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
        allowNull: false
    },
    fecha_naci: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    colegio_origen: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    carrera_postulada: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
})

module.exports = Postulantes; 