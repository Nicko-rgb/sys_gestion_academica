import React from 'react'

const MatricularForm = ({student, close, periodo}) => {

    const names = `${student.apellidos}, ${student.nombres}`
    return (
        <div className='form-admision'>
            <form>
                <h2>Matricular a Estudiante {periodo.nombre} </h2>
                <div className="form-group">
                    <label>DNI
                        <input type="text" value={student.dni} disabled />
                    </label>
                    <label>Nombre y Apellidos
                        <input type="text" value={names} disabled/>
                    </label>
                </div>
                <div className="form-group">
                    <label>Periodo
                        <input type="text" value={periodo.nombre} disabled/>
                    </label>
                    <label>MONTO
                        <input type="number"  disabled/>
                    </label>
                </div>

                <div className="btns">
                    <button className='btn-cancel' type="button" onClick={close}>Cerrar</button>
                    <button className='btn-save' type="submit">Matricular</button>
                </div>
            </form>
        </div>
    )
}

export default MatricularForm