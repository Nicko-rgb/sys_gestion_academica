// Traemos el modelo de datos Carrera
const Carrera = require('../models/carreras');

const InsertCarreras = async () => {
    const carreras = [
        {
            nombre: 'Administración de Empresas',
            codigo: '0001',
            descripcion: 'Carrera técnica en administración de empresas.',
            duracion: 6,
            estado: 'activo'
        },
        {
            nombre: 'Administración de Operaciones Turísticas',
            codigo: '0002',
            descripcion: 'Carrera técnica en administración de operaciones turísticas.',
            duracion: 6,
            estado: 'activo'
        },
        {
            nombre: 'Asistencia Administrativa',
            codigo: '0003',
            descripcion: 'Carrera técnica en asistencia administrativa.',
            duracion: 6,
            estado: 'activo'
        },
        {
            nombre: 'Contabilidad',
            codigo: '0004',
            descripcion: 'Carrera técnica en contabilidad.',
            duracion: 6,
            estado: 'activo'
        },
        {
            nombre: 'Construcción Civil',
            codigo: '0005',
            descripcion: 'Carrera técnica de construcción civil.',
            duracion: 6,
            estado: 'activo'
        },
        {
            nombre: 'Desarrollo de Sistemas de Información',
            codigo: '0006',
            descripcion: 'Carrera técnica en desarrollo de sistemas de información.',
            duracion: 6,
            estado: 'activo'
        },
        {
            nombre: 'Electricidad Industrial',
            codigo: '0007',
            descripcion: 'Carrera técnica en electricidad industrial.',
            duracion: 6,
            estado: 'activo'
        },
        {
            nombre: 'Enfermería Técnica',
            codigo: '0008',
            descripcion: 'Carrera técnica en enfermería.',
            duracion: 6,
            estado: 'activo'
        },
        {
            nombre: 'Manejo Forestal',
            codigo: '0009',
            descripcion: 'Carrera técnica en manejo forestal.',
            duracion: 6,
            estado: 'activo'
        },
        {
            nombre: 'Mecatrónica Automotriz',
            codigo: '0010',
            descripcion: 'Carrera técnica en mecatrónica automotriz.',
            duracion: 6,
            estado: 'activo'
        },
        {
            nombre: 'Producción Agropecuaria',
            codigo: '0011',
            descripcion: 'Carrera técnica en producción agropecuaria.',
            duracion: 6,
            estado: 'activo'
        }
    ];

    // Usar Promise.all para insertar carreras sin duplicados
    await Promise.all(carreras.map(async (carrera) => {
        try {
            // Verificar si la carrera ya existe
            const existingCarrera = await Carrera.findOne({ where: { codigo: carrera.codigo } });
            
            if (!existingCarrera) {
                // Solo insertar si no existe
                await Carrera.create(carrera);
            }
        } catch (error) {
           console.error(`Error al insertar carrera ${carrera.nombre}:`, error);
        }
    }));
};

// Exportamos
module.exports = InsertCarreras;