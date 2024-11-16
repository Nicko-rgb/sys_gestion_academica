import React from 'react'
import '../Complementos/general.css'
import NavTop from '../Navegador/NavTop'
import NavPie from '../Navegador/NavPie'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const irPanel = () => {
        navigate('/panel')
    }
    return (
        <div className='login'>
            <NavTop />
            <h1>Login</h1>
            <form>
                <label>Username:</label>
                <input type='text' />
                <br/>
                <label>Password:</label>
                <input type='password'/>
                <br/>
                <button className='submit' onClick={irPanel} >Login</button>
            </form>
            <NavPie />
        </div>
    )
}

export default Login