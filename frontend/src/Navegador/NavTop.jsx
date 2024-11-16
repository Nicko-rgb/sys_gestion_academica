// src/components/NavTop.js
import React, { useState } from 'react';
import './nav.css';
import { FaBarsStaggered, FaUsersGear} from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import Sidebar from './Sidebar';

const NavTop = () => {
    const [sidebar, setSidebar] = useState(false);

    const handleSidebar = () => {
        setSidebar(!sidebar);
    };
    
    const recargar = () => {
        window.location.reload();
    }

    return (
        <div className='nav-top'>
            <div className='left' onClick={recargar}>
                <FaUsersGear className='ico ico-1' />
                <p className='sub-title-page'>Sistema de Gestión Académica - IESTP SUIZA</p>
            </div>
            <div className='right'>
                <p className="name">Nixon Mancilla</p>
                <FaUser className='ico ico-u' />
                <IoPeopleSharp className='ico ico-p' />
                <FaBarsStaggered className='ico ico-m' onClick={handleSidebar} />
            </div>
            <Sidebar close={handleSidebar} sidebar={sidebar} />
        </div>
    );
};

export default NavTop;