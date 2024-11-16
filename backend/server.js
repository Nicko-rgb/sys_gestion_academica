const express = require('express');
const { Pool } = require('pg'); // Requiere el módulo pg
const app = express();
const PORT = process.env.PORT || 3005;

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
    user: 'postgres', 
    host: 'localhost',
    database: 'gestion_academica',
    password: 'nick9090',
    port: 5432,
});

// Evento para confirmar la conexión
pool.connect()
    .then((client) => {
        console.log('DB Connected!');
        client.release(); // Libera la conexión
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

// Ejemplo de ruta que realiza una consulta a la base de datos
app.get('/api/students', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students'); 
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
