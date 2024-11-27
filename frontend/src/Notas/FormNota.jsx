import React, { useState } from 'react';
import axios from 'axios';

const FormNota = ({ student, curso, close }) => {
    const [notas, setNotas] = useState({ nota1: '', nota2: '', nota3: '' });
    const [promedio, setPromedio] = useState('');

    const handleNotaChange = (e) => {
        const { name, value } = e.target;
        const nota = value === '' ? '' : parseFloat(value);

        if (nota === '' || (nota >= 0 && nota <= 20 && /^[0-9]*(\.[0-9]{0,2})?$/.test(value))) {
            setNotas((prev) => ({ ...prev, [name]: value }));

            // Calcular promedio si todas las notas son válidas
            const notasValidas = { ...notas, [name]: value };
            const valoresNotas = Object.values(notasValidas)
                .map((n) => parseFloat(n) || 0)
                .filter((n) => n !== 0);
            
            const promedioCalculado =
                valoresNotas.length > 0
                    ? (valoresNotas.reduce((acc, curr) => acc + curr, 0) / valoresNotas.length).toFixed(2)
                    : '';
            setPromedio(promedioCalculado);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            id_estudiante: student.id_estudiante,
            curso: curso.nombre,
            notas1: notas.nota1,
            notas2: notas.nota2,
            notas3: notas.nota3,
            promedio,
            fecha: new Date().toISOString().split('T')[0], // Fecha actual
        };

        try {
            const response = await axios.post('http://localhost:3005/api/notas', data);
            console.log(response.data);
            alert('Notas registradas exitosamente');
            close();
        } catch (error) {
            console.error(error);
            alert('Error al registrar las notas');
        }
    };

    return (
        <div className="modal-nota">
            <div className="notas">
                <h3>{curso.nombre}</h3>
                <p>
                    Registre las notas para el estudiante{' '}
                    <span>
                        {student.nombres} {student.apellidos} <br /> DNI {student.dni}
                    </span>
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            Nota 1
                            <input
                                className='nt'
                                type="text"
                                name="nota1"
                                value={notas.nota1}
                                onChange={handleNotaChange}
                            />
                        </label>
                        <label>
                            Nota 2
                            <input
                                className='nt'
                                type="text"
                                name="nota2"
                                value={notas.nota2}
                                onChange={handleNotaChange}
                            />
                        </label>
                        <label>
                            Nota 3
                            <input
                                className='nt'
                                type="text"
                                name="nota3"
                                value={notas.nota3}
                                onChange={handleNotaChange}
                            />
                        </label>
                    </div>
                    <label className="pro">
                        Promedio
                        <input type="text" value={promedio} disabled />
                    </label>
                    <div className="btns">
                        <button type="button" className="btn-cancel" onClick={close}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-submit">
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormNota;
