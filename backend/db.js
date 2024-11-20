// db.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar las variables de entorno

// Obtiene la URL de conexión desde las variables de entorno
const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

// Verifica la conexión
db.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err.message);
        console.error(err);
    });

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
module.exports = db;
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('postgres://postgres:solsol03@localhost:5433/gestion_academica',{
//     logging: false
// })

// module.exports=sequelize