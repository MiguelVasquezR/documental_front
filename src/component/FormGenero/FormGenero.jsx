import React, { useState } from 'react';

import Plus from '../../images/Plus';

const FormGenero = () => {
    const [generos, setGeneros] = useState([]);

    const handleAddGenero = () => {
        setGeneros([...generos, ""]);
    };

    const handleGeneroChange = (index, value) => {
        const updatedGeneros = [...generos];
        updatedGeneros[index] = value;
        setGeneros(updatedGeneros);
    };

    return (
        <fieldset>
            <legend className='font-bold text-xl'>Género</legend>
            {generos.map((genero, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder='Género *'
                    className='w-[100%] bg-transparent border-b-[1px] border-solid border-[#000] p-1 my-2'
                    value={genero}
                    onChange={(e) => handleGeneroChange(index, e.target.value)}
                />
            ))}
            <div className='w-[50px] mx-auto' onClick={handleAddGenero}>
                <Plus color={'black'} w={50} />
            </div>
        </fieldset>
    )
}

export default FormGenero;