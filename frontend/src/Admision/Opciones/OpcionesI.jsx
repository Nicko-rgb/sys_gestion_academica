import React, { useState, useEffect } from 'react';
import './opciones.css';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { GrFormNext } from "react-icons/gr";
import { TbDatabaseExport } from "react-icons/tb";
import { TbHomeCog } from "react-icons/tb";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OpcionesI = () => {
    const [carreras, setCarreras] = useState([])
    const [openSubir, setOpenSubir] = useState(false);
    const [openExporta, setOpenExporta] = useState(false)
    const [selectedBox, setSelectedBox] = useState('home');
    const usenavigate = useNavigate();

    // Obtener carreras
    const fetchCarreras = async () => {
        try {
            const response = await axios.get('http://localhost:3005/api/carreras-all');
            setCarreras(response.data);
        } catch (error) {
            console.error('Error al obtener carreras:', error);
        }
    };
    useEffect(() => {
        fetchCarreras();
    }, []);

    const handleOpenSubir = (boxName) => {
        setOpenSubir(!openSubir);
        setSelectedBox(boxName);
        setOpenExporta(false)
    };

    const handleOpenExporta = (boxName) => {
        setOpenExporta(!openExporta);
        setSelectedBox(boxName);
        setOpenSubir(false)
    }

    const handleBoxClick = (boxName) => {
        setSelectedBox(boxName);
        setOpenSubir(false);
    };

    const navigateAdmision = (boxName) => {
        setSelectedBox(boxName)
        usenavigate('/admision');
    }

    const navigateSubir = (carrera) => {
        usenavigate(`/admision-upload/${carrera.nombre}`, { state: { carrera } });
        setOpenSubir(false)
    };

    const naviagateExport = (carrera) => {
        usenavigate(`/admision-export/${carrera.nombre}`, { state: { carrera } });
        setOpenExporta(false)
    }

    return (
        <section className="left-a">
            <h3 className="title-page">PANEL DE OPCIONES</h3>
            <div className="menu">
                <div className={`box ${selectedBox === 'home' ? 'active' : ''}`} onClick={() => navigateAdmision('home')}>
                    <p className='txt'><TbHomeCog />Admisión</p>
                </div>
                <div className={`box ${selectedBox === 'exporta' ? 'active' : ''}`} onClick={() => handleOpenExporta('exporta')}>
                    <p className='txt'><TbDatabaseExport />Exportar Datos PDF <GrFormNext className='ico-n' /></p>
                    {openExporta && (
                        <div className='opciones aaaa' onClick={(e) => e.stopPropagation()} >
                            <p>Programas de estudios</p>
                            {carreras.map((carrera) => (
                                <button key={carrera.nombre} onClick={() => naviagateExport(carrera)}>{carrera.nombre}</button>
                            ))}
                        </div>
                    )}
                </div>
                <div className={`box ${selectedBox === 'filtrar' ? 'active' : ''}`} onClick={() => handleBoxClick('filtrar')}>
                    <p className='txt'>Filtrar Datos</p>
                </div>
                <div className={`box ${selectedBox === 'subir' ? 'active' : ''}`} onClick={() => handleOpenSubir('subir')}>
                    <p className='txt'>
                        <MdOutlineCloudUpload />
                        Subir Resultados
                        <GrFormNext className='ico-n' />
                    </p>
                    {openSubir && (
                        <div className='opciones cccc' onClick={(e) => e.stopPropagation()} >
                            <p>Programas de estudios</p>
                            {carreras.map((carrera) => (
                                <button key={carrera.nombre} onClick={() => navigateSubir(carrera)}>{carrera.nombre}</button>
                            ))}
                        </div>
                    )}
                </div>
                <div className={`box ${selectedBox === 'imprimir' ? 'active' : ''}`} onClick={() => handleBoxClick('imprimir')}>
                    <p className='txt'>Imprimir Tabla</p>
                </div>
                <div className={`box ${selectedBox === 'buscar' ? 'active' : ''}`} onClick={() => handleBoxClick('buscar')}>
                    <p className='txt'>Buscar</p>
                </div>
            </div>
        </section>
    );
};

export default OpcionesI;