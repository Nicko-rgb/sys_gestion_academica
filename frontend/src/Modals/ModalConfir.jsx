import React from 'react'
import './modalconfir.css'

const ModalConfir = ({close, message, accion} ) => {

    return (
        <div className='modal-comfir'>
            <div className='modal-contend'>
                <p>{message} </p>
                <div className="btns">
                    <button className="btn-cancel" onClick={close}>Cancelar</button>
                    <button className="btn-delete" type='submit' onClick={accion}>Aceptar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalConfir