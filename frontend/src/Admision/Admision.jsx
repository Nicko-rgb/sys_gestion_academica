import React, { useState } from 'react'
import './admison.css'
import NavPie from '../Navegador/NavPie'
import NavTop from '../Navegador/NavTop'
import Volver from '../Navegador/Volver'
import Buscardor from '../Complementos/Buscardor'
import FormAdmision from './Form/FormAdmision'
import { IoIosArrowBack } from "react-icons/io";
import { MdPersonAddAlt1, MdOutlineCloudUpload } from "react-icons/md";
import { GrFormNext } from "react-icons/gr";

const Admision = () => {

    const [openForm, setOpenForm] = useState(false)

    const handleForm = () => {
        setOpenForm(!openForm)
    }

    return (
        <div className="principal admision">
            <NavTop />
            <section className='left-a'>
                <h3 className="title-page">PANEL DE OPCIONES</h3>
                <div className="btnss">
                    <p >Generar Reporte</p>
                    <p >Imprimir Tabla</p>
                    <p ><MdOutlineCloudUpload /> Subir Resultados</p>
                    <p >Filtrar Datos</p>
                    <p >Buscar</p>
                </div>
            </section>
            <section className='center'>
                <h2 className="title-page">ADMISIÓN - IESTP SUIZA -2025</h2>
                <button onClick={handleForm} className='btn-reg'><MdPersonAddAlt1 style={{ fontSize: '19px' }} />Registrar Nuevo</button>
                <div className="acciones">
                    <Volver />
                    <Buscardor />
                    <select className='carre-s'>
                        <option value="1">Desarrollo de sistemas</option>
                        <option value="2">Enfermería</option>
                        <option value="3">Construcción civil</option>
                        <option value="">Contabilidad</option>
                        <option value="">Adm. de Empresas</option>
                        <option value="">Mecanica automotriz</option>
                        <option value="">Electricidad industrial</option>
                        <option value="">Producción agropecuaria</option>
                        <option value="">Manejo forestal</option>
                        <option value="">Adm. Opereciones turísticas</option>
                        <option value="">Asistencia administrativa</option>
                    </select>
                    <select className='condi-s'>
                        <option value="ingresado">Ingresados</option>
                        <option value="no ingresado">No Ingresados</option>
                    </select>
                </div>

                <p className='contador'>3 de 3</p>
                <table>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Apellidos</th>
                            <th>Nombres</th>
                            <th>DNI</th>
                            <th>Telefono</th>
                            <th>Correo</th>
                            <th>Carrera Profesional</th>
                            <th>Puntaje</th>
                            <th>Condición</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Apellido 1</td>
                            <td>Nombres 1</td>
                            <td>12345678</td>
                            <td>123456789</td>
                            <td className='email'>correo1@correo.com</td>
                            <td>Carrera 1</td>
                            <td>100</td>
                            <td>APROBADO</td>
                        </tr>
                    </tbody>
                </table>
                <div className="paginacion">
                    <button className="btn"><IoIosArrowBack />Anterior</button>
                    <button className="btn">Siguiente<GrFormNext /></button>
                </div>
            </section>
            {openForm && (
                <FormAdmision close={handleForm} />
            )}
            <NavPie />
        </div>
    )
}

export default Admision