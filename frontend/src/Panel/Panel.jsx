import React, { useEffect } from 'react';
import './panel.css'
import { Link, useNavigate } from 'react-router-dom';
import NavPie from '../Navegador/NavPie';
import NavTop from '../Navegador/NavTop';
import { IoMdOpen } from "react-icons/io";

const Panel = () => {

    return (
        <div className="principal panel">
            <NavTop />
            <main>
                <h5 className='title-page'>SISTEMA DE GESTION ACADÉMICA - IESTP SUIZA</h5>
                <div>
                    <Link className='aaa'>
                        <IoMdOpen  className='ico'/>
                        <p>ESTUDIANTES</p>
                        <button>Acción</button>
                    </Link>
                    <Link className='aaa'>
                        <IoMdOpen  className='ico'/>
                        <p>CARRERAS</p>
                        <button>Acción</button>
                    </Link>
                    <Link className='aaa'>
                        <IoMdOpen className='ico' />
                        <p>MATRICULAS</p>
                        <button>Acción</button>
                    </Link>
                    <Link className='aaa' to='/admision'>
                        <IoMdOpen  className='ico'/>
                        <p>ADMISION</p>
                        <button>Acción</button>
                    </Link>
                    <Link className='aaa'>
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