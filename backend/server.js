const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const db = require('./db');
const Admins = require('./models/Admin');
const postulantes = require("./models/Postulantes")

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

// Sincroniza los modelos con la base de datos
// Sincroniza los modelos con la base de datos
db.sync({ alter: true })
db.sync({ alter: true }) // O { force: true } si quieres reiniciar la tabla
    .then(async () => {
        console.log('Modelos sincronizados con la base de datos.');

        // Verifica si existe un administrador por defecto
        const defaultAdminDNI = 12345678; // Reemplaza con el DNI que prefieras
        const defaultAdmin = await Admins.findOne({ where: { dni: defaultAdminDNI } });

        if (!defaultAdmin) {
            // Si no existe, crea el administrador por defecto
            const hashedPassword = await bcrypt.hash('admin123', 10); // Reemplaza 'admin123' con tu contraseña por defecto
            await Admins.create({
                dni: defaultAdminDNI,
                nombres: 'Admin',
                apellidos: 'Default',
                email: 'admin@example.com', // Reemplaza con tu correo por defecto
                telefono: '123456789',
                rol: 'superadmin', // Define un rol adecuado
                password: hashedPassword,
                estado: 'activo'
            });
            console.log('Administrador por defecto creado correctamente.');
        } else {
            console.log('Administrador por defecto ya existe.');
        }
    })
    .catch(err => {
        console.error('Error al sincronizar los modelos:', err);
    });


//ruta para registrar un nuevo admin
app.post('/api/register-admin', async (req, res) => {
    const { dni, nombres, apellidos, email, telefono, rol, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await Admins.create({ dni, nombres, apellidos, email, telefono, rol, password: hashedPassword });
        res.json({ message: 'Admin creado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el administrador.' });
    }
});

// Ruta para obtener todos los administradores
app.get('/api/admins-all', async (req, res) => {
    try {
        const admins = await Admins.findAll();
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener la lista de administradores.' });
    }
});

//Ruta para inactivar estado de admin
// Ruta para inactivar un administrador
app.put('/api/admins-inactive/:id', async (req, res) => {
    const { id } = req.params; // ID del administrador
    const { estado } = req.body; // Estado que deseas actualizar, recibido desde el cliente

    try {
        // Actualizar el estado del administrador en la base de datos
        const [updated] = await Admins.update(
            { estado }, // Datos a actualizar
            { where: { id_admin: id } } // Condición para encontrar el registro
        );

        if (updated) {
            res.status(200).json({ message: 'Estado del administrador actualizado correctamente.' });
        } else {
            res.status(404).json({ error: 'Administrador no encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el estado del administrador.' });
    }
});


// Ruta para iniciar sesión de admins
app.post('/api/login', async (req, res) => {
    const { dni, password } = req.body;

    try {
        // Busca al administrador por DNI
        const admin = await Admins.findOne({ where: { dni } });

        if (!admin) {
            return res.status(401).json({ message: 'Administrador no encontrado' });
        }

        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        // Si la contraseña es correcta, devuelve un token de autenticación
        const token = jwt.sign({ dni: admin.dni }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({
            token,
            user: {
                id: admin.id_admin,
                nombres: admin.nombres,
                apellidos: admin.apellidos,
                correo: admin.email,
                dni: admin.dni,
                telefono: admin.telefono,
                rol: admin.rol,
                estado: admin.estado
            }
        });
        console.log('Inicio sesion exitoso');

    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).json({ message: 'Error en el servidorr' });
    }
});

//ruta para registrar un postulante 
app.post('/api/register-postulante', async (req, res) => {
    const { nombres, apellidos, dni, fecha_nacimiento, email, telefono, colegio, direccion, carrera } = req.body;
    try {
        await postulantes.create({
            nombres,
            apellidos,
            dni,
            fecha_naci: fecha_nacimiento, // Mapear correctamente
            email,
            telefono,
            colegio_origen: colegio, // Mapear correctamente
            direccion,
            carrera_postulada: carrera // Mapear correctamente
        });
        res.json({ message: 'Postulante creado correctamente' });
    } catch (error) {
        console.error('Error al crear el postulante:', error);
        res.status(500).json({ error: 'Error al crear el postulante.' });
    }
});
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)});
