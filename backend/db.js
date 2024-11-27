// db.js
const { Sequelize } = require('sequelize');

// Configura la conexión a la base de datos PostgreSQL
const db = new Sequelize('gestion_academica', 'postgres', '159357', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
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
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = db;