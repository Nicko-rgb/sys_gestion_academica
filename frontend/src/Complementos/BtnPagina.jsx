import React from 'react'
import './pagination.css'
import { IoIosArrowBack } from "react-icons/io";
import { GrFormNext } from "react-icons/gr";


const BtnPagina = ({logintudBack, logitudNext}) => {
    return (
        <div className="paginacion">
            <button className="btn-prev"><IoIosArrowBack />Anterior</button>
            <button className="btn-next">Siguiente<GrFormNext style={{fontSize: '17px'}}/></button>
        </div>
    )
}

export default BtnPagina