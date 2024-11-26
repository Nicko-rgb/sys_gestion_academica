import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCaretBackOutline } from "react-icons/io5";
import { GrHomeRounded } from "react-icons/gr";

const Volver = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Regresa a la ruta anterior
    };

    const handleHome = () => {
        navigate('/panel'); // Regresa a la ruta principal
    }

    return (
        <div className='volver-box'>
            <button 
                className='volver-link' 
                onClick={handleHome}> 
                <GrHomeRounded />Home
            </button>
            <button onClick={handleGoBack} className='volver-link'><IoCaretBackOutline />VOLVER</button>
        </div>
    );
};

export default Volver;