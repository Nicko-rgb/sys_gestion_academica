import React, { useState, useEffect } from 'react';

const Form = ({ postulante, close }) => {
    const [punto, setPunto] = useState('');
    const [formData, setFormData] = useState({
        id_postulante: postulante.id_postulante,
        puntaje: postulante.resultado ? postulante.resultado.puntaje : '',
        condicion: '',
    });

    // Efecto para establecer la condición basada en el puntaje
    useEffect(() => {
        if (punto !== '') {
            const condicion = punto <= 50 ? 'no ingresó' : 'ingresó';
            setFormData((prevData) => ({ ...prevData, condicion }));
        }
    }, [punto]); // Dependencia en punto

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Actualiza el estado de punto cuando cambia el puntaje
        if (name === 'puntaje') {
            setPunto(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3005/api/register/admision-puntos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Convierte los datos a JSON
            });

            if (!response.ok) {
                throw new Error('Error en la creación del postulante');
            }
            alert('Registro exito de puntaja')
            close();
        } catch (error) {
            console.error('Error al registrar postulante:', error);
        }
    };

    return (
        <div className="form-admiPunto">
            <form onSubmit={handleSubmit}>
                <p className='close' onClick={close}>×</p>
                <h2>REGISTRAR PUNTAJE</h2>
                <div>
                    <label>Nombres
                        <input type="text" value={postulante.nombres} disabled />
                    </label>
                    <label>Apellidos
                        <input type="text" value={postulante.apellidos} disabled />
                    </label>
                </div>
                <label>DNI
                    <input type="text" value={postulante.dni} disabled />
                </label>
                <div className="notas">
                    <label>Puntaje
                        <input 
                            type="text" 
                            value={formData.puntaje}
                            onChange={handleChange}
                            name="puntaje"
                            required
                        />
                    </label>
                    <label>Condición
                        <input type="text"  value={formData.condicion} disabled/>
                    </label>
                </div>
                <div className="btns">
                    <button className='btn-cancel' type="button" onClick={close}>Cancelar</button>
                    <button className='btn-save' type="submit">Guardar</button>
                </div>
            </form>
        </div>
    );
};

export default Form;