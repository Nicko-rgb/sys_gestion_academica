import React, { useState, useEffect } from 'react';
import './lista.css';
import NavTop from '../Navegador/NavTop';
import NavPie from '../Navegador/NavPie';
import Buscardor from '../Complementos/Buscardor';
import Form from './FormRegistro/Form';
import EditAdmin from './FormEdit/EditAdmin';
import Volver from '../Navegador/Volver';
import ModalConfir from '../Modals/ModalConfir';
import { MdPersonAddAlt1 } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { MdOutlineBlock } from "react-icons/md";
import { FaUnlock } from "react-icons/fa";

const ListaAdmin = () => {
    const [openForm, setOpenForm] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openConfir, setOpenConfir] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [adminSelect, setAdminSelect] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('activo'); // Estado para el filtro actual
    const [ searchTerm, setSearchTerm] = useState(''); // Estado para el buscador

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

    useEffect(() => {
        fetchAdmins();
        const interval = setInterval(fetchAdmins, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleForm = () => setOpenForm(!openForm);

    const handleModalConfir = (admin) => {
        setAdminSelect(admin);
        setOpenConfir(!openConfir);
    };

    const handleEdit = (admin) => {
        setAdminSelect(admin);
        setOpenEdit(true);
    };

    // Función para inactivar al usuario seleccionado
    const inactivateAdmin = async () => {
        if (!adminSelect) return;
        const estado = adminSelect.estado === 'activo' ? 'inactivo' : 'activo';

        try {
            const response = await fetch(`http://localhost:3005/api/admins-inactive/${adminSelect.id_admin}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado }),
            });

            if (!response.ok) {
                throw new Error('Error al inactivar el administrador');
            }

            fetchAdmins();
            setOpenConfir(false);
            setAdminSelect(null);
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    // Función para manejar el cambio del filtro
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    // Función para manejar el cambio en el buscador
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // Filtrar los administradores según el filtro y el texto de búsqueda
    const filteredAdmins = admins.filter((admin) => {
        const matchesFilter = 
            (filter === 'activo' && admin.estado === 'activo') ||
            (filter === 'inactivo' && admin.estado === 'inactivo') ||
            filter === 'todos';

        const matchesSearch =
            admin.nombres.toLowerCase().includes( searchTerm) ||
            admin.apellidos.toLowerCase().includes( searchTerm) ||
            String(admin.dni).includes( searchTerm);

        return matchesFilter && matchesSearch;
    });

    return (
        <div className="principal admins-list">
            <NavTop />
            <main>
                <h1 className="title-page">PERSONALES ADMINISTRATIVOS</h1>
                <button className="btn-reg" onClick={handleForm}>
                    <MdPersonAddAlt1 className="ico" />Registrar Nuevo
                </button>
                <div className="container-table">
                    <div className="acciones">
                        <Volver />
                        <Buscardor onSearchChange={handleSearchChange} />
                        <select className="filtro" onChange={handleFilterChange}>
                            <option value="activo">Activos</option>
                            <option value="inactivo">Inactivos</option>
                            <option value="todos">Todos</option>
                        </select>
                    </div>
                    <p className="contador">{filteredAdmins.length} de {admins.length}</p>
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
                                <th>Estado</th>
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
                            ) : filteredAdmins.length > 0 ? (
                                filteredAdmins.map((admin, index) => (
                                    <tr key={admin.id_admin}>
                                        <td>{index + 1}</td>
                                        <td>{admin.dni}</td>
                                        <td>{admin.nombres}</td>
                                        <td>{admin.apellidos}</td>
                                        <td className="email">{admin.email}</td>
                                        <td>{admin.telefono}</td>
                                        <td>{admin.rol}</td>
                                        <td>{admin.estado}</td>
                                        <td className="accion">
                                            {admin.estado === 'activo' ? (
                                                <div>
                                                    <RiEdit2Line
                                                        title="EDITAR"
                                                        className="ico ico-edit"
                                                        onClick={() => handleEdit(admin)}
                                                    />
                                                    <MdOutlineBlock
                                                        title="INACTIVAR"
                                                        className="ico ico-bloq"
                                                        onClick={() => handleModalConfir(admin)}
                                                    />
                                                </div>) : (
                                                <div>
                                                    <FaUnlock
                                                        title='ACTIVAR'
                                                        className='ico ico-acti'
                                                        onClick={() => handleModalConfir(admin)}
                                                    />
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">No hay administradores para mostrar.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
            {openForm && <Form close={handleForm} />}
            {openEdit && adminSelect && (
                <EditAdmin 
                    close={() => setOpenEdit(false)} 
                    admin={adminSelect} 
                />
            )}
            {openConfir && adminSelect && (
                <ModalConfir
                    close={() => setOpenConfir(false)}
                    message={`¿Estás seguro de ${adminSelect.estado === 'activo' ? 'inactivar' : 'activar'} a ${adminSelect.nombres}?`}
                    accion={inactivateAdmin}
                />
            )}
            <NavPie />
        </div>
    );
};

export default ListaAdmin;
