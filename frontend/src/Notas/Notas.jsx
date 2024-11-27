import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavTop from '../Navegador/NavTop';
import NavBottom from '../Navegador/NavPie';
import Buscardor from '../Complementos/Buscardor';
import Volver from '../Navegador/Volver';
import BtnPagina from '../Complementos/BtnPagina';

const Notas = () => {
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCarrera, setSelectedCarrera] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [carreras, setCarreras] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const fetchNotas = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:3005/api/obtener-notas');
            setStudents(response.data || []);
        } catch (error) {
            console.error('Error al obtener notas:', error);
            setError('No se pudo cargar la lista de notas.');
        } finally {
            setLoading(false);
        }
    };

    const fetchCarreras = async () => {
        try {
            const response = await axios.get('http://localhost:3005/api/carreras-all');
            setCarreras(response.data || []);
        } catch (error) {
            console.error('Error al obtener carreras:', error);
        }
    };

    useEffect(() => {
        fetchNotas();
        fetchCarreras();
    }, []);

    const getUniqueYears = () => {
        const years = students.map((data) => new Date(data.createdAt).getFullYear());
        return [...new Set(years)].sort((a, b) => b - a);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1);
    };

    const filteredNotas = students.filter((student) => {
        const yearMatch = selectedYear
            ? new Date(student.createdAt).getFullYear() === selectedYear
            : true;
        const carreraMatch = selectedCarrera
            ? student.carrera?.nombre?.toLowerCase().includes(selectedCarrera.toLowerCase())
            : true;
        const searchMatch = searchTerm
            ? student.nombres.toLowerCase().includes(searchTerm) ||
              student.apellidos.toLowerCase().includes(searchTerm) ||
              student.dni.includes(searchTerm)
            : true;

        return yearMatch && carreraMatch && searchMatch;
    });

    const totalPages = Math.ceil(filteredNotas.length / itemsPerPage);
    const paginatedNotas = filteredNotas.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="principal notas">
            <NavTop />
            <main>
                {/* Contenedor para Volver y Home */}
                <div className="acciones-top">
                    <Volver />
                </div>
                
                <h3 className="title-page">NOTAS DE ESTUDIANTES</h3>

                {/* Filtros de carrera y año */}
                <div className="acciones">
                    <select
                        className="carre-s"
                        value={selectedCarrera}
                        onChange={(e) => setSelectedCarrera(e.target.value)}
                    >
                        <option value="">Carrera Profesional</option>
                        {carreras.map((carrera, index) => (
                            <option key={index} value={carrera.nombre}>
                                {carrera.nombre}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        <option value={new Date().getFullYear()}>Año</option>
                        {getUniqueYears().map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Buscador ahora debajo de los filtros */}
                <div className="buscador-section">
                    <Buscardor onSearchChange={handleSearchChange} />
                </div>

                <div className="table-contend">
                    <h3 className="sub-title-page">NOTAS REGISTRADAS - {selectedYear}</h3>
                    <p className="contador">{filteredNotas.length} de {students.length}</p>
                    {loading ? (
                        <p className="loading-message">Cargando datos...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : filteredNotas.length === 0 ? (
                        searchTerm ? (
                            <p className="no-results-message">No se encontraron resultados para "{searchTerm}"</p>
                        ) : (
                            <p className="empty-message">No hay notas registradas aún.</p>
                        )
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Apellido</th>
                                    <th>Nombre</th>
                                    <th>DNI</th>
                                    <th>Carrera</th>
                                    <th>Curso</th>
                                    <th>Nota</th>
                                    <th>Año</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedNotas.map((student, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{student.apellidos}</td>
                                        <td>{student.nombres}</td>
                                        <td>{student.dni}</td>
                                        <td>{student.carrera?.nombre || '---'}</td>
                                        <td>{student.curso}</td>
                                        <td>{student.nota}</td>
                                        <td>{new Date(student.createdAt).getFullYear()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Paginación */}
                <BtnPagina
                    back={currentPage > 1 ? handlePrevPage : null}
                    next={currentPage < totalPages ? handleNextPage : null}
                />
            </main>
            <NavBottom />
        </div>
    );
};

export default Notas;
