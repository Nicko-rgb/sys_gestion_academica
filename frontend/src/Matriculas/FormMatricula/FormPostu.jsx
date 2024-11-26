import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './form.css';
import { MdOutlineCloudUpload } from "react-icons/md";
import PagoPostu from './PagoPostu';

const FormPostulante = ({ close }) => {
    const [carreras, setCarreras] = useState([]);
    const [pagoForm, setPagoForm] = useState(null);

    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        dni: '',
        fecha_nacimiento: '',
        email: '',
        telefono: '',
        colegio: '',
        direccion: '',
        carrera: ''
    });

    // Obtener las carreras desde la API
    const fetchCarreras = async () => {
        try {
            const response = await axios.get('http://localhost:3005/api/carreras-all');
            setCarreras(response.data);
        } catch (error) {
            console.error('Error al obtener las carreras:', error);
            setCarreras([]); // Manejar en caso de error
        }
    };

    useEffect(() => {
        fetchCarreras();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3005/api/register-postulante', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error en la creación del postulante');
            }

            const data = await response.json(); // Recibe la respuesta del servidor
            // close()
            alert('Postulante Registrado Exitosamente.');
            setPagoForm({ id: data.postulante.id, dni: data.postulante.dni, nombres: data.postulante.nombres, apellidos: data.postulante.apellidos });
        } catch (error) {
            console.error('Error al registrar postulante:', error);
        }
    };

    return (
        <div className="form-admision">
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                <h2>Formulario de Postulante</h2>
                <p>Complete datos del postulante</p>
                <div className="form-group">
                    <label>Nombres:
                        <input
                            type="text"
                            value={formData.nombres}
                            onChange={handleChange}
                            name="nombres"
                            required
                        />
                    </label>
                    <label>Apellidos:
                        <input
                            type="text"
                            value={formData.apellidos}
                            onChange={handleChange}
                            name="apellidos"
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>DNI:
                        <input
                            type="text"
                            value={formData.dni}
                            onChange={handleChange}
                            name="dni"
                            required
                        />
                    </label>
                    <label>Fecha de nacimiento:
                        <input
                            type="date"
                            value={formData.fecha_nacimiento}
                            onChange={handleChange}
                            name="fecha_nacimiento"
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>Correo electrónico:
                        <input
                            className="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            required
                        />
                    </label>
                    <label>Teléfono:
                        <input
                            type="tel"
                            value={formData.telefono}
                            onChange={handleChange}
                            name="telefono"
                            required
                        />
                    </label>
                </div>
                <label>Colegio de Origen:
                    <input
                        type="text"
                        value={formData.colegio}
                        onChange={handleChange}
                        name="colegio"
                        required
                    />
                </label>
                <label>Dirección:
                    <input
                        type="text"
                        value={formData.direccion}
                        onChange={handleChange}
                        name="direccion"
                        required
                    />
                </label>
                <label>Carrera Profesional:
                    <select
                        value={formData.carrera}
                        onChange={handleChange}
                        name="carrera"
                        required
                    >
                        <option value="">Seleccione una carrera</option>
                        {carreras.map((carrera, index) => (
                            <option key={index} value={carrera.nombre}>{carrera.nombre}</option>
                        ))}
                    </select>
                </label>
                <div className="btns">
                    <button className="btn-cancel" type="button" onClick={close}>Cancelar</button>
                    <button className="btn-submit" type="submit">
                        <MdOutlineCloudUpload style={{ fontSize: '20px' }} />
                        Registrar
                    </button>
                </div>
            </form>
            {pagoForm && (
                <PagoPostu postulante={pagoForm} close= {close} />
            )}
        </div>
    );
};

export default FormPostulante;
