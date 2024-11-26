import React, { useState, useEffect } from 'react';

const Form = ({ postulante, close }) => {
    const [formData, setFormData] = useState({
        id_postulante: postulante.id_postulante,
        puntaje: postulante.resultado ? postulante.resultado.puntaje : '',
        condicion: postulante.resultado ? postulante.resultado.condicion : '',
    });

    useEffect(() => {
        if (formData.puntaje !== '') {
            const numericPuntaje = parseFloat(formData.puntaje);
            const condicion = numericPuntaje <= 50 ? 'no ingresó' : 'ingresó';
            setFormData((prevData) => ({ ...prevData, condicion }));
        }
    }, [formData.puntaje]);

    const handleChange = (e) => {
        let { name, value } = e.target;

        // Validar que solo se permitan números y formato decimal
        if (name === 'puntaje') {
            // Reemplazar caracteres no numéricos o formato inválido
            value = value.replace(/[^0-9.]/g, '');

            // Asegurarse de que no haya más de un punto decimal
            if ((value.match(/\./g) || []).length > 1) {
                return;
            }

            // Limitar a un máximo de 5 caracteres (100.00 máximo)
            if (value.length > 5) {
                return;
            }

            // Validar que el valor no exceda 100
            const numericValue = parseFloat(value);
            if (!isNaN(numericValue) && numericValue > 100) {
                return;
            }

            // Garantizar siempre dos decimales al formatear
            const formattedValue = value.includes('.')
                ? value.split('.')[1].length > 2
                    ? parseFloat(value).toFixed(2)
                    : value
                : value;

            setFormData({ ...formData, [name]: formattedValue });
        } else {
            setFormData({ ...formData, [name]: value });
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
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error en la creación del postulante');
            }
            alert('Registro exitoso del puntaje');
            close();
        } catch (error) {
            console.error('Error al registrar postulante:', error);
        }
    };

    return (
        <div className="form-admiPunto">
            <form onSubmit={handleSubmit}>
                <p className="close" onClick={close}>×</p>
                <h2>{postulante.resultado ? 'EDITAR' : 'REGISTRAR'} PUNTAJE</h2>
                <div className="form-group">
                    <label>
                        Apellidos
                        <input type="text" value={postulante.apellidos} disabled />
                    </label>
                    <label>
                        Nombres
                        <input type="text" value={postulante.nombres} disabled />
                    </label>
                </div>
                <label>
                    DNI
                    <input type="text" value={postulante.dni} disabled />
                </label>
                <div className="form-group">
                    <label>
                        Puntaje
                        <input
                            className="punto"
                            type="text"
                            value={formData.puntaje}
                            onChange={handleChange}
                            name="puntaje"
                            required
                        />
                    </label>
                    <label>
                        Condición
                        <input
                            type="text"
                            className={`condi ${formData.condicion === 'no ingresó' ? 'no-ingre' : 'ingre'}`}
                            value={formData.condicion}
                            disabled
                        />
                    </label>
                </div>
                <div className="btns">
                    <button className="btn-cancel" type="button" onClick={close}>
                        Cancelar
                    </button>
                    <button className="btn-save" type="submit">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
