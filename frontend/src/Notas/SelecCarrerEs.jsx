import React, { useState, useEffect } from 'react'
import NavTop from '../Navegador/NavTop'
import NavBottom from '../Navegador/NavPie'
import axios from 'axios'
import './carreras.css'
import Volver from '../Navegador/Volver'
import { useNavigate } from 'react-router-dom'


function SelectCarrerEs() {

    const [carreras, setCarreras] = useState([])
    const navigate  = useNavigate()

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

    const irNotas = (carrera) => {
        navigate(`/notas/${carrera.nombre}`, { state: { carrera } });
    }

    return (
        <div className="principal carrerasN">
            <NavTop />
            <main>
                <h3 className="title-page">PROGRAMAS DE ESTUDIO DEL IESTP SUIZA</h3>
                <div className="boxs">
                    <Volver />
                    {carreras.map((carrera, index) => (
                        <div key={index} className="box" onClick={() => irNotas(carrera)}>
                            <p className='name'>{carrera.nombre}</p>
                        </div>
                    ))}
                </div>
            </main>
            <NavBottom />
        </div>
    )
}

export default SelectCarrerEs