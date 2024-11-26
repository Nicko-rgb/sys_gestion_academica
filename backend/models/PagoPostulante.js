const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../db'); // Importa la instancia de sequelize
const Postulantes = require('./Postulantes')

const PagoPostulante = sequelize.define('PagoPostulante', {
    id_pago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_postulante : {
        type: DataTypes.STRING,
        references: {
            model: Postulantes,
            key: 'id_postulante',
        },
        allowNull: false
    },
    monto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_pago: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
})

module.exports = PagoPostulante