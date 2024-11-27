import React, { useEffect, useState } from 'react';
import './Estudiantes.css';
import axios from 'axios';
import NavTop from '../Navegador/NavTop';
import NavBottom from '../Navegador/NavPie';
import Buscardor from '../Complementos/Buscardor';
import Volver from '../Navegador/Volver';

const Estudiantes = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]); // Asignaturas del estudiante seleccionado
    const [careers, setCareers] = useState([]);
    const [selectedCarrera, setSelectedCarrera] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [error, setError] = useState('');

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
            const response = await axios.get('http://localhost:3005/api/carreras-all');
            setCareers(response.data || []);
        } catch (error) {
            console.error('Error al obtener carreras:', error);
        }
    };

    // Obtener cursos del estudiante seleccionado
    const fetchStudentCourses = async (studentId) => {
        try {
            const response = await axios.get(`http://localhost:3005/api/asignaturas`); // URL del endpoint de asignaturas
            setCourses(response.data || []);
            setError('');
        } catch (error) {
            console.error('Error al obtener los cursos:', error);
            setError('No se pudieron cargar los cursos.');
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

    // Filtrar estudiantes
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
                {!selectedStudent ? (
                    <>
                        <h3 className="title-page">LISTA DE ESTUDIANTES</h3>
                        <div className="acciones">
                            <Buscardor onSearchChange={handleSearchChange} />
                            <select
                                className="carre-s"
                                value={selectedCarrera}
                                onChange={(e) => setSelectedCarrera(e.target.value)}
                            >
                                <option value="">Todas las carreras</option>
                                {careers.map((career) => (
                                    <option key={career.id} value={career.nombre}>
                                        {career.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="table-contend">
                            <h3 className="sub-title-page">Estudiantes</h3>
                            <p className="contador">{filteredStudents.length} de {students.length}</p>
                            {filteredStudents.length === 0 ? (
                                <p className="empty-message">No se encontraron estudiantes.</p>
                            ) : (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>N°</th>
                                            <th>Apellidos y Nombres</th>
                                            <th>DNI</th>
                                            <th>Carrera</th>
                                            <th>Detalles</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredStudents.map((student, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{student.apellidos}, {student.nombres}</td>
                                                <td>{student.dni}</td>
                                                <td>{student.carrera ? student.carrera.nombre : '---'}</td>
                                                <td>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedStudent(student);
                                                            fetchStudentCourses(student.id);
                                                        }}
                                                    >
                                                        Ver Cursos
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </>
                ) : (
                    // Muestra los detalles del estudiante y los cursos disponibles
                    <div className="datos">
                        <Volver onClick={() => setSelectedStudent(null)} /> {/* Botón Volver */}
                        <form className="form-view">
                            <label>DNI
                                <input type="text" value={selectedStudent.dni} disabled />
                            </label>
                            <label>APELLIDOS Y NOMBRES
                                <input type="text" value={`${selectedStudent.apellidos} ${selectedStudent.nombres}`} disabled />
                            </label>
                            <label>CORREO
                                <input type="text" value={selectedStudent.email || '---'} disabled />
                            </label>
                        </form>
                        <div className="sub-title-page">Asignaturas Disponibles</div>
                        <div className="boxs">
                            {error ? (
                                <p className="error-message">{error}</p>
                            ) : courses.length === 0 ? (
                                <p className="no-courses-message">No hay cursos disponibles.</p>
                            ) : (
                                courses.map((curso, index) => (
                                    <div className="box" key={curso.id || index}>
                                        <p>{curso.nombre}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </main>

            <NavBottom />
        </div>
    );
};

export default Estudiantes;
