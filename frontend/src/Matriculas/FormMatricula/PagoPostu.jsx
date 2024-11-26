import React, { useState } from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineCloudUpload } from "react-icons/md";
import axios from 'axios';

const PagoPostu = ({ postulante, close }) => {
    const [monto, setMonto] = useState('');

    const handlePago = async (e) => {
        e.preventDefault();

        if (!monto || isNaN(monto)) {
            alert('Por favor, ingrese un monto válido.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3005/api/register-pago/postulante', {
                id_postulante: postulante.id,
                monto: parseFloat(monto),
            });
        
            alert(response.data.message); // Muestra el mensaje enviado desde el backend
            window.location.reload();
        } catch (error) {
            console.error('Error al registrar el pago:', error?.response || error);
            alert(error?.response?.data?.message || 'Error al registrar el pago.');
        }
    };

    const deletePostulante = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este postulante?');
        if (!confirmDelete) return;
    
        try {
            const response = await axios.delete(`http://localhost:3005/api/delete-postulante/${id}`);
            alert(response.data.message); // Muestra el mensaje enviado desde el backend
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar el postulante:', error?.response || error);
            alert(error?.response?.data?.message || 'Error al intentar eliminar el postulante.');
        }
        
    };

    return (
        <div className="form-admision">
            <form onSubmit={handlePago}>
                <h2>Detalle de Pago de Postulante</h2>
                <div className="form-group">
                    <label>Apellidos:
                        <input 
                            type="text" 
                            value={postulante.apellidos || ''} 
                            readOnly 
                            disabled
                        />
                    </label>
                    <label>Nombres:
                        <input 
                            type="text" 
                            value={postulante.nombres || ''} 
                            readOnly
                            disabled
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>DNI:
                        <input 
                            type="text" 
                            value={postulante.dni || ''} 
                            readOnly 
                            disabled
                        />
                    </label>
                    <label>MONTO:
                        <input 
                            type="text" 
                            placeholder="Ingrese el monto"
                            value={monto}
                            onChange={(e) => setMonto(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="btns">
                    <button type="button" className="btn-delete" onClick={() => deletePostulante(postulante.id)}>
                        <RiDeleteBinLine /> Anular
                    </button>
                    <button type="submit" className="btn-save">
                        <MdOutlineCloudUpload /> Guardar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PagoPostu;
