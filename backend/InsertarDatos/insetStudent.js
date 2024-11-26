const Postulantes = require('../models/Postulantes');
const Estudiantes = require('../models/Estudiantes');
const PostulanteResultado = require('../models/PostulanteResultado');
const Carreras = require('../models/carreras');

const insertStudent = async () => {
    try {
        // Obtener los postulantes que tienen la condición "ingresó"
        const postulantesIngresados = await Postulantes.findAll({
            include: [{
                model: PostulanteResultado,
                as: 'resultado',
                where: { condicion: 'ingresó' } // Filtrar por condición
            }]
        });

        // Insertar en la tabla Estudiantes
        for (const postulante of postulantesIngresados) {
            // Verificar si el estudiante ya existe
            const existingStudent = await Estudiantes.findOne({
                where: { id_postulante: postulante.id_postulante } // Verifica por id_postulante
            });

            // Si no existe, proceder a insertar
            if (!existingStudent) {
                // Obtener el id_carrera según carrera_postulada
                const carrera = await Carreras.findOne({
                    where: { nombre: postulante.carrera_postulada } // Ajusta este campo según tu modelo
                });

                // Si se encuentra la carrera, se procede a insertar
                if (carrera) {
                    await Estudiantes.create({
                        id_postulante: postulante.id_postulante,
                        nombres: postulante.nombres,
                        apellidos: postulante.apellidos,
                        dni: postulante.dni,
                        fecha_nacimiento: postulante.fecha_naci,
                        email: postulante.email,
                        telefono: postulante.telefono,
                        direccion: postulante.direccion,
                        id_carrera: carrera.id_carrera, // Asigna el id_carrera encontrado
                        condicion: postulante.resultado.condicion 
                    });
                } 
            } 
        }

    } catch (error) {
        console.error("Error al pasar estudiantes de Postulante a Estudiante:", error);
    }
};

// Ejecutar la función cada 5 minutos (300000 ms)
setInterval(insertStudent, 3000);

// Si quieres ejecutar la función inmediatamente al iniciar el servidor, descomenta la siguiente línea:
// insertStudent();

module.exports = insertStudent;