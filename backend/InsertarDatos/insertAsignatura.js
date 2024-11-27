const Asignaturas = require('../models/Asignaturas')

const insertAsignatura = async() => {
    const asignaturas = [
        {
            nombre: 'Diseño Grafico',
            carrera_id: 5
        },
        {
            nombre: 'Taller de Sowfare',
            carrera_id: 5
        },
        {
            nombre: 'Diseño 3D',
            carrera_id: 5
        },
        {
            nombre: 'Modelamiento de Software',
            carrera_id: 5
        },
        {
            nombre: 'Seguridad Informactica',
            carrera_id: 5 
        }
    ]

    // Usar Promise.all para insertar carreras sin duplicados
    await Promise.all(asignaturas.map(async (asignatu) => {
        try {
            // Verificar si la asignatu ya existe
            const existingCarrera = await Asignaturas.findOne({ where: { nombre: asignatu.nombre } });
            
            if (!existingCarrera) {
                // Solo insertar si no existe
                await Asignaturas.create(asignatu);
            }
        } catch (error) {
           console.error(`Error al insertar asignatu ${asignatu.nombre}:`, error);
        }
    }));
}

module.exports = insertAsignatura