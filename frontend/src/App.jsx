import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './Login Form/Login';
import './Complementos/general.css'
import Panel from './Panel/Panel';
import ListaAdmin from './Admins/ListaAdmin';
import Perfil from './Admins/Perfil/Perfil';
import Admision from './Admision/Admision';
import Matricula from './Matriculas/Matricula';
import SubirAdmision from './Admision/SubirAdmision/SubirAdmision';
import ExportaPdf from './Admision/Exporta/ExportaPdf';

const App = () => {

    // useEffect(() => {
    //     const elemenidVerificado = document.getElementById('id');
    //     const txt = elemenidVerificado.innerText;
    //     const txtValor = '© Copyrigth Derechos Reservados-2024 by Nixon'

    //     // Verificamos si el elemento y texto existen
    //     if (!elemenidVerificado || txt !== txtValor) {
    //         throw new Error('Elemento no encontrado'); 
    //     } 
    // }, []);

    // const token = localStorage.getItem('token');

    return (
        <div className='App'>
            <BrowserRouter >
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path='/panel' element={<Panel />} />
                    <Route path="/admins" element={<ListaAdmin />} />
                    <Route path="/admision" element={<Admision />} />
                    <Route path="/:perfil/:name/:id" element={<Perfil />} />
                    <Route path="/matricula" element={<Matricula />} />
                    <Route path="/admision-upload/:carrera" element={<SubirAdmision />} />
                    <Route path="/admision-export/:carrera" element={<ExportaPdf />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App