const AdminDefault = require('./AdminDefault')
const InsertCarreras = require('./InserCarrera')
const insertStudent = require('./insetStudent')
const InsertPeriodo = require('./insertPerdiodo')
const insertAsignatura = require('./insertAsignatura')
// const InsertCursos = require('./InsertCurso')

const inicalizaInsersion = async () => {
    await InsertCarreras();
    await AdminDefault();
    await insertStudent();
    await InsertPeriodo();
    await insertAsignatura();
    //......
}

//Exportamos
module.exports = inicalizaInsersion;