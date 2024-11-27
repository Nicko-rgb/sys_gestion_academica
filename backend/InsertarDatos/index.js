const AdminDefault = require('./AdminDefault')
const InsertCarreras = require('./InserCarrera')
const insertStudent = require('./insetStudent')
const InsertPeriodo = require('./insertPerdiodo')
// const InsertCursos = require('./InsertCurso')

const inicalizaInsersion = async () => {
    await InsertCarreras();
    await AdminDefault();
    await insertStudent();
    await InsertPeriodo();
    //......
}

//Exportamos
module.exports = inicalizaInsersion;