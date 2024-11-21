// src/components/Sidebar.js
import React from 'react';
import './sidebar.css';
import { IoClose } from "react-icons/io5";
import { PiStudentBold } from "react-icons/pi";
import { PiBooksBold } from "react-icons/pi";
import { TfiWrite } from "react-icons/tfi"; 
import { LuCheckSquare } from "react-icons/lu";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Sidebar = ({ close, sidebar, sidebarTrue }) => {
    return (
        <div className={`sidebar ${sidebar? 'active' : ''}`}>
            <IoClose onClick={close} className='ico-close' />
            <h2 className="title-page">Gestión Académica</h2>
            <ul className="menu">
                <Link to='' className='p'><PiStudentBold />Estudiantes</Link>
                <Link to='' className='p'><PiBooksBold /> Cursos</Link>
                <Link to='' className='p'><TfiWrite />Calificaciones</Link>
                <Link to='' className='p'><LuCheckSquare />Asistencia</Link>
                <Link to='/admins' className='p'><IoPeopleSharp style={{fontSize: '19px'}}/>Administradores</Link>
                <Link to='' className='p'><MdOutlineReportGmailerrorred style={{fontSize: '20px'}} />Reportes</Link>
            </ul>
        </div>
    );
};

export default Sidebar;