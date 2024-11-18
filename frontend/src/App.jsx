import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login Form/Login';
import './Complementos/general.css'
import Panel from './Panel/Panel';
import ListaAdmin from './Admins/ListaAdmin';
import Perfil from './Admins/Perfil/Perfil';

const App = () => {

    // const token = localStorage.getItem('token');

    return (
        <div className='App'>
            <BrowserRouter >
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path='/panel' element={<Panel />} />
                    <Route path="/admins" element={<ListaAdmin />} />
                    <Route path="/:perfil/:name/:id" element={<Perfil />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App