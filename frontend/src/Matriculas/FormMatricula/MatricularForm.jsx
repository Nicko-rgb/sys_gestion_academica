import React, { useState } from 'react';
import axios from 'axios';

const MatricularForm = ({ student, close, periodo }) => {
    const [monto, setMonto] = useState('');
    const names = `${student.apellidos}, ${student.nombres}`;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3005/api/registrar-matricula', {
                id_estudiante: student.id_estudiante,
                monto,
                nombre_periodo: periodo.nombre,
            });

            alert('Matrícula registrada con éxito');
            close(); // Cierra el formulario
        } catch (error) {
            console.error('Error al registrar la matrícula:', error);
            alert('Error al registrar la matrícula');
        }
    };

    return (
        <div className='form-admision'>
            <form onSubmit={handleSubmit}>
                <h2>Matricular a Estudiante {periodo.nombre} </h2>
                <div className="form-group">
                    <label>DNI
                        <input type="text" value={student.dni} disabled />
                    </label>
                    <label>Nombre y Apellidos
                        <input type="text" value={names} disabled />
                    </label>
                </div>
                <div className="form-group">
                    <label>Periodo
                        <input type="text" value={periodo.nombre} disabled />
                    </label>
                    <label className='montoo'>MONTO s/
                        <input 
                            type="text" 
                            value={monto} 
                            onChange={(e) => setMonto(e.target.value)} 
                            required 
                        />
                    </label>
                </div>

                <div className="btns">
                    <button className='btn-cancel' type="button" onClick={close}>Cerrar</button>
                    <button className='btn-save' type="submit">Matricular</button>
                </div>
            </form>
        </div>
    );
};

export default MatricularForm;
