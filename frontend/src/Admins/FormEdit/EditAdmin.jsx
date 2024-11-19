import React from 'react'
import '../FormRegistro/form.css'
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";

const EditAdmin = ({admin, close} ) => {
    return (
        <div className='form-admin'>
            <div className="form-container">
                <h2>EDITAR DATOS DE ADMIN</h2>
                <form id='id'>
                    <div className="form-group">
                        <label>Nombre:
                            <input type="text" />
                        </label>
                        <label>Apellidos:
                            <input type="text" />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Correo Electronico:
                            <input type="email" />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Teléfono:
                            <input type="text" />
                        </label>
                        <label>Rol:
                            <select>
                                <option value="admin">Admin</option>
                                <option value="Jefede área">Jefe de área</option>
                            </select>
                        </label>
                    </div>

                    <div className="form-group">
                        <button type="button" onClick={close} className='btn-cancel'><AiOutlineClose />Cancelar</button>
                        <button type="submit" className="btn-save"><IoCheckmarkDoneSharp />Guardar</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditAdmin