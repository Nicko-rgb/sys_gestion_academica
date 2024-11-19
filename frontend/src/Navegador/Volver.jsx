import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCaretBackOutline } from "react-icons/io5";

const Volver = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Regresa a la ruta anterior
    };

    return (
        <button onClick={handleGoBack} className='volver-link'><IoCaretBackOutline />VOLVER</button>
    );
};

export default Volver;