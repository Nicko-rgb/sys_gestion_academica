import React from 'react'
import './perfil.css'
import NavTop from '../../Navegador/NavTop'
import NavBottom from '../../Navegador/NavPie'
import EstadoSesion from '../../Complementos/EstadoSesion'
import Volver from '../../Navegador/Volver'
import user from '../../img/user.png'   

const Perfil = () => {
    const { nombre, apellido, correo, dni, telefono, estado, rol } = EstadoSesion()


    return (
        <div className="principal perfil">
            <NavTop />
            <main>
                <h5 className="title-page">PERFIL DE {rol} </h5>
                <div className="datos">
                    <Volver />
                    <div className="img">
                        <div className="dot"></div>
                        <img src={user} alt="imagen de usuario" />
                    </div>
                    <form>
                        <div className="form-group">
                            <label className="form-label">Nombre
                                <input type="text" value={nombre}  disabled/>
                            </label>
                            <label >Apellido
                                <input type="text" value={apellido}  disabled/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label >DNI
                                <input type="text" value={dni}  disabled/>
                            </label>
                            <label >Correo
                                <input type="email" value={correo} disabled />
                            </label>
                        </div>
                        <div className="form-group">
                            <label >Telefono
                                <input type="text" value={telefono} disabled />
                            </label>
                            <label >Rol
                                <input type="text" value={rol} disabled />
                            </label>
                        </div>
                    </form>
                </div>
            </main>
            <NavBottom />
        </div>
    )
}

export default Perfil