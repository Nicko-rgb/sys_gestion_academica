import React from 'react'
import './buscador.css'
import { MdPersonSearch } from "react-icons/md";

const Buscardor = ({nombre, apellido, dni} ) => {
    return (
        <div className="buscador">
            <input type="text" placeholder="Buscar..."/>
            <MdPersonSearch className='ico' />
        </div>
    )
}

export default Buscardor