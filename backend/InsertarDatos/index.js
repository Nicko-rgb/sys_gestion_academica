const AdminDefault = require('./AdminDefault')
const InsertCarreras = require('./InserCarrera')
// const InsertCursos = require('./InsertCurso')

const inicalizaInsersion = async () => {
    await InsertCarreras();
    await AdminDefault();
    //......
}

//Exportamos
module.exports = inicalizaInsersion;