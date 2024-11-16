import React from 'react'
import NavPie from '../Navegador/NavPie'
import NavTop from '../Navegador/NavTop'

const Panel = () => {
    return (
        <div className="principal panel">
            <NavTop />
            <main>
                <h5 className='title-page'>Panel de control</h5>
            </main>
            <NavPie />
        </div>
  )
}

export default Panel