import React, { useEffect } from 'react';
import './panel.css'
import { useNavigate } from 'react-router-dom';
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
                    <aside>
                        <IoMdOpen  className='ico'/>
                        <p>Opción 1</p>
                        <button>Acción</button>
                    </aside>
                    <aside>
                        <IoMdOpen  className='ico'/>
                        <p>Opción 2</p>
                        <button>Acción</button>
                    </aside>
                    <aside>
                        <IoMdOpen className='ico' />
                        <p>Opción 3</p>
                        <button>Acción</button>
                    </aside>
                    <aside>
                        <IoMdOpen  className='ico'/>
                        <p>Opción 4</p>
                        <button>Acción</button>
                    </aside>
                    <aside>
                        <IoMdOpen  className='ico'/>
                        <p>Opción 5</p>
                        <button>Acción</button>
                    </aside>
                </div>
            </main>
            <NavPie />
        </div>
    );
}

export default Panel;