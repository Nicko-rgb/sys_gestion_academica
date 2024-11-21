// models/PostulanteResultado.js
const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../db'); // Importa la instancia de sequelize
const  Postulantes = require('./Postulantes'); // Asegúrate de que la ruta sea correcta

const PostulanteResultado = sequelize.define('PostulanteResultado', {
    id_resultado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_postulante: {
        type: DataTypes.INTEGER,
        references: {
            model:  Postulantes, // Referencia al modelo Postulantes
            key: 'id_postulante' // Asegúrate de especificar la clave correcta aquí
        },
        allowNull: false // Es recomendable hacer este campo no nulo si siempre debe existir un postulante asociado.
    },
    puntaje: {
        type: DataTypes.STRING,
        allowNull: false
    },
    condicion: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});


module.exports = PostulanteResultado;