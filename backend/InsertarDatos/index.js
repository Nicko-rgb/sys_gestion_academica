const AdminDefault = require('./AdminDefault')
const InsertCarreras = require('./InserCarrera')
const insertStudent = require('./insetStudent')
// const InsertCursos = require('./InsertCurso')

const inicalizaInsersion = async () => {
    await InsertCarreras();
    await AdminDefault();
    await insertStudent();
    //......
}

//Exportamos
module.exports = inicalizaInsersion;