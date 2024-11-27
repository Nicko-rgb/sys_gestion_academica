import React, { useState } from 'react';
import './form.css';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";

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
            alert('REGISTRO EXITOSO')
            close();
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
        }
    };

    const handleChangeDni = (dni) => {
        const inputValue = dni.target.value;
        // Expresión regular para permitir solo números
        if (/^\d*$/.test(inputValue)) {
            setFormData({ ...formData, dni: inputValue });
        }
    };

    return (
        <div className="form-admin">
            <div className="form-container">
                <h2>Registro de Personal administrativo</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>DNI:
                            <input 
                                type="text" 
                                name="dni"
                                value={formData.dni}
                                onChange={handleChangeDni}
                                maxLength={"8"}
                                pattern='\d{8}'
                                required
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Nombres:
                            <input
                                type="text"
                                name="nombres"
                                value={formData.nombres}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label >Apellidos:
                            <input
                                type="text"
                                name="apellidos"
                                value={formData.apellidos}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Correo:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Teléfono:
                            <input
                                type="tel"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>Rol:
                            <select
                                name="rol"
                                value={formData.rol}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione un rol</option>
                                <option value="admin">Administrador</option>
                                <option value="Jefe de área">Jefe de área</option>
                                <option value="Secretaria">Secretaria</option>
                                <option value="Docente">Docente</option>
                            </select>
                        </label>
                    </div>
                    <div className="form-group" id='pass'>
                        <label>Usuario (DNI):
                            <input
                                type="text"
                                name="dni"
                                value={formData.dni}
                                readOnly
                            />
                        </label>
                        <label>Contraseña:
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Una contrseña para ingresar'
                                required
                            />
                        </label>
                        <p className="field">Credenciales de acceso</p>
                    </div>
                    <div className="form-group">
                        <button type="button" onClick={close} className='btn-cancel'><AiOutlineClose />CANCELAR</button>
                        <button type="submit" className="submit-button"><IoCheckmarkDoneSharp />Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;