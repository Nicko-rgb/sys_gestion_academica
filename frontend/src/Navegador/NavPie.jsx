import React from 'react'
import './nav.css'
import { FaBookReader, FaPhoneAlt } from "react-icons/fa";

const NavPie = () => {
    return (
        <div className='nav-pie'>
            <div className='left'>
                <p>© Copyrigth Derechos Reservados-2024  by Nixon</p>
            </div>
            <div className="right">
                <button><FaBookReader />Documentación</button>
                <button><FaPhoneAlt />Contacto</button>
            </div>
        </div>
    )
}

export default NavPie