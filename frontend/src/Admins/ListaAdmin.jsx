import React, { useState, useEffect } from 'react';
import './lista.css';
import NavTop from '../Navegador/NavTop';
import NavPie from '../Navegador/NavPie';
import Buscardor from '../Complementos/Buscardor';
import Form from './Form';
import { MdPersonAddAlt1 } from "react-icons/md";

const ListaAdmin = () => {
    const [openForm, setOpenForm] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleForm = () => {
        setOpenForm(!openForm);
    };

    // Función para obtener la lista de administradores
    const fetchAdmins = async () => {
        try {
            const response = await fetch('http://localhost:3005/api/admins-all');
            if (!response.ok) {
                throw new Error('Error al obtener los administradores');
            }
            const data = await response.json();
            setAdmins(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Polling para actualizar los datos periódicamente
    useEffect(() => {
        fetchAdmins(); // Llama a la función la primera vez
        const interval = setInterval(fetchAdmins, 1000); // Repite cada 5 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, []);

    return (
        <div className="principal admins-list">
            <NavTop />
            <main>
                <h1 className="title-page">PERSONALES ADMINISTRATIVOS</h1>
                <button className='btn-reg' onClick={handleForm}>
                    <MdPersonAddAlt1 className='ico' />Registrar Nuevo
                </button>
                <div className="container-table">
                    <div className="acciones">
                        <Buscardor />
                        <select className="filtro">
                            <option value="nombre">Filtrar Todo</option>
                            <option value="activos">Activos</option>
                            <option value="inactivos">Inactivos</option>
                        </select>
                    </div>
                    <p className='contador'>{admins.length} de {admins.length}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>DNI</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Correo</th>
                                <th>Telefono</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8">Cargando...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="8">Error: {error}</td>
                                </tr>
                            ) : admins.length > 0 ? (
                                admins.map((admin, index) => (
                                    <tr key={admin.id_admin}>
                                        <td>{index + 1}</td>
                                        <td>{admin.dni}</td>
                                        <td>{admin.nombres}</td>
                                        <td>{admin.apellidos}</td>
                                        <td>{admin.email}</td>
                                        <td>{admin.telefono}</td>
                                        <td>{admin.rol}</td>
                                        <td>
                                            {/* Botones de acciones */}
                                            {/* <button className="btn-edit">Editar</button>
                                            <button className="btn-delete">Eliminar</button> */}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">No hay administradores registrados.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
            <NavPie />
            {openForm && <Form close={handleForm} />}
        </div>
    );
};

export default ListaAdmin;
