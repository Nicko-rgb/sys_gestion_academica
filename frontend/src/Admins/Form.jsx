import React, { useState } from 'react';
import './form.css';

const Form = ({ close }) => {
    const [formData, setFormData] = useState({
        dni: '',
        nombres: '',
        apellidos: '',
        email: '',
        telefono: '',
        rol: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3005/api/register-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Convierte los datos a JSON
            });

            if (!response.ok) {
                throw new Error('Error en la creación del usuario');
            }

            console.log('Usuario registrado');
            // Aquí puedes manejar lo que sucede después de un registro exitoso
            close(); // Cierra el formulario si es necesario
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
        }
    };

    return (
        <div className="form-admin">
            <div className="form-container">
                <h2>Registro de Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>DNI:</label>
                        <input
                            type="text"
                            id="dni"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Nombres:</label>
                        <input
                            type="text"
                            id="nombres"
                            name="nombres"
                            value={formData.nombres}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label >Apellidos:</label>
                        <input
                            type="text"
                            id="apellidos"
                            name="apellidos"
                            value={formData.apellidos}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Correo:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Teléfono:</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Rol:</label>
                        <select
                            id="rol"
                            name="rol"
                            value={formData.rol}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione un rol</option>
                            <option value="admin">Administrador</option>
                            <option value="usuario">Usuario</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input 
                          type="password" 
                          id="password" 
                          name="password" 
                          value={formData.password} 
                          onChange={handleChange} 
                          required 
                        />
                    </div>
                    <button type="submit" className="submit-button">Registrar</button>
                    <button type="button" onClick={close} className='btn-cancel'>CANCELAR</button>
                </form>
            </div>
        </div>
    );
};

export default Form;