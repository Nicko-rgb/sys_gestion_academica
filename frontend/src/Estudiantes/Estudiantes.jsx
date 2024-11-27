import React, { useEffect, useState } from 'react';
import './Estudiantes.css';
import axios from 'axios';
import NavTop from '../Navegador/NavTop';
import NavBottom from '../Navegador/NavPie';
import Buscardor from '../Complementos/Buscardor';
import Volver from '../Navegador/Volver';

const Estudiantes = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [careers, setCareers] = useState([]);
    const [selectedCarrera, setSelectedCarrera] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

    // Obtener estudiantes
    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:3005/api/obtener-estudiantes');
            setStudents(response.data || []);
        } catch (error) {
            console.error('Error al obtener estudiantes:', error);
        }
    };

    // Obtener carreras
    const fetchCareers = async () => {
        try {
            const response = await axios.get('http://localhost:3005/api/obtener-carreras');
            setCareers(response.data || []);
        } catch (error) {
            console.error('Error al obtener carreras:', error);
        }
    };

    // Obtener cursos del estudiante seleccionado
    const fetchStudentCourses = async (studentId) => {
        try {
            const response = await axios.get(`http://localhost:3005/api/estudiante-cursos/${studentId}`);
            setCourses(response.data || []);
        } catch (error) {
            console.error('Error al obtener los cursos:', error);
        }
    };

    useEffect(() => {
        fetchStudents();
        fetchCareers();
    }, []);

    // Actualización de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // Función de filtrado mejorada (por carrera y por búsqueda)
    const filterStudents = (students) => {
        return students.filter((student) => {
            const searchMatch =
                student.nombres.toLowerCase().includes(searchTerm) ||
                student.apellidos.toLowerCase().includes(searchTerm) ||
                student.dni.includes(searchTerm) ||
                (student.carrera && student.carrera.nombre.toLowerCase().includes(searchTerm));

            const carreraMatch = selectedCarrera
                ? student.carrera && student.carrera.nombre.toLowerCase().includes(selectedCarrera.toLowerCase())
                : true;

            return searchMatch && carreraMatch;
        });
    };

    const filteredStudents = filterStudents(students);

    return (
        <div className="principal estudiantes">
            <NavTop />
            <main>
                <div className="acciones-top">
                    <Volver />
                </div>
                
                <h3 className="title-page">LISTA DE ESTUDIANTES</h3>

                {/* Mueve el Buscardor aquí, debajo del título */}
                <div className="buscador-section">
                    <Buscardor onSearchChange={handleSearchChange} />
                </div>

                <div className="acciones">
                    <select
                        className="carre-s"
                        value={selectedCarrera}
                        onChange={(e) => setSelectedCarrera(e.target.value)}
                    >
                        <option value="">Seleccionar Carrera</option>
                        {careers.map((career) => (
                            <option key={career.id} value={career.nombre}>
                                {career.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="table-contend">
                    <h3 className="sub-title-page">Estudiantes</h3>
                    <p className="contador">{filteredStudents.length} resultados</p>
                    {filteredStudents.length === 0 ? (
                        <p className="empty-message">No se encontraron estudiantes.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Apellido</th>
                                    <th>Nombre</th>
                                    <th>DNI</th>
                                    <th>Carrera</th>
                                    <th>Detalles</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student, index) => (
                                    <tr key={index} onClick={() => setSelectedStudent(student)}>
                                        <td>{index + 1}</td>
                                        <td>{student.apellidos}</td>
                                        <td>{student.nombres}</td>
                                        <td>{student.dni}</td>
                                        <td>{student.carrera ? student.carrera.nombre : '---'}</td>
                                        <td>
                                            <button onClick={() => fetchStudentCourses(student.id)}>Ver Cursos</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
            <NavBottom />
        </div>
    );
};

export default Estudiantes;
