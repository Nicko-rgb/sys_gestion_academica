const Periodos = require('../models/Periodos');

const InsertPeriodo = async () => {
    const periodos = [
        {
            nombre: 'CICLO 1',
            fecha_inicio: '10-04-2024',
            fecha_fin: '08-08-2024'
        },
        {
            nombre: 'CICLO 2',
            fecha_inicio: '28-08-2024',
            fecha_fin: '07-12-2024'
        },
        {
            nombre: 'CICLO 3',
            fecha_inicio: '10-04-2025',
            fecha_fin: '08-08-2025'
        },
        {
            nombre: 'CICLO 4',
            fecha_inicio: '28-08-2025',
            fecha_fin: '07-12-2025'
        },
        {
            nombre: 'CICLO 5',
            fecha_inicio: '10-04-2026',
            fecha_fin: '08-08-2026'
        },
        {
            nombre: 'CICLO 6',
            fecha_inicio: '28-08-2026',
            fecha_fin: '07-12-2026'
        }
    ]

    // Usar Promise.all para insertar carreras sin duplicados
    await Promise.all(periodos.map(async (periodo) => {
        try {
            // Verificar si la periodo ya existe
            const existingPeriodo = await Periodos.findOne({ where: { nombre: periodo.nombre } });

            if (!existingPeriodo) {
                // Solo insertar si no existe
                await Periodos.create(periodo);
            }
        } catch (error) {
            console.error(`Error al insertar periodo ${periodo.nombre}:`, error);
        }
    }));

}

module.exports = InsertPeriodo