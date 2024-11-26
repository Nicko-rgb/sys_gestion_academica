import React, { useEffect, useState } from 'react'
import './matricula.css'
import axios from 'axios'
import NavTop from '../Navegador/NavTop'
import NavBottom from '../Navegador/NavPie'
import Buscardor from '../Complementos/Buscardor'
import { MdPersonAddAlt1 } from "react-icons/md";
import Volver from '../Navegador/Volver';
import BtnPagina from '../Complementos/BtnPagina'
import FormMatricula from './FormMatricula/FormMatricula'

const Matricula = ( ) => {

    const [formMatricula, setFormMatricula] = useState(false)

    const handleFormMatricula = () => {
        setFormMatricula(!formMatricula)
    }

    return (
        <div className="principal matricula">
            <NavTop />
            <main>
                <h3 className="title-page">MATRICULAS Y PAGOS</h3>
                <button className='btn-reg' onClick={handleFormMatricula}><MdPersonAddAlt1 className='ico-reg' />Registrar Postulante</button>
                <div className="acciones">
                    <Volver />
                    <Buscardor />
                </div>
                <div className="table-contend">
                    <h3 className="sub-title-page">ESTUDIANTES MATRICULADOS - 2025</h3>
                    <p>3 de 3</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Carrera Profesional</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nombre 1</td>
                                <td>Apellido 1</td>
                                <td>Fecha de Nacimiento 1</td>
                                <td>Sexo 1</td>
                                <td>Estado 1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <BtnPagina />
            </main>
            <NavBottom />

            {formMatricula && (
                <FormMatricula close={handleFormMatricula} />
            )}
        </div>
    )
}

export default Matricula