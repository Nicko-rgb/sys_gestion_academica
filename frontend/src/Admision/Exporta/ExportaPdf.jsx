import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import './export.css';
import NavTop from '../../Navegador/NavTop';
import NavBottom from '../../Navegador/NavPie';
import OpcionesI from '../Opciones/OpcionesI';
import { useLocation } from 'react-router-dom';

const ExportaPdf = () => {
  const [postulantes, setPostulantes] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const carreraFromRoute = location.state?.carrera;

  const anio = new Date().getFullYear();

  // Obtener postulantes desde la API de admisión
  const fetchPostulantes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3005/api/obtener-postulantes');
      // Filtrar postulantes basado en la carrera de la ruta
      const filteredPostulantes = carreraFromRoute 
        ? response.data.filter(postulante => postulante.carrera_postulada === carreraFromRoute.nombre)
        : response.data;
      
      setPostulantes(filteredPostulantes);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener postulantes:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostulantes();
  }, [carreraFromRoute]);

  // Generar archivo Excel
  const generateExcel = () => {
    // Preparar datos para Excel
    const data = [
      ["N°", "Apellidos", "Nombres", "DNI", "Teléfono", "Correo", "Carrera Profesional", "Puntaje", "Condición"],  // Encabezado
      ...postulantes.map((postulante, index) => [
        index + 1,
        postulante.apellidos,
        postulante.nombres,
        postulante.dni,
        postulante.telefono,
        postulante.email,
        postulante.carrera_postulada,
        postulante.resultado ? postulante.resultado.puntaje : '---',
        postulante.resultado ? postulante.resultado.condicion : '---'
      ]),
    ];
  
    // Crear libro de trabajo
    const wb = XLSX.utils.book_new();
  
    // Crear hoja de cálculo
    const ws = XLSX.utils.aoa_to_sheet(data);
  
    // Estilo para encabezados (verde esmeralda con texto blanco)
    const headerStyle = {
      fill: { fgColor: { rgb: "50C878" } },
      font: { color: { rgb: "FFFFFF" }, bold: true }
    };
  
    // Ajustar ancho de columnas
    ws['!cols'] = [
      { wch: 5 },   // N°
      { wch: 20 },  // Apellidos
      { wch: 20 },  // Nombres
      { wch: 15 },  // DNI
      { wch: 15 },  // Teléfono
      { wch: 25 },  // Correo
      { wch: 25 },  // Carrera Profesional
      { wch: 10 },  // Puntaje
      { wch: 15 }   // Condición
    ];
  
    // Aplicar estilo a la primera fila (encabezados)
    for (let i = 0; i < data[0].length; i++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: i });
      if (ws[cellRef]) ws[cellRef].s = headerStyle;
    }
  
    // Agregar hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Resultados');
  
    // Guardar archivo Excel con nombre de carrera
    XLSX.writeFile(wb, `resultados_admision_${carreraFromRoute ? carreraFromRoute.nombre + '_' : ''}${anio}.xlsx`);
  };
  return (
    <div className="principal subir-admision">
      <NavTop />
      <OpcionesI />
      <main>
        <h2 className="title-page">
          EXPORTAR RESULTADOS DE EXAMEN DE ADMISIÓN - {carreraFromRoute ? carreraFromRoute.nombre : 'TODAS LAS CARRERAS'} - {anio}
        </h2>

        <div>
          <p className="contador">{postulantes.length} postulantes</p>
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
              ) : postulantes.length === 0 ? (
                <tr>
                  <td colSpan={9}>No hay resultados</td>
                </tr>
              ) : (
                postulantes.map((postulante, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{postulante.apellidos}</td>
                    <td>{postulante.nombres}</td>
                    <td>{postulante.dni}</td>
                    <td>{postulante.telefono}</td>
                    <td>{postulante.email}</td>
                    <td>{postulante.carrera_postulada}</td>
                    <td>{postulante.resultado ? postulante.resultado.puntaje : '---'}</td>
                    <td>{postulante.resultado ? postulante.resultado.condicion : '---'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Botón para generar el archivo Excel */}
          <button onClick={generateExcel} disabled={postulantes.length === 0}>
            Generar Excel
          </button>
        </div>
      </main>
      <NavBottom />
    </div>
  );
};

export default ExportaPdf;