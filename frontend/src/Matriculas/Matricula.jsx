import React, { useEffect, useState } from 'react';
import './matricula.css';
import axios from 'axios';
import NavTop from '../Navegador/NavTop';
import NavBottom from '../Navegador/NavPie';
import Buscardor from '../Complementos/Buscardor';
import { MdPersonAddAlt1 } from "react-icons/md";
import Volver from '../Navegador/Volver';
import BtnPagina from '../Complementos/BtnPagina';
import FormPostulante from './FormMatricula/FormPostu';
import { LuPencilLine } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const Matricula = () => {
    const [formMatricula, setFormMatricula] = useState(false);
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCarrera, setSelectedCarrera] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [carreras, setCarreras] = useState([]); // Carrera array (definir o cargar desde API)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectStudent, setSelectStudent] = useState(null)

    const fetchPostulantes = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:3005/api/obtener-estudiantes');
            setStudents(response.data || []);
        } catch (error) {
            console.error('Error al obtener postulantes:', error);
            setError('No se pudo cargar la lista de postulantes.');
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
        fetchPostulantes();
        fetchCarreras();
    }, []);

    const getUniqueYears = () => {
        const years = students.map((data) => new Date(data.createdAt).getFullYear());
        return [...new Set(years)].sort((a, b) => b - a);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1); // Reinicia a la primera página al buscar
    };

    const handleFormMatricula = () => {
        setFormMatricula(!formMatricula);
    };

    const filteredPostulantes = students.filter((studen) => {
        const yearMatch = selectedYear
            ? new Date(studen.createdAt).getFullYear() === selectedYear
            : true;
        const carreraMatch = selectedCarrera
            ? studen.carrera.nombre.toLowerCase().includes(selectedCarrera.toLowerCase())
            : true;
        const searchMatch = searchTerm
            ? studen.nombres.toLowerCase().includes(searchTerm) ||
            studen.apellidos.toLowerCase().includes(searchTerm) ||
            studen.dni.includes(searchTerm)
            : true;

        return yearMatch && carreraMatch && searchMatch;
    });

    // Implementación de paginación
    const totalPages = Math.ceil(filteredPostulantes.length / itemsPerPage);
    const paginatedPostulantes = filteredPostulantes.slice(
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

    const navigate = useNavigate()

    const irMatricula = (student) => {
        setSelectStudent(student);
        navigate(`/matricula/${student.dni}/${student.id_estudiante}`, { state: { student } });
    }


    return (
        <div className="principal matricula">
            <NavTop />
            <main>
                <h3 className="title-page">MATRÍCULAS Y PAGOS</h3>
                <button className="btn-reg" onClick={handleFormMatricula}>
                    <MdPersonAddAlt1 className="ico-reg" />Registrar Postulante
                </button>
                <div className="acciones">
                    <Volver />
                    <Buscardor onSearchChange={handleSearchChange} />
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
                <div className="table-contend">
                    <h3 className="sub-title-page">ESTUDIANTES MATRICULADOS - {selectedYear}</h3>
                    <p className='contador'>{filteredPostulantes.length} de {students.length}</p>
                    {loading ? (
                        <p className="loading-message">Cargando datos...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : filteredPostulantes.length === 0 ? (
                        <>
                        {searchTerm ? (
                            <p className="no-results-message">No se encontraron resultados para "{searchTerm}"</p>
                        ) : (
                            <p className="empty-message">No hay estudiantes registrados aún.</p>
                        )}
                        </>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Apellido</th>
                                    <th>Nombre</th>
                                    <th>DNI</th>
                                    <th>Correo</th>
                                    <th>Teléfono</th>
                                    <th>Carrera Profesional</th>
                                    <th>Condicíon</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedPostulantes.map((student, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{student.apellidos}</td>
                                        <td>{student.nombres}</td>
                                        <td>{student.dni}</td>
                                        <td className='email'>{student.email}</td>
                                        <td>{student.telefono}</td>
                                        <td>{student.carrera ? student.carrera.nombre : '---'}</td>
                                        <td>{student.condicion}</td>
                                        <td className='acc-t'>
                                            <div>
                                                <button onClick={() => irMatricula(student)}><LuPencilLine className='ico' />VER MATRICULAS</button>
                                            </div>
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

            {formMatricula && <FormPostulante close={handleFormMatricula} />}
        </div>
    );
};

export default Matricula;
