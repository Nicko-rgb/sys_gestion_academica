import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admison.css';
import NavPie from '../Navegador/NavPie';
import NavTop from '../Navegador/NavTop';
import Volver from '../Navegador/Volver';
import Buscardor from '../Complementos/Buscardor';
import BtnPagina from '../Complementos/BtnPagina';
import OpcionesI from './Opciones/OpcionesI';

const Admision = () => {
    const [postulantes, setPostulantes] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCarrera, setSelectedCarrera] = useState('');
    const [selectedCondicion, setSelectedCondicion] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;

    const fetchPostulantes = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3005/api/obtener-postulantes');
            const datos = await response.json();
            setPostulantes(datos);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error al obtener postulantes:', error);
        }
    };

/*************  ✨ Codeium Command ⭐  *************/
    /**
     * Fetches the list of all available careers from the API and updates the
     * component state with the response data.
     */
/******  0f511bb3-7ed3-480f-bcc3-a627911d1208  *******/    const fetchCarreras = async () => {
        try {
            const response = await axios.get('http://localhost:3005/api/carreras-all');
            setCarreras(response.data);
        } catch (error) {
            console.error('Error al obtener carreras:', error);
        }
    };

    const getUniqueYears = () => {
        const years = postulantes.map((data) => new Date(data.createdAt).getFullYear());
        return [...new Set(years)].sort((a, b) => b - a);
    };

    useEffect(() => {
        fetchPostulantes();
        fetchCarreras();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1); // Reinicia a la primera página al buscar
    };

    const filteredPostulantes = postulantes.filter((postulante) => {
        const yearMatch = selectedYear
            ? new Date(postulante.createdAt).getFullYear() === selectedYear
            : true;
        const carreraMatch = selectedCarrera
            ? postulante.carrera_postulada.toLowerCase() === selectedCarrera.toLowerCase()
            : true;
        const condicionMatch = selectedCondicion
            ? postulante.resultado && postulante.resultado.condicion?.toLowerCase() === selectedCondicion.toLowerCase()
            : true;
        const searchMatch = searchTerm
            ? postulante.nombres.toLowerCase().includes(searchTerm) ||
            postulante.apellidos.toLowerCase().includes(searchTerm) ||
            postulante.dni.includes(searchTerm)
            : true;

        return yearMatch && carreraMatch && condicionMatch && searchMatch;
    });

    // Calcular los datos para la página actual
    const indexOfLastItem = currentPage * resultsPerPage;
    const indexOfFirstItem = indexOfLastItem - resultsPerPage;
    const currentPostulantes = filteredPostulantes.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredPostulantes.length / resultsPerPage);

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
        <div className="principal admision">
            <NavTop />
            <OpcionesI carreras={carreras} />
            <section className="center">
                <h2 className="title-page">RESULTADOS DE ADMISIÓN - IESTP SUIZA - {new Date().getFullYear()}</h2>
                <div className="acciones filtrar">
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
                        className="condi-s"
                        value={selectedCondicion}
                        onChange={(e) => setSelectedCondicion(e.target.value)}
                    >
                        <option value="">Condición</option>
                        <option value="no ingresó">No Ingresados</option>
                        <option value="ingresó">Ingresados</option>
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

                <p className="contador">{currentPostulantes.length} de {filteredPostulantes.length}</p>
                <table>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Apellidos</th>
                            <th>Nombres</th>
                            <th>DNI</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                            <th>Carrera Profesional</th>
                            <th>Puntaje</th>
                            <th>Condición</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={9}>Cargando...</td>
                            </tr>
                        ) : currentPostulantes.length === 0 ? (
                            <tr>
                                {searchTerm ? (
                                    <td colSpan={9}>Búsqueda no encontrada para "{searchTerm}"</td>
                                ) : (
                                    <td colSpan={9}>No hay resultados</td>
                                )}
                            </tr>
                        ) : (
                            currentPostulantes.map((dato, index) => (
                                <tr key={index}>
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>{dato.apellidos}</td>
                                    <td>{dato.nombres}</td>
                                    <td>{dato.dni}</td>
                                    <td>{dato.telefono}</td>
                                    <td>{dato.email}</td>
                                    <td>{dato.carrera_postulada}</td>
                                    <td>{dato.resultado ? dato.resultado.puntaje : '---'}</td>
                                    <td>{dato.resultado ? dato.resultado.condicion : '---'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <BtnPagina
                    back={currentPage > 1 ? handlePrevPage : null}
                    next={currentPage < totalPages ? handleNextPage : null}
                />
            </section>
            <NavPie />
        </div>
    );
};

export default Admision;
