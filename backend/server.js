const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const db = require('./db');
const inicalizaInsersion = require('./InsertarDatos/index')
// Importar todos los modelos
const {
    Admins,
    profesores,
    Estudiantes,
    Carreras,
    Periodos,
    Asignaturas,
    Postulantes,
    PostulanteResultado,
    PagoPostulante,
    Matricula,
    Notas
} = require('./models/index'); // Asegúrate de que la ruta sea correcta


const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

// Sincroniza los modelos con la base de datos
db.sync({ alter: true }) // O { force: true } si quieres reiniciar la tabla
    .then(async () => {
        console.log('Modelos sincronizados con la base de datos.');
        // Inicializa inseersion de datos a la base de datos
        inicalizaInsersion();
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
        // Crear el registro en la base de datos
        const postulante = await Postulantes.create({
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
        // Respuesta con datos del postulante creado
        res.status(201).json({
            message: 'Postulante creado correctamente',
            postulante: { id: postulante.id_postulante, nombres: postulante.nombres, apellidos: postulante.apellidos, dni: postulante.dni }
        });
    } catch (error) {
        console.error('Error al crear el postulante:', error);

        // Respuesta de error según el tipo de problema
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Datos inválidos en la solicitud', details: error.errors });
        }

        res.status(500).json({ error: 'Error interno al crear el postulante.' });
    }
});

// Ruta para registrar un pago de postulante
app.post('/api/register-pago/postulante', async (req, res) => {
    const { id_postulante, monto } = req.body;

    try {
        // Verifica que el postulante exista
        const postulante = await Postulantes.findByPk(id_postulante);
        if (!postulante) {
            return res.status(404).json({ message: 'Postulante no encontrado' });
        }

        // Crea el pago
        await PagoPostulante.create({
            id_postulante,
            monto,
            fecha_pago: new Date()
        });

        return res.status(201).json({ message: 'Pago registrado con éxito' });
    } catch (error) {
        console.error('Error al registrar el pago:', error);
        return res.status(500).json({ message: 'Error al registrar el pago', error: error.message });
    }
});


