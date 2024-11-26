import React, { useState, useEffect } from 'react';
import './subir.css';
import { useLocation } from 'react-router-dom';
import NavTop from '../../Navegador/NavTop';
import NavBottom from '../../Navegador/NavPie';
import OpcionesI from '../Opciones/OpcionesI';
import Volver from '../../Navegador/Volver';
import Form from './Form';
import { PiPencilLineBold } from "react-icons/pi";
import { MdFileUpload } from "react-icons/md";
import axios from 'axios';

const SubirAdmision = () => {
    const location = useLocation();
    const { carrera } = location.state || {};
    const [postulantes, setPostulantes] = useState([]);
    const [openForm, setOpenForm] = useState(false)
    const [postulante, setPostulante] = useState(null)
    const anio = new Date().getFullYear();

    // Función para obtener los postulantes de la API
    const fetchPostulantes = async () => {
        if (carrera) {
            try {
                const response = await axios.get(`http://localhost:3005/api/postulantes-carrera/${carrera.nombre}`);
                setPostulantes(response.data);
            } catch (error) {
                console.error('Error al obtener postulantes:', error);
            }
        }
    };

    useEffect(() => {
        fetchPostulantes();

        const intervalId = setInterval(() => {
            fetchPostulantes();
        }, 1000); 
        return () => clearInterval(intervalId);
    }, [carrera]);

    const handleOpenForm = (postulante) => {
        setOpenForm(!openForm)
        setPostulante(postulante)
    }

    return (
        <div className="principal subir-admision">
            <NavTop />
            <OpcionesI />
            <main>
                <h2 className="title-page">SUBIR resultados de examen de admisión - {anio}</h2>
                <div>
                    <Volver />
                    <h3>Subir resultados de examen de admisión - {carrera.nombre}</h3>
                </div>

                <p>{postulantes.length} de {postulantes.length} </p>
                {postulantes.length > 0 ? (
                    <table className="tabla-postulantes">
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Nombre</th>
                                <th>DNI</th>
                                <th>Carrera Profesional</th>
                                <th>Puntos</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postulantes.map((postulante, index) => (
                                <tr key={postulante.id_postulante}>
                                    <td>{index + 1}</td>
                                    <td>{postulante.apellidos} {postulante.nombres}</td>
                                    <td>{postulante.dni}</td>
                                    <td>{postulante.carrera_postulada}</td>
                                    <td>{postulante.resultado ? postulante.resultado.puntaje : '---'} </td>
                                    <td>{postulante.resultado ? postulante.resultado.condicion : '---'} </td>
                                    <td className='acciont'>
                                        <div>
                                            <PiPencilLineBold onClick={() =>  handleOpenForm(postulante) } className='ico' />
                                            <MdFileUpload className='ico' /> 
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay postulantes disponibles para esta carrera.</p>
                )}
            </main>
            <NavBottom />

            {openForm && (
                <Form 
                    postulante={postulante}
                    close={handleOpenForm}
                 />
            )}
        </div>
    );
};

export default SubirAdmision;