const Admins = require('../models/Admin');
const bcrypt = require('bcryptjs');

const AdminDefault = async () => {
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
}

// Exportamos
module.exports = AdminDefault;