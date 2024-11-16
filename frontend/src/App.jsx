import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login Form/Login';
import './Complementos/general.css'
import Panel from './Panel/Panel';
import ListaAdmin from './Admins/ListaAdmin';

const App = () => {
    return (
        <div className='App'>
            <BrowserRouter >
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/panel" element={<Panel />} />
                    <Route path="/admins" element={<ListaAdmin />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App