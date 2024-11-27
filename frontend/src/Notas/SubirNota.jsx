import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavTop from '../Navegador/NavTop';
import NavBottom from '../Navegador/NavPie';
import Volver from '../Navegador/Volver';
import { useLocation } from 'react-router-dom';

const SubirNota = () => {
    const location = useLocation();
    const { student = {} } = location.state || {}; // Manejo seguro de valores por defecto
    const [cursos, setCursos] = useState([]);
    const [error, setError] = useState('');

    const fetchCursos = async () => {
        try {
            const response = await axios.get('http://localhost:3005/api/asignaturas');
            setCursos(response.data || []);
        } catch (error) {
            console.error('Error al obtener cursos:', error);
            setError('No se pudieron cargar los cursos.');
        }
    };

    useEffect(() => {
        fetchCursos();
    }, []);

    return (
        <div className="principal subir-nota">
            <NavTop />
            <main>
                <h3 className="title-page">REGISTRO DE NOTAS</h3>
                <div className="datos">
                    <Volver />
                    <form className="form-view">
                        <label>DNI
                            <input type="text" value={student.dni || '---'} disabled />
                        </label>
                        <label>APELLIDOS Y NOMBRES
                            <input className="name" type="text" value={`${student.apellidos || ''} ${student.nombres || ''}`} disabled />
                        </label>
                        <label>CORREO
                            <input className="email" type="text" value={student.email || '---'} disabled />
                        </label>
                    </form>
                </div>
                <div className="sub-title-page">Asignaturas Disponibles</div>
                <div className="boxs">
                    {error ? (
                        <p className="error-message">{error}</p>
                    ) : cursos.length === 0 ? (
                        <p className="no-courses-message">No hay cursos disponibles.</p>
                    ) : (
                        cursos.map((curso, index) => (
                            <div className="box" key={curso.id || index}>
                                <p>{curso.nombre}</p>
                            </div>
                        ))
                    )}
                </div>
            </main>
            <NavBottom />
        </div>
    );
};

export default SubirNota;
