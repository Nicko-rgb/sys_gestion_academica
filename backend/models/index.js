// models/index.js
const Admins = require('./Admin');
const Profesores = require('./Profesores');
const Estudiantes = require('./Estudiantes');
const Carreras = require('./carreras');
const PeriodosAcademicos = require('./Periodos');
const Asignaturas = require('./Asignaturas');
const Postulantes = require('./Postulantes');
const PostulanteResultado = require('./PostulanteResultado');

// Define relaciones
Postulantes.hasOne(PostulanteResultado, { foreignKey: 'id_postulante', as: 'resultado' });
PostulanteResultado.belongsTo(Postulantes, { foreignKey: 'id_postulante', as: 'postulante' });

// Exportar todos los modelos
module.exports = {
    Admins,
    Profesores,
    Estudiantes,
    Carreras,
    PeriodosAcademicos,
    Asignaturas,
    Postulantes,
    PostulanteResultado
};