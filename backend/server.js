const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const db = require('./db');
const Admins  = require('./models/Admin');

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Sincroniza los modelos con la base de datos
db.sync({ alter: true })
    .then(() => {
        console.log('Modelos sincronizados con la base de datos.');
    })
    .catch(err => {
        console.error('Error al sincronizar los modelos:', err);
    });

//ruta para registrar un nuevo admin
app.post('/api/register-admin', async (req, res) => {
    const { dni, nombres, apellidos, email, telefono, rol, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newAdmin = await Admins.create({ dni, nombres, apellidos, email, telefono, rol, password: hashedPassword });
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el administrador.' });
    }
});

// Ruta para obtener todos los administradores
app.get('/api/admins-all', async (req, res) => {
    try {
        const admins = await Admins.findAll(); // Obtiene todos los registros de la tabla Admins
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener la lista de administradores.' });
    }
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});