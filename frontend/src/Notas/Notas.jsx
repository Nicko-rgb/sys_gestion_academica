import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import NavTop from '../Navegador/NavTop';
import NavBottom from '../Navegador/NavPie';
import Buscardor from '../Complementos/Buscardor';
import Volver from '../Navegador/Volver';
import BtnPagina from '../Complementos/BtnPagina';
import { useLocation } from 'react-router-dom';
import './notas.css';
import { useNavigate } from 'react-router-dom';

const Notas = () => {
    const location = useLocation();
    const { carrera = {} } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('Todos');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const fetchNotas = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:3005/api/obtener-estudiantes');
            setStudents(response.data || []);
        } catch (error) {
            console.error('Error al obtener notas:', error);
            setError('No se pudo cargar la lista de notas.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotas();
    }, []);

    const uniqueYears = useMemo(() => {
        const years = students
            .map((data) => data.createdAt && new Date(data.createdAt).getFullYear())
            .filter((year) => year);
        return [...new Set(years)].sort((a, b) => b - a);
    }, [students]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1);
    };

    const filteredNotas = students.filter((student) => {
        const yearMatch =
            selectedYear === 'Todos' || 
            (student.createdAt && new Date(student.createdAt).getFullYear() === Number(selectedYear));
        const carreraMatch = carrera.nombre
            ? student.carrera?.nombre?.toLowerCase() === carrera.nombre.toLowerCase()
            : true;
        const searchMatch = searchTerm
            ? student.nombres?.toLowerCase().includes(searchTerm) ||
              student.apellidos?.toLowerCase().includes(searchTerm) ||
              student.dni?.includes(searchTerm)
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
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const navigate = useNavigate()

    const handleUploadNota = (student) => {
        navigate(`/subirNota/${carrera.nombre}/${student.dni}`, { state: { student } })
    };

    return (
        <div className="principal notas">
            <NavTop />
            <main>
                <h3 className="title-page">NOTAS DE ESTUDIANTES</h3>
                <p className="notas-subtitle">Consulta y gestión de notas</p>
                <div className="acciones">
                    <Volver />
                    <Buscardor onSearchChange={handleSearchChange} />
                    <select
                        className="notas-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="Todos">Todos los años</option>
                        {uniqueYears.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="notas-table-container">
                    <h3 className="notas-sub-title-page">NOTAS REGISTRADAS - {selectedYear}</h3>
                    <p className="notas-contador">
                        {filteredNotas.length} de {students.length}
                    </p>
                    {loading ? (
                        <p className="notas-loading-message">Cargando datos...</p>
                    ) : error ? (
                        <p className="notas-error-message">{error}</p>
                    ) : filteredNotas.length === 0 ? (
                        searchTerm ? (
                            <p className="notas-no-results-message">
                                No se encontraron resultados para "{searchTerm}"
                            </p>
                        ) : (
                            <p className="notas-empty-message">No hay notas registradas aún.</p>
                        )
                    ) : (
                        <table className="notas-table">
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Apellido</th>
                                    <th>Nombre</th>
                                    <th>DNI</th>
                                    <th>Carrera</th>
                                    <th>Promedio Final</th>
                                    <th>Año</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedNotas.map((student, index) => (
                                    <tr key={index}>
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{student.apellidos}</td>
                                        <td>{student.nombres}</td>
                                        <td>{student.dni}</td>
                                        <td>{student.carrera?.nombre || '---'}</td>
                                        <td>{student.nota || '---'}</td>
                                        <td>
                                            {student.createdAt
                                                ? new Date(student.createdAt).getFullYear()
                                                : '---'}
                                        </td>
                                        <td>
                                            <button onClick={() => handleUploadNota(student)}>
                                                Subir Nota
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

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
