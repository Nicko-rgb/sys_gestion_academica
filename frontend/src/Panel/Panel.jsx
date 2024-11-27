import React, {useState } from 'react';
import './panel.css'
import { Link, useNavigate } from 'react-router-dom';
import NavPie from '../Navegador/NavPie';
import NavTop from '../Navegador/NavTop';
import { IoMdOpen } from "react-icons/io";

const Panel = () => {

    const [sidebarTrue] = useState(true)

    return (
        <div className="principal panel">
            <NavTop sidebarTrue={sidebarTrue} />
            <main>
                <h5 className='title-page'>SISTEMA DE GESTION ACADÉMICA - IESTP SUIZA</h5>
                <div>
                    <Link className='aaa' to='/estudiantes'>
                        <IoMdOpen  className='ico'/>
                        <p>ESTUDIANTES</p>
                        <button>Acción</button>
                    </Link>
                    <Link className='aaa' to='/programas-studio'>
                        <IoMdOpen  className='ico'/>
                        <p>PROGRAMAS DE ESTUDIOS</p>
                        <button>Acción</button>
                    </Link>
                    <Link className='aaa' to='/matricula'>
                        <IoMdOpen className='ico' />
                        <p>MATRICULAS Y PAGOS</p>
                        <button>Acción</button>
                    </Link>
                    <Link className='aaa' to='/admision'>
                        <IoMdOpen  className='ico'/>
                        <p>EXAMEN DE ADMISION</p>
                        <button>Acción</button>
                    </Link>
                    <Link className='aaa' to='/selectCaEs'>
                        <IoMdOpen  className='ico'/>
                        <p>NOTAS DE ESTUDIANTES</p>
                        <button>Acción</button>
                    </Link>
                    
                </div>
            </main>
            <NavPie />
        </div>
    );
}

export default Panel;