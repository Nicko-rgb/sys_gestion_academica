import React from 'react';
import './pagination.css';
import { IoIosArrowBack } from "react-icons/io";
import { GrFormNext } from "react-icons/gr";

const BtnPagina = ({ back, next }) => {
    return (
        <div className="paginacion">
            <button
                className="btn-prev"
                onClick={back}
                disabled={!back}
            >
                <IoIosArrowBack />Anterior
            </button>
            <button
                className="btn-next"
                onClick={next}
                disabled={!next}
            >
                Siguiente<GrFormNext style={{ fontSize: '17px' }} />
            </button>
        </div>
    );
};

export default BtnPagina;
