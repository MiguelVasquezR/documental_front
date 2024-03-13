import { React, useEffect } from 'react';
import { useState } from 'react';

import Header from '../../component/Header/Header';

import FormDatos from '../../component/FormData/FormData';
import FormGenero from '../../component/FormGenero/FormGenero';
import SelectPhoto from '../../component/SelectPhoto/SelectPhoto';
import FormUbicacion from '../../component/FormUbicacion/FormUbicacion';

const AgregarPelicula = () => {
    const handleSave = () => {
        alert('Guardado');
    }

    return (
        <>
            <Header />
            <h2 className='m-4 text-xl font-bold text-centers'>Agregar Película</h2>
            <body className='flex flex-col justify-center items-center gap-5'>
                <SelectPhoto />
                <FormDatos />
                <FormGenero />                
                <FormUbicacion />                            
                <button className='bg-primary px-5 py-3 rounded-md text-secondary-a m-3' onClick={handleSave}>Guardar</button>
            </body>
        </>
    )
}

export default AgregarPelicula;