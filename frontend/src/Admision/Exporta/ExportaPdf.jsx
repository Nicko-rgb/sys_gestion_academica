import React from 'react'
import './export.css'
import { useLocation } from 'react-router-dom';
import NavTop from '../../Navegador/NavTop'
import NavBottom from '../../Navegador/NavPie'
import OpcionesI from '../Opciones/OpcionesI'

const ExportaPdf = () => {

    const location = useLocation();
    const { carrera } = location.state || {};

    const anio = new Date().getFullYear();
    return (
        <div className="principal subir-admision">
            <NavTop />
            <OpcionesI />
            <main>
                <h2 className="title-page">SUBIR resultados de examen de admision - {anio} </h2>
                <div>
                    <h3>Subir resultados de examen de admision - {carrera.nombre} </h3>
                    
                </div>
            </main>
            <NavBottom />
        </div>
    )
}

export default ExportaPdf