import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import suiza from '../img/suiza.png';
import minedu from '../img/minedu.png';

const Login = () => {
    const navigate = useNavigate();
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    //removemos el token al montar este componente localStorage
    useEffect(() => {
        localStorage.removeItem('token');
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3005/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dni, password }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
    
            const data = await response.json(); // Captura el token y los datos del usuario
    
            // Guarda el token y los datos del usuario en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));
    
            navigate('/panel'); // Navega al panel
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setMessage(error.message);
        }
    };
    

    return (
        <div className='login'>
            <section className='infor'>
                <div>
                    <h3 className='title-page'>INSTITUTO DE EDUCACIÓN SUPERIOR TECNOLOGICO PÚBLICO SUIZA</h3>
                    <p className='sub-title-page'>SISTEMA DE GESTIÓN ACADÉMICA - 2024</p>
                </div>
                <img className='suiza' src={suiza} alt="" />
                <img className='minsa' src={minedu} alt="" />
            </section>
            <section className='form-contend'>
                <form onSubmit={handleSubmit}>
                    <h2>Iniciar Sesión</h2>
                    <label>DNI:
                        <input 
                            type='text' 
                            placeholder='Ingrese su DNI' 
                            value={dni} 
                            onChange={(e) => setDni(e.target.value)} 
                            required 
                        />
                    </label>
                    <label>Contraseña:
                        <input 
                            type='password' 
                            placeholder='Ingrese su Contraseña' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </label>
                    {message && <p className='msg-error'>{message}</p>} {/* Mostrar mensaje de error */}
                    <a href="/reset-password">Olvidó su contraseña?</a>
                    <button type="submit" className='btn-submit'>INGRESAR</button>
                </form>
            </section>
        </div>
    );
};

export default Login;