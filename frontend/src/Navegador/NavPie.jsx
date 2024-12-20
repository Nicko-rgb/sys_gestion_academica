import React from 'react'
import './nav.css'
import { FaBookReader, FaPhoneAlt } from "react-icons/fa";

const NavPie = () => {
    return (
        <div className='nav-pie'>
            <div className='left'>
                <p id='id'>© Copyrigth Derechos Reservados-2024 by Nixon y Joseph</p>
            </div>
            <div className="right">
                <button><FaBookReader />Documentación</button>
                <button><FaPhoneAlt />Contacto</button>
            </div>
        </div>
    )
}

export default NavPie