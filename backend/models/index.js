// models/index.js
const Admins = require('./Admin');
const Profesores = require('./Profesores');
const Estudiantes = require('./Estudiantes');
const Carreras = require('./carreras');
const PeriodosAcademicos = require('./Periodos');
const Asignaturas = require('./Asignaturas');
const Postulantes = require('./Postulantes');
const PostulanteResultado = require('./PostulanteResultado');
const PagoPostulante = require('./PagoPostulante')

// Define relaciones de Postulante a Resultados de Postulante
Postulantes.hasOne(PostulanteResultado, { foreignKey: 'id_postulante', as: 'resultado' });
PostulanteResultado.belongsTo(Postulantes, { foreignKey: 'id_postulante', as: 'postulante' });

//Relacion de Postulante a Pago
Postulantes.hasOne(PagoPostulante, { foreignKey: 'id_postulante', as: 'pago_postu' });
PagoPostulante.belongsTo(Postulantes, { foreignKey: 'id_postulante', as: 'postulante' })

//Relacion de Estudiante a Postulante
Estudiantes.belongsTo(Postulantes, { foreignKey: 'id_postulante', as: 'postulante' });
Postulantes.hasMany(Estudiantes, { foreignKey: 'id_postulante', as: 'estudiantes' });

//Relacion de Estudiantes a PostulanteResultado
Estudiantes.hasOne(PostulanteResultado, { foreignKey: 'id_estudiante', as: 'resultado' })

//Realcion de Estudiante a carreras
Estudiantes.belongsTo(Carreras, { foreignKey: 'id_carrera', as: 'carrera' });
Carreras.hasMany(Estudiantes, { foreignKey: 'id_carrera', as: 'estudiantes' });


// Exportar todos los modelos
module.exports = {
    Admins,
    Profesores,
    Estudiantes,
    Carreras,
    PeriodosAcademicos,
    Asignaturas,
    Postulantes,
    PostulanteResultado,
    PagoPostulante
};