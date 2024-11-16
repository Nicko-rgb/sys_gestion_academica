import React from 'react'
import NavTop from '../Navegador/NavTop'
import NavPie from '../Navegador/NavPie'

const ListaAdmin = () => {
    return (
        <div className="principal admins-list">
            <NavTop />
            <main>
                <h5 className="title-page">PERSONALES ADMINISTRATIVOS</h5>
                <div className="cotainer-table">
                    <table>
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>DNI</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Correo</th>
                                <th>Telefono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>12345678</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
            <NavPie />
        </div>
    )
}

export default ListaAdmin