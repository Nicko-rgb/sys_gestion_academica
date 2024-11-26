// src/components/NavTop.js
import React, { useState , useEffect} from 'react';
import './nav.css';
import { useNavigate } from 'react-router-dom';
import { FaBarsStaggered, FaUsersGear} from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa";
import Sidebar from './Sidebar';
import ModalConfir from '../Modals/ModalConfir';
import EstadoSesion from '../Complementos/EstadoSesion';

const NavTop = ({sidebarTrue} ) => {
    const [sidebar, setSidebar] = useState(false);
    const navigate = useNavigate();
    const [modalOpen, setModalClose] = useState(false)
    const token = localStorage.getItem('token');
    const { nombre, rutaPerfil, handleLogout } = EstadoSesion()

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [navigate]); 

    const handleSidebar = () => {
        setSidebar(!sidebar);
    };
    
    const recargar = () => {
        window.location.reload();
    }

    const handleModalSesion = () => {
        setModalClose(!modalOpen)
    }
    const messageModal = 'Estas seguro que quieres cerrar sesión?'
    const irPerfil = () => {
        navigate(rutaPerfil)
    }

    const irAdmins = () => {
        navigate('/admins');
    }

    return (
        <div className='nav-top'>
            <div className='left' onClick={recargar}>
                <FaUsersGear className='ico ico-1' />
                <p className='sub-title-page'>Sistema de Gestión Académica - IESTP SUIZA</p>
            </div>
            <div className='right'>
                <p className="name">{nombre} </p>
                <FaUser className='ico ico-u' title='PERFIL' onClick={irPerfil} />
                <IoPeopleSharp className='ico ico-p' onClick={irAdmins} title='ADMINS' />
                <FaPowerOff className='ico ico-o' onClick={handleModalSesion} title='CERRAR SESION'/>
                <FaBarsStaggered className='ico ico-m' onClick={handleSidebar} title='MENÚ' />
            </div>
            <Sidebar close={handleSidebar} sidebar={sidebar} sidebarTrue={sidebarTrue} />
            {modalOpen && (
                <ModalConfir 
                    close={handleModalSesion} 
                    message={messageModal}
                    accion={handleLogout}
                 />
            )}
        </div>
    );
};

export default NavTop;