import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import NavPie from '../../Navegador/NavPie';
import NavTop from '../../Navegador/NavTop';
import './detalee.css'
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
    const [periodos, setPeriodos] = useState([])
    const [openForm, setOpemForm] = useState(false)
    const [selecPeri, setSelectPeri] = useState(null)

    // Verificamos si student existe
    if (!student) {
        return <div>No se ha pasado información del estudiante.</div>;
    }
    const nombres = `${student.apellidos}, ${student.nombres}`

    //Obtenemos los periodos desde la api

    const fetchPeriodo = async () => {
        try {
            const response = await axios.get('http://localhost:3005/api/periodos-all');
            setPeriodos(response.data || []);
        } catch (error) {
            console.error('Error al obtener carreras:', error);
        }
    };

    useEffect(() => {
        fetchPeriodo();
    }, []);

    const handleFormMa = (periodo) => {
        setOpemForm(!openForm)
        setSelectPeri(periodo)
    }
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
                <p className='txt'><IoMdInformationCircleOutline className='ico-info' />Matrículas de Ciclos de Académicos de {student.carrera.nombre} </p>
                <div className="ciclos">
                    {periodos.map((periodo) => (
                        <div key={periodo.id} className="box">
                            <h5>{periodo.nombre}</h5>
                            <div className="fechas">
                                <p>Fecha Matrícula: <span>---</span></p>
                                <p>Inicio de Periódo: <span>{periodo.fecha_inicio} </span> </p>
                                <p>Fín de Periódo: <span>{periodo.fecha_fin}</span> </p>
                            </div>
                            <div className="indicador">
                                <span className='noo'><MdOutlineNotInterested />No Matriculado</span>
                                <button onClick={() => handleFormMa(periodo)}><CiEdit />Matricular</button>
                            </div>
                        </div>
                    ))}

                    <div className="box">
                        <h5>CICLO 1</h5>
                        <div className="fechas">
                            <p>Fecha Matrícula: <span>12/12/2025</span></p>
                            <p>Inicio de Periódo: <span>12/12/2025</span> </p>
                            <p>Fín de Periódo: <span>12/12/2025</span> </p>
                        </div>
                        <div className="indicador">
                            <span className='sii'><IoCheckmarkDoneSharp />Matriculado</span>
                        </div>
                    </div>

                </div>
                <p className="txt"><IoMdInformationCircleOutline className='ico-info' />Otras Matrículas</p>
                <div className="otros">
                    <div className="box">
                        <h5>Matrícula de Ciclo 1</h5>
                    </div>
                </div>
            </main>
            <NavPie />

            {openForm && (
                <MatricularForm close={handleFormMa} student={student} periodo={selecPeri} />
            )}
        </div>
    );
}

export default Detalles