const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../db');
const Asignaturas = sequelize.define('Asignaturas', {
    id_asignatura: {
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
    creditos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    carrera_id: {
        type: DataTypes.INTEGER,
        allowNull: false // Relación con la tabla Carreras
    },
    periodo_id: {
        type: DataTypes.INTEGER,
        allowNull: false // Relación con la tabla Periodos_Academicos
    }
});

module.exports = Asignaturas;