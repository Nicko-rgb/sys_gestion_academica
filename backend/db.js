// // db.js
// const { Sequelize } = require('sequelize');

// // Configura la conexión a la base de datos PostgreSQL
// const db = new Sequelize('gestion_academica', 'postgres', 'solsol03', {
//     host: 'localhost',
//     dialect: 'postgres',
//     logging: false
// });

// // Verifica la conexión
// db.authenticate()
//     .then(() => {
//         console.log('Conexión a la base de datos establecida correctamente.');
//     })
//     .catch(err => {
//         console.error('No se pudo conectar a la base de datos:', err);
//     });

// module.exports = db;
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:solsol03@localhost:5433/gestion_academica',{
    logging: false
})

module.exports=sequelize