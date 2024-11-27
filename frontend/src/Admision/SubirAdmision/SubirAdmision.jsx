import React, { useState, useEffect } from 'react';
import './subir.css';
import { useLocation } from 'react-router-dom';
import NavTop from '../../Navegador/NavTop';
import NavBottom from '../../Navegador/NavPie';
import OpcionesI from '../Opciones/OpcionesI';
import Volver from '../../Navegador/Volver';
import Buscardor from '../../Complementos/Buscardor';
import Form from './Form';
import { PiPencilLineBold } from "react-icons/pi";
import { MdFileUpload } from "react-icons/md";
import axios from 'axios';

const SubirAdmision = () => {
    const location = useLocation();
    const { carrera } = location.state || {};
    const [postulantes, setPostulantes] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [postulante, setPostulante] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectEstado, setSelectEstado] = useState('');
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
        setOpenForm(!openForm);
        setPostulante(postulante);
    };

    // Manejo de búsqueda y filtro
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleEstadoChange = (e) => {
        setSelectEstado(e.target.value.toLowerCase());
    };

    // Filtrar postulantes según el término de búsqueda y estado seleccionado
    const filteredPostulantes = postulantes.filter(postulante => {
        const matchesSearch = searchTerm === '' || 
            postulante.apellidos.toLowerCase().includes(searchTerm) ||
            postulante.nombres.toLowerCase().includes(searchTerm) ||
            postulante.dni.toLowerCase().includes(searchTerm);

        const matchesEstado = selectEstado === '' ||
            (postulante.resultado && postulante.resultado.condicion.toLowerCase() === selectEstado);

        return matchesSearch && matchesEstado;
    });

    return (
        <div className="principal subir-admision">
            <NavTop />
            <OpcionesI />
            <main>
                <h2 className="title-page">SUBIR resultados de examen de admisión - {anio} - {carrera.nombre} </h2>
                <div className='accion'>
                    <Volver />
                    <Buscardor onSearchChange={handleSearchChange} />
                    <select value={selectEstado} onChange={handleEstadoChange}>
                        <option value="">Condición</option>
                        <option value="no ingresó">No ingresó</option>
                        <option value="ingresó">Ingresó</option>
                    </select>
                </div>

                <p className='contador'>{filteredPostulantes.length} de {postulantes.length} </p>
                {filteredPostulantes.length > 0 ? (
                    <table className="tabla-postulantes">
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Nombre</th>
                                <th>DNI</th>
                                <th>Carrera Profesional</th>
                                <th>Puntos</th>
                                <th>Condición</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPostulantes.map((postulante, index) => (
                                <tr key={postulante.id_postulante}>
                                    <td>{index + 1}</td>
                                    <td>{postulante.apellidos} {postulante.nombres}</td>
                                    <td>{postulante.dni}</td>
                                    <td>{postulante.carrera_postulada}</td>
                                    <td>{postulante.resultado ? postulante.resultado.puntaje : '---'} </td>
                                    <td>{postulante.resultado ? postulante.resultado.condicion : '---'} </td>
                                    <td className='acciont'>
                                        <div>
                                            {postulante.resultado ? (
                                                // <PiPencilLineBold onClick={() => handleOpenForm(postulante)} className='ico ico-edit' />
                                                <></>
                                            ) : (
                                                <MdFileUpload onClick={() => handleOpenForm(postulante)} className='ico ico-subir' />
                                            )}
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