//ruta para eliminar postulante por id
app.delete('/api/delete-postulante/:id', async (req, res) => {
    const id_postulante = req.params.id; // Obtiene el ID del postulante desde los parámetros

    try {
        // Verifica que el postulante exista
        const postulante = await Postulantes.findByPk(id_postulante);
        if (!postulante) {
            return res.status(404).json({ message: 'Postulante no encontrado' });
        }

        // Elimina el postulante
        await Postulantes.destroy({ where: { id_postulante } });

        return res.status(200).json({ message: 'Postulante eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el postulante:', error);
        return res.status(500).json({ message: 'Error al eliminar el postulante', error: error.message });
    }
});


//ruta para obtner todos los postulante 
app.get('/api/obtener-postulantes', async (req, res) => {
    try {
        // Buscar todos los postulantes con sus resultados
        const postulantes = await Postulantes.findAll({
            include: {
                model: PostulanteResultado,
                as: 'resultado',
            },
        });

        res.status(200).json(postulantes);
    } catch (error) {
        console.error('Error al obtener los postulantes:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
})


//ruta para obtener datos de postulante por id
app.get('/api/postulante/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar el postulante con su resultado
        const postulante = await Postulantes.findByPk(id, {
            include: {
                model: require('./models/PostulanteResultado'),
                as: 'resultado', // Usa el alias definido en el modelo
            },
        });

        if (!postulante) {
            return res.status(404).json({ error: 'Postulante no encontrado' });
        }

        res.status(200).json(postulante);
    } catch (error) {
        console.error('Error al obtener postulante:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

// Obtener postulantes por nombre de carrera
app.get('/api/postulantes-carrera/:carrera', async (req, res) => {
    const carrera = req.params.carrera;
    try {
        const postulantes = await Postulantes.findAll({
            where: {
                carrera_postulada: carrera
            },
            include: {
                model: require('./models/PostulanteResultado'),
                as: 'resultado',
            }
        });

        res.json(postulantes);
    } catch (error) {
        console.error('Error al obtener postulantes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Ruta  para registrar puntaje de postulante 
app.post('/api/register/admision-puntos', async (req, res) => {
    const { id_postulante, puntaje, condicion } = req.body;
    try {
        const resultado = await PostulanteResultado.findOne({ where: { id_postulante } });

        if (resultado) {
            // Si existe, actualiza el registro
            resultado.puntaje = puntaje;
            resultado.condicion = condicion;
            await resultado.save();
            res.json({ message: 'Puntos actualizados exitosamente' });
        } else {
            // Si no existe, crea un nuevo registro
            await PostulanteResultado.create({
                id_postulante,
                puntaje,
                condicion
            });
            res.json({ message: 'Admision de puntos exitosa' });
        }
    } catch (error) {
        console.error('Error al registrar puntaje de postulante:', error);
        res.status(500).json({ message: 'Error al registrar puntaje' });
    }
});

//Api para obtener todos los estudiantes
app.get('/api/obtener-estudiantes', async (req, res) => {
    try {
        const estudiantes = await Estudiantes.findAll({
            include: [
                {
                    model: Carreras,
                    as: 'carrera',
                },
                {
                    model: Matricula,
                    as: 'matricula',
                },
                {
                    model: Postulantes,
                    as: 'postulante',
                },
                {
                    model: Notas,
                    as: 'notas',
                }
            ]
        });
        res.json(estudiantes);
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        res.status(500).json({ error: 'Error al obtener estudiantes' });
    }
});


//Ruta para registrar  las Matriculas
app.post('/api/registrar-matricula', async (req, res) => {
    const { id_estudiante, monto, nombre_periodo } = req.body;

    try {
        // Verifica si ya existe una matrícula con el mismo id_estudiante y nombre_periodo
        const matriculaExistente = await Matricula.findOne({
            where: {
                id_estudiante,
                nombre_periodo,
            },
        });

        if (matriculaExistente) {
            return res.status(400).json({
                error: 'Ya existe una matrícula para este estudiante en el período indicado.',
            });
        }

        // Crea una nueva matrícula si no existe
        const nuevaMatricula = await Matricula.create({
            id_estudiante,
            monto,
            nombre_periodo,
            fecha_matricula: new Date().toISOString().split('T')[0], // Fecha actual
        });

        res.status(201).json(nuevaMatricula);
    } catch (error) {
        console.error('Error al registrar la matrícula:', error);
        res.status(500).json({ error: 'Error al registrar la matrícula' });
    }
});


//ruta para obtner todas las asignatuas
app.get('/api/asignaturas', async (req, res) => {
    try {
        const asignaturas = await Asignaturas.findAll();
        res.json(asignaturas);
    } catch (error) {
        console.error('Error al obtener asignaturas:', error);
    }
})

// Ruta para registrar un nuevo profesor (POST)
app.post('/api/register-profesor', async (req, res) => {
    const { nombres, apellidos, dni, email, telefono, carrera_asignada, rol } = req.body;

    try {
        const nuevoProfesor = await profesores.create({
            nombres,
            apellidos,
            dni,
            email,
            telefono,
            carrera_asignada,
            rol
        });
        res.status(201).json({ message: 'Profesor creado correctamente', profesor: nuevoProfesor });
    } catch (error) {
        console.error('Error al crear el profesor:', error);
        res.status(500).json({ error: 'Error al crear el profesor.' });
    }
});

// Ruta para obtener todos los profesores (GET)
app.get('/api/profesores-all', async (req, res) => {
    try {
        const profesores = await profesores.findAll();
        res.status(200).json(profesores);
    } catch (error) {
        console.error('Error al obtener los profesores:', error);
        res.status(500).json({ error: 'Error al obtener los profesores.' });
    }
});

// Ruta para actualizar un profesor por ID (PUT)
app.put('/api/profesores-update/:id', async (req, res) => {
    const { id } = req.params; // ID del profesor a actualizar
    const { nombres, apellidos, email, telefono, carrera_asignada, rol } = req.body; // Datos a actualizar

    try {
        const [updated] = await profesores.update(
            { nombres, apellidos, email, telefono, carrera_asignada, rol }, // Datos nuevos
            { where: { id_profesor: id } } // Condición para encontrar el registro
        );

        if (updated) {
            res.status(200).json({ message: 'Profesor actualizado correctamente.' });
        } else {
            res.status(404).json({ error: 'Profesor no encontrado.' });
        }
    } catch (error) {
        console.error('Error al actualizar el profesor:', error);
        res.status(500).json({ error: 'Error al actualizar el profesor.' });
    }
});
app.post('/api/register-estudiante', async (req, res) => {
    const { nombres, apellidos, dni, fecha_nacimiento, email, telefono, direccion, carrera_id } = req.body;

    try {
        const nuevoEstudiante = await estudiantes.create({
            nombres,
            apellidos,
            dni,
            fecha_nacimiento,
            email,
            telefono,
            direccion,
            carrera_id
        });
        res.status(201).json({ message: 'Estudiante creado correctamente', estudiante: nuevoEstudiante });
    } catch (error) {
        console.error('Error al crear el estudiante:', error);
        res.status(500).json({ error: 'Error al crear el estudiante.' });
    }
});
app.put('/api/estudiantes-update/:id', async (req, res) => {
    const { id } = req.params; // ID del estudiante
    const { nombres, apellidos, dni, fecha_nacimiento, email, telefono, direccion, carrera_id } = req.body;

    try {
        const [updated] = await estudiantes.update(
            { nombres, apellidos, dni, fecha_nacimiento, email, telefono, direccion, carrera_id },
            { where: { id_estudiante: id } }
        );

        if (updated) {
            res.status(200).json({ message: 'Estudiante actualizado correctamente.' });
        } else {
            res.status(404).json({ error: 'Estudiante no encontrado.' });
        }
    } catch (error) {
        console.error('Error al actualizar el estudiante:', error);
        res.status(500).json({ error: 'Error al actualizar el estudiante.' });
    }
});
app.get('/api/estudiantes-all', async (req, res) => {
    try {
        const estudiantes = await estudiantes.findAll();
        res.status(200).json(estudiantes);
    } catch (error) {
        console.error('Error al obtener los estudiantes:', error);
        res.status(500).json({ error: 'Error al obtener los estudiantes.' });
    }
});
// POST: Registrar una carrera
app.post('/api/register-carrera', async (req, res) => {
    const { nombre, codigo, descripcion, duracion, estado } = req.body;

    try {
        const nuevaCarrera = await Carreras.create({ nombre, codigo, descripcion, duracion, estado });
        res.status(201).json({ message: 'Carrera creada correctamente', carrera: nuevaCarrera });
    } catch (error) {
        console.error('Error al crear la carrera:', error);
        res.status(500).json({ error: 'Error al crear la carrera.' });
    }
});

// GET: Obtener todas las carreras
app.get('/api/carreras-all', async (req, res) => {
    try {
        const carreras = await Carreras.findAll();
        res.status(200).json(carreras);
    } catch (error) {
        console.error('Error al obtener las carreras:', error);
        res.status(500).json({ error: 'Error al obtener las carreras.' });
    }
});

// PUT: Actualizar una carrera
app.put('/api/carreras-update/:id', async (req, res) => {
    const { id } = req.params; // ID de la carrera
    const { nombre, codigo, descripcion, duracion, estado } = req.body;

    try {
        const [updated] = await Carreras.update(
            { nombre, codigo, descripcion, duracion, estado },
            { where: { id_carrera: id } }
        );

        if (updated) {
            res.status(200).json({ message: 'Carrera actualizada correctamente.' });
        } else {
            res.status(404).json({ error: 'Carrera no encontrada.' });
        }
    } catch (error) {
        console.error('Error al actualizar la carrera:', error);
        res.status(500).json({ error: 'Error al actualizar la carrera.' });
    }
});
// POST: Registrar un periodo académico
app.post('/api/register-periodo', async (req, res) => {
    const { nombre, fecha_inicio, fecha_fin, estado } = req.body;

    try {
        const nuevoPeriodo = await Periodos.create({ nombre, fecha_inicio, fecha_fin, estado });
        res.status(201).json({ message: 'Periodo académico creado correctamente', periodo: nuevoPeriodo });
    } catch (error) {
        console.error('Error al crear el periodo académico:', error);
        res.status(500).json({ error: 'Error al crear el periodo académico.' });
    }
});

// GET: Obtener todos los periodos académicos
app.get('/api/periodos-all', async (req, res) => {
    try {
        const periodos = await Periodos.findAll();
        res.status(200).json(periodos);
    } catch (error) {
        console.error('Error al obtener los periodos académicos:', error);
        res.status(500).json({ error: 'Error al obtener los periodos académicos.' });
    }
});

// PUT: Actualizar un periodo académico
app.put('/api/periodos-update/:id', async (req, res) => {
    const { id } = req.params; // ID del periodo
    const { nombre, fecha_inicio, fecha_fin, estado } = req.body;

    try {
        const [updated] = await Periodos.update(
            { nombre, fecha_inicio, fecha_fin, estado },
            { where: { id_periodo: id } }
        );

        if (updated) {
            res.status(200).json({ message: 'Periodo académico actualizado correctamente.' });
        } else {
            res.status(404).json({ error: 'Periodo académico no encontrado.' });
        }
    } catch (error) {
        console.error('Error al actualizar el periodo académico:', error);
        res.status(500).json({ error: 'Error al actualizar el periodo académico.' });
    }
});
// POST: Registrar una asignatura
app.post('/api/register-asignatura', async (req, res) => {
    const { nombre, codigo, creditos, descripcion, carrera_id, periodo_id } = req.body;

    try {
        const nuevaAsignatura = await Asignaturas.create({ nombre, codigo, creditos, descripcion, carrera_id, periodo_id });
        res.status(201).json({ message: 'Asignatura creada correctamente', asignatura: nuevaAsignatura });
    } catch (error) {
        console.error('Error al crear la asignatura:', error);
        res.status(500).json({ error: 'Error al crear la asignatura.' });
    }
});

// GET: Obtener todas las asignaturas
app.get('/api/asignaturas-all', async (req, res) => {
    try {
        const asignaturas = await Asignaturas.findAll();
        res.status(200).json(asignaturas);
    } catch (error) {
        console.error('Error al obtener las asignaturas:', error);
        res.status(500).json({ error: 'Error al obtener las asignaturas.' });
    }
});

// PUT: Actualizar una asignatura
app.put('/api/asignaturas-update/:id', async (req, res) => {
    const { id } = req.params; // ID de la asignatura
    const { nombre, codigo, creditos, descripcion, carrera_id, periodo_id } = req.body;

    try {
        const [updated] = await Asignaturas.update(
            { nombre, codigo, creditos, descripcion, carrera_id, periodo_id },
            { where: { id_asignatura: id } }
        );

        if (updated) {
            res.status(200).json({ message: 'Asignatura actualizada correctamente.' });
        } else {
            res.status(404).json({ error: 'Asignatura no encontrada.' });
        }
    } catch (error) {
        console.error('Error al actualizar la asignatura:', error);
        res.status(500).json({ error: 'Error al actualizar la asignatura.' });
    }
});
// GET: Obtener matrículas de un estudiante
app.get('/api/matriculas/:id_estudiante', async (req, res) => {
    const { id_estudiante } = req.params;
    try {
        const matriculas = await Matriculas.findAll({ where: { id_estudiante } });
        res.status(200).json(matriculas);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener matrículas.' });
    }
});

// POST: Crear nueva matrícula
app.post('/api/matriculas', async (req, res) => {
    const { id_estudiante, id_asignatura, periodo_academico, fecha_matricula, estado_matricula, tipo_matricula, observaciones } = req.body;
    try {
        await Matriculas.create({ id_estudiante, id_asignatura, periodo_academico, fecha_matricula, estado_matricula, tipo_matricula, observaciones });
        res.json({ message: 'Matrícula creada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear matrícula.' });
    }
});

// PUT: Actualizar matrícula
app.put('/api/matriculas/:id', async (req, res) => {
    const { id } = req.params;
    const { estado_matricula, tipo_matricula, observaciones } = req.body;
    try {
        const [updated] = await Matriculas.update(
            { estado_matricula, tipo_matricula, observaciones },
            { where: { id_matricula: id } }
        );
        if (updated) {
            res.status(200).json({ message: 'Matrícula actualizada correctamente.' });
        } else {
            res.status(404).json({ error: 'Matrícula no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar matrícula.' });
    }
});
// GET: Obtener planes de estudio
app.get('/api/planes-estudio', async (req, res) => {
    try {
        const planes = await PlanesEstudio.findAll();
        res.status(200).json(planes);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener planes de estudio.' });
    }
});

// POST: Crear plan de estudio
app.post('/api/planes-estudio', async (req, res) => {
    const { nombre_plan, id_carrera, fecha_inicio, fecha_fin, descripcion } = req.body;
    try {
        await PlanesEstudio.create({ nombre_plan, id_carrera, fecha_inicio, fecha_fin, descripcion });
        res.json({ message: 'Plan de estudio creado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear plan de estudio.' });
    }
});

// PUT: Actualizar plan de estudio
app.put('/api/planes-estudio/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_plan, fecha_inicio, fecha_fin, descripcion } = req.body;
    try {
        const [updated] = await PlanesEstudio.update(
            { nombre_plan, fecha_inicio, fecha_fin, descripcion },
            { where: { id_plan: id } }
        );
        if (updated) {
            res.status(200).json({ message: 'Plan de estudio actualizado correctamente.' });
        } else {
            res.status(404).json({ error: 'Plan de estudio no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar plan de estudio.' });
    }
});
// GET: Obtener notas de un estudiante
app.get('/api/notas/:id_estudiante', async (req, res) => {
    const { id_estudiante } = req.params;
    try {
        const notas = await Notas.findAll({ where: { id_estudiante } });
        res.status(200).json(notas);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener notas.' });
    }
});

// POST: Crear nueva nota
app.post('/api/notas', async (req, res) => {
    const { id_estudiante, curso, notas1, notas2, notas3, promedio, fecha } = req.body;

    try {
        const nuevaNota = await Notas.create({
            id_estudiante,
            curso,
            notas1,
            notas2,
            notas3,
            promedio,
            fecha,
        });

        res.status(201).json({
            message: 'Nota registrada exitosamente',
            data: nuevaNota,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar la nota' });
    }
});

// PUT: Actualizar nota
app.put('/api/notas/:id', async (req, res) => {
    const { id } = req.params;
    const { nota, comentarios } = req.body;
    try {
        const [updated] = await Notas.update(
            { nota, comentarios },
            { where: { id_nota: id } }
        );
        if (updated) {
            res.status(200).json({ message: 'Nota actualizada correctamente.' });
        } else {
            res.status(404).json({ error: 'Nota no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar nota.' });
    }
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});