import React from 'react'
import './perfil.css'
import NavTop from '../../Navegador/NavTop'
import NavBottom from '../../Navegador/NavPie'
import EstadoSesion from '../../Complementos/EstadoSesion'

const Perfil = () => {
    const {nombre, apellido, correo, dni, telefono, estado, rol} = EstadoSesion()
    return (
        <div className="principal perfil">
            <NavTop />
            <main>
                <h5 className="title-page">PERFIL DE ADMIN</h5>
                <div className="container">
                    <p>{nombre} </p>
                    <p>{apellido} </p>
                    <p>{correo} </p>
                    <p>{dni} </p>
                    <p>{telefono} </p>
                    <p>{estado} </p>
                    <p>{rol} </p>
                </div>
            </main>
            <NavBottom />
        </div>
    )
}

export default Perfil