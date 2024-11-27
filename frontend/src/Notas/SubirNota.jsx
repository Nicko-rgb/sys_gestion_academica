import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavTop from '../Navegador/NavTop';
import NavBottom from '../Navegador/NavPie';
import Volver from '../Navegador/Volver';
import { useLocation } from 'react-router-dom';
import FormNota from './FormNota';

const SubirNota = () => {
    const location = useLocation();
    const { student = {} } = location.state || {};
    const [cursos, setCursos] = useState([]);
    const [error, setError] = useState('');
  
    const [promedio, setPromedio] = useState(0);
    const [openNota, setOpenNota] = useState(false);
    const [selectCurso, setSelectCurso] = useState(null);

    // Estado para las notas
    const [notas, setNotas] = useState({
        taller: '',
        diseno3D: '',
        modelamientoSoftware: '',
        seguridadInformatica: '',
        disenoGrafico: ''
    });
    
    
    // Fetch de los cursos disponibles
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


    // Función para manejar cambios en las notas
    const handleNotaChange = (e) => {
        const { name, value } = e.target;
        setNotas(prevNotas => ({
            ...prevNotas,
            [name]: value
        }));
    };

    // Función para calcular el promedio
    const calcularPromedio = () => {
        const valores = Object.values(notas).map(Number);
        const suma = valores.reduce((acc, curr) => acc + curr, 0);
        const nuevoPromedio = suma / valores.length;
        setPromedio(nuevoPromedio);
    };

    // Función para subir el promedio
    const subirPromedio = async () => {
        try {
            const response = await axios.post('http://localhost:3005/api/subir-nota', {
                dni: student.dni,
                promedio
            });
            alert('Promedio subido con éxito: ' + response.data.message);
        } catch (error) {
            console.error('Error al subir el promedio:', error);
            alert('No se pudo subir el promedio.');
        }
    };

    const handleModal = (curso) => {
        setOpenNota(true);
        setSelectCurso(curso);
    };

    const closeModal = () => {
        setOpenNota(false);
        setSelectCurso(null);
    };

    // Validar notas del estudiante
    const notas = student.notas || [];


    return (
        <div className="principal subir-nota">
            <NavTop />
            <main>
                <h3 className="title-page">REGISTRO DE NOTAS DEL CICLO . 2024</h3>
                <div className="datos">
                    <Volver />
                    <form className="form-view">
                        <label>
                            DNI
                            <input type="text" value={student.dni || '---'} disabled />
                        </label>
                        <label>
                            APELLIDOS Y NOMBRES
                            <input
                                className="name"
                                type="text"
                                value={`${student.apellidos || ''} ${student.nombres || ''}`}
                                disabled
                            />
                        </label>
                        <label>
                            CORREO
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
                        cursos.map((curso) => (
                            <div className="box" key={curso.id}>
                                <p>{curso.nombre}</p>
                                {/* Mostrar el promedio si existe una nota asociada */}
                                {notas
                                    .filter((nota) => nota.curso === curso.nombre)
                                    .map((nota, index) => (
                                        <p key={index}>PROMEDIO: {nota.promedio}</p>
                                    ))}
                                <button onClick={() => handleModal(curso)}>Subir Nota</button>
                            </div>
                        ))
                    )}
                </div>

                {/* Nuevos campos para ingresar notas */}
                <div className="notas-container">
                    <h4>Ingrese las notas</h4>
                    {Object.keys(notas).map((key) => (
                        <label key={key}>
                            {key.replace(/([A-Z])/g, ' $1').toUpperCase()}:
                            <input 
                                type="number" 
                                name={key} 
                                value={notas[key]} 
                                onChange={handleNotaChange} 
                                min="0" 
                                max="100"
                                placeholder="Ingrese nota"
                            />
                        </label>
                    ))}
                    <button type="button" onClick={calcularPromedio}>Calcular Promedio</button>
                    {promedio > 0 && (
                        <>
                            <p>El promedio es: {promedio.toFixed(2)}</p>
                            {/* Botón para subir el promedio */}
                            <button type="button" onClick={subirPromedio}>Subir Promedio</button>
                        </>
                    )}
                </div>

            </main>
            {/* Modal para registrar notas */}
            {openNota && (
                <FormNota student={student} close={closeModal} curso={selectCurso} />
            )}
            <NavBottom />
        </div>
    );
};

export default SubirNota;