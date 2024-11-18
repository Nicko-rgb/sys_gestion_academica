import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const EstadoSesion = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setIdUser] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('')
    const [correo, setCorreo] = useState('');
    const [dni, setDni] = useState('');
    const [telefono, setTelefono] = useState('');
    const [rol, setRol] = useState('');
    const [estado, setEstado] = useState('');

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setIsLoggedIn(true);
            setIdUser(userData.id || '');
            setNombre(userData.nombres || '');
            setApellido(userData.apellidos || '');
            setCorreo(userData.correo || '');
            setDni(userData.dni || '');
            setTelefono(userData.telefono || '');
            setRol(userData.rol || '');
            setEstado(userData.estado || '');
        }
    }, []);
    

    // Función para manejar el inicio de sesión y guardar los datos en localStorage
    const handleLogin = (id, nombres, apellidos, correo, dni, telefono, rol, estado, usuario) => {
        setIsLoggedIn(true); 
        setIdUser(id);
        setNombre(nombres);
        setApellido(apellidos);
        setCorreo(correo);
        setDni(dni);
        setTelefono(telefono);
        setRol(rol);
        setEstado(estado);

        // Guardamos todos los datos en localStorage como un solo objeto
        const userData = {
            id,
            nombres,
            apellidos,
            correo,
            dni,
            telefono,
            rol,
            estado,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    // Función para cerrar sesión y limpiar todos los datos del localStorage
    const handleLogout = () => {
        setIsLoggedIn(false);
        setIdUser('');
        setNombre('');
        setApellido('');
        setCorreo('');
        setDni('');
        setTelefono('');
        setRol('');
        setEstado('');
        
        // Eliminamos todos los datos del localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        navigate('/');
    };

    // Generamos la ruta al perfil del usuario
    const minusculaName = nombre.toLowerCase().replace(/\s+/g, '');
    const rutaPerfil = `/perfil/${minusculaName}/${userId}`;

    // Retornamos los datos y funciones para utilizarlos en otros componentes
    return { userId, nombre, apellido, correo, isLoggedIn, handleLogin, handleLogout, rutaPerfil, dni, telefono, rol, estado};
};

export default EstadoSesion; 