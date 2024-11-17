const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../db'); // Importa la instancia de sequelize

// Define el modelo Student
const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Define esta columna como clave primaria
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false         
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false 
    }
});

// Exporta el modelo Student
module.exports = Student;