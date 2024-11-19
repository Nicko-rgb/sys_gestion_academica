import React, { useState } from 'react'
import './form.css'
import { MdOutlineCloudUpload } from "react-icons/md";

const FormAdmision = ({ close }) => {

    const [loading, setLoading] = useState(false)

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
                body: JSON.stringify(formData), // Convierte los datos a JSON
            });

            if (!response.ok) {
                throw new Error('Error en la creación del postulante');
            }
            console.log('datos:', formData);
            

            close();
        } catch (error) {
            console.error('Error al registrar postulante:', error);
            // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
        }
    };

    
    return (
        <div className='form-admision' onClick={close}>
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} >
                <h2>Formulario de Admisión</h2>
                <p>Complete datos del postulante</p>
                <div className="form-group">
                    <label>Nombres:
                        <input 
                            type="text"
                            value={formData.nombres}
                            onChange={handleChange}
                            name="nombres"
                        />
                    </label>
                    <label>Apellidos:
                        <input 
                            type="text" 
                            value={formData.apellidos}
                            onChange={handleChange}
                            name="apellidos"
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
                        />
                    </label>
                    <label>Fecha de nacimiento:
                        <input 
                            type="date" 
                            value={formData.fecha_nacimiento}
                            onChange={handleChange}
                            name="fecha_nacimiento"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>Correo electrónico:
                        <input 
                            className='email'
                            type="email" 
                            value={formData.correo}
                            onChange={handleChange}
                            name="email"
                        />
                    </label>
                    <label>Telefono:
                        <input 
                            type="tel" 
                            value={formData.telefono}
                            onChange={handleChange}
                            name="telefono"
                        />
                    </label>
                </div>
                <label>Colegio de Origen:
                    <input 
                        type="text" 
                        value={formData.colegio}
                        onChange={handleChange}
                        name="colegio"
                    />
                </label>
                <label>Dirección:
                    <input 
                        type="text"
                        value={formData.direccion}
                        onChange={handleChange}
                        name="direccion"
                    />
                </label>
                <label>Carrera Profesional:
                    <select value={formData.carrera} onChange={handleChange} name='carrera' required >
                        <option value="">Seleccione una carrera</option>
                        <option value="Ingeniería en sistemas">Ingeniería en Sistemas</option>
                        <option value="Ingeniería en computación">Ingeniería en Computación</option>
                    </select>
                </label>
                <div className="btns">
                    <button className='btn-cancel' onClick={close}>Cancelar</button>
                    <button className='btn-submit' type='submit'>
                        <MdOutlineCloudUpload style={{fontSize: '20px'}} />
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormAdmision