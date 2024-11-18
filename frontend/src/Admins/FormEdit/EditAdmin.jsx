import React from 'react'

const EditAdmin = ({admin} ) => {
    return (
        <div className='edit-adm'>
            <div className="container">
                <h3 className="title-page">EDITAR DATOS DE ADMIN</h3>
                <form>
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
                        <button type="button" onClick={close} className='btn-cancel'><AiOutlineClose />CANCELAR</button>
                        <button type="submit" className="submit-button"><IoCheckmarkDoneSharp />Registrar</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditAdmin