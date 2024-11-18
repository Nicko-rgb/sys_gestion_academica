import React, { useEffect } from 'react';
import './panel.css'
import { useNavigate } from 'react-router-dom';
import NavPie from '../Navegador/NavPie';
import NavTop from '../Navegador/NavTop';

const Panel = () => {


    return (
        <div className="principal panel">
            <NavTop />
            <main>
                <h5 className='title-page'>Panel de control</h5>
                <div>
                    <aside></aside>
                    <aside></aside>
                    <aside></aside>
                </div>
                <div>
                    <aside></aside>
                    <aside></aside>
                </div>
            </main>
            <NavPie />
        </div>
    );
}

export default Panel;