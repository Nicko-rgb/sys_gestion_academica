import React from 'react';
import './buscador.css';
import { MdPersonSearch } from "react-icons/md";

const Buscardor = ({ onSearchChange }) => {
    return (
        <div className="buscador">
            <input
                type="text"
                placeholder="Buscar por DNI, nombres o apellidos..."
                onChange={onSearchChange}
            />
            <MdPersonSearch className='ico' />
        </div>
    );
};

export default Buscardor;
