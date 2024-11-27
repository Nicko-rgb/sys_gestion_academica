import React, { useState, useEffect } from 'react'
import NavTop from '../Navegador/NavTop'
import NavBottom from '../Navegador/NavPie'
import axios from 'axios'
import './carreras.css'
import { RxOpenInNewWindow } from "react-icons/rx";
import Volver from '../Navegador/Volver'

function Carreras() {

    const [carreras, setCarreras] = useState([])

    const fetchCarreras = async () => {
        try {
            const response = await axios.get('http://localhost:3005/api/carreras-all');
            setCarreras(response.data || []);
        } catch (error) {
            console.error('Error al obtener carreras:', error);
        }
    };

    useEffect(() => {
        fetchCarreras();
    }, []);

    return (
        <div className="principal carreras">
            <NavTop />
            <main>
                <h3 className="title-page">PROGRAMAS DE ESTUDIO DEL IESTP SUIZA</h3>
                <div className="boxs">
                    <Volver />
                    {carreras.map((carrera, index) => (
                        <div key={index} className="box">
                            <p className='name'>{carrera.nombre}</p>
                            <p className='desc'>{carrera.descripcion}</p>
                            <div>
                                <p className=''>CICLOS: {carrera.duracion}</p>
                                <button>Ver Más <RxOpenInNewWindow /></button>
                                <p className='std'>{carrera.estado}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <NavBottom />
        </div>
    )
}

export default Carreras