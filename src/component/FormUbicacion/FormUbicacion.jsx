import React, { useEffect, useState } from 'react';
import Ubicacion from '../Ubicacion/Ubicacion';

const FormUbicacion = ({ handleGetLocation }) => {
    const [repisa, setRepisa] = useState('');
    const [fila, setFila] = useState('');
    const [columna, setColumna] = useState('');

    useEffect(() => {
        handleGetLocation(repisa, fila, columna);
    }, [fila])

    const handleContadorCaracteres = (e) => {
        const max = 1;
        if (e.target.value.length > max) { e.target.value = e.target.value.slice(0, max); }
    }

    return (
        <section>

            <legend>Ubicación</legend>
            <select value={repisa} onChange={(e) => setRepisa(e.target.value)} className='w-[100%] bg-transparent border-b-[1px] border-solid border-[#000] p-1 my-2'>
                <option value="">Seleccione una repisa</option>
                <option value="1">Repisa 1</option>
                <option value="2">Repisa 2</option>
            </select>
            <input
                value={columna}
                onChange={(e) => setColumna(e.target.value)}
                className='w-[100%] bg-transparent border-b-[1px] border-solid border-[#000] p-1 my-2'
                type="number"
                onInput={handleContadorCaracteres}
                placeholder='Columna *'
            />
            <input
                value={fila}
                onChange={(e) => setFila(e.target.value)}
                className='w-[100%] bg-transparent border-b-[1px] border-solid border-[#000] p-1 my-2'
                type="numer"
                onInput={handleContadorCaracteres}
                placeholder='Fila *'
            />

            {repisa === '1' ? <Ubicacion col={columna} row={fila} size={4} /> : <Ubicacion col={columna} row={fila} size={6} />}
        </section>
    );
};

export default FormUbicacion;
