import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavPie from '../../Navegador/NavPie';
import NavTop from '../../Navegador/NavTop';
import './detalee.css';
import Volver from '../../Navegador/Volver';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineNotInterested } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import axios from 'axios';
import MatricularForm from '../FormMatricula/MatricularForm';

const Detalles = () => {
    const location = useLocation();
    const { student } = location.state || {};
    const [periodos, setPeriodos] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [selecPeri, setSelectPeri] = useState(null);
    const [estudiantes, setEstudiantes] = useState([]);
    const [estudiante, setEstudiante] = useState(null);

    if (!student) {
        return <div>No se ha pasado información del estudiante.</div>;
    }

    const nombres = `${student.apellidos}, ${student.nombres}`;

    // Obtener los periodos desde la API
    const fetchPeriodo = async () => {
        try {
            const response = await axios.get('http://localhost:3005/api/periodos-all');
            setPeriodos(response.data || []);
        } catch (error) {
            console.error('Error al obtener los períodos:', error);
        }
    };



    // Buscar estudiante específico con polling
    useEffect(() => {
        const fetchEstudiantesConPolling = async () => {
            try {
                const response = await axios.get('http://localhost:3005/api/obtener-estudiantes');
                const estudiantesActualizados = response.data || [];
                setEstudiantes(estudiantesActualizados);

                // Buscar al estudiante específico
                const foundStudent = estudiantesActualizados.find(
                    (std) => std.id_estudiante === student.id_estudiante
                );
                setEstudiante(foundStudent || null);
            } catch (error) {
                console.error('Error al obtener estudiantes:', error);
            }
        };

        const intervalId = setInterval(fetchEstudiantesConPolling, 1000); // 5000ms = 5 segundos

        fetchEstudiantesConPolling();
        return () => clearInterval(intervalId);
    }, [student.id_estudiante]);


    // Cargar periodos y estudiantes al inicio
    useEffect(() => {
        fetchPeriodo();
    }, []);

    const handleFormMa = (periodo) => {
        setOpenForm(!openForm);
        setSelectPeri(periodo);
    };

    return (
        <div className='principal matride'>
            <NavTop />
            <main>
                <h1 className='title-page'>Detalles de Matrícula</h1>
                <div className="datos">
                    <Volver />
                    <form className='form-view'>
                        <label>DNI
                            <input type="text" value={student.dni} disabled />
                        </label>
                        <label>APELLIDOS Y NOMBRES
                            <input className='name' type="text" value={nombres} disabled />
                        </label>
                        <label>CORREO
                            <input className='email' value={student.email} disabled />
                        </label>
                        <label>FECHA DE INGRESO
                            <input type="date" value={new Date(student.createdAt).toISOString().split('T')[0]} disabled />
                        </label>
                    </form>
                </div>
                <p className='txt'><IoMdInformationCircleOutline className='ico-info' />Matrículas de Ciclos Académicos de {student.carrera.nombre}</p>
                <div className="ciclos">
                    {periodos
                        .sort((a, b) => {
                            const numA = parseInt(a.nombre.replace(/[^0-9]/g, ''), 10);
                            const numB = parseInt(b.nombre.replace(/[^0-9]/g, ''), 10);
                            return numA - numB;
                        })
                        .map((periodo) => {
                            const matricula = estudiante?.matricula?.find(
                                (mat) => mat.nombre_periodo === periodo.nombre
                            );

                            return (
                                <div key={periodo.id_periodo} className="box">
                                    <h5>{periodo.nombre}</h5>
                                    <div className="fechas">
                                        <p>Fecha Matrícula: <span>{matricula ? matricula.fecha_matricula : '---'}</span></p>
                                        <p>Inicio de Periódo: <span>{periodo.fecha_inicio}</span></p>
                                        <p>Fín de Periódo: <span>{periodo.fecha_fin}</span></p>
                                    </div>
                                    <div className="indicador">
                                        {matricula ? (
                                            <span className='sii'><IoCheckmarkDoneSharp />Matriculado</span>
                                        ) : (
                                            <span className='noo'><MdOutlineNotInterested />No Matriculado</span>
                                        )}
                                        {!matricula && (
                                            <button onClick={() => handleFormMa(periodo)}><CiEdit />Matricular</button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <p className="txt"><IoMdInformationCircleOutline className='ico-info' />Otras Matrículas</p>
                <div className="otros">
                    
                </div>
            </main>
            <NavPie />

            {openForm && (
                <MatricularForm
                    close={handleFormMa}
                    student={student}
                    periodo={selecPeri}
                />
            )}
        </div>
    );
};

export default Detalles;
