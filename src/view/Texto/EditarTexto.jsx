import React from 'react';

import Header from '../../component/Header/Header';
import FormUbicacion from '../../component/FormUbicacion/FormUbicacion';

const EditarTexto = () => {

    const stylesInputs = "border-b-[1px] w-[90%] p-1";

    const handleSave = () => {
        alert('Guardado');
    }

    return (
        <>
            <Header />

            <h2 className='text-2xl text-center font-bold m-2'>Editar Libro</h2>

            <form className='w-[90%] mx-auto flex flex-col justify-center items-center gap-4'>                

                <fieldset className='flex flex-col justify-center items-center gap-4 w-[90%]'>
                    <legend className='p-3 text-lg font-bold'>Información del Libro</legend>
                    <input type="text" placeholder='Código' className={`${stylesInputs}`} />
                    <input type="text" placeholder='Titulo' className={`${stylesInputs}`} />
                    <input type="text" placeholder='Número de Páginas' className={`${stylesInputs}`} />
                    <input type="text" placeholder='Tipo' className={`${stylesInputs}`} />
                    <input type="text" placeholder='Año' className={`${stylesInputs}`} />
                </fieldset>

                <fieldset className=' flex flex-col justify-center items-center gap-4 w-[90%]'>
                    <legend className='p-3 text-lg font-bold'>Información del Autor</legend>
                    <input type="text" placeholder='Nombre' className={`${stylesInputs}`} />
                    <input type="text" placeholder='Paterno' className={`${stylesInputs}`} />
                    <input type="text" placeholder='Materno' className={`${stylesInputs}`} />
                </fieldset>

                <fieldset className=' flex flex-col justify-center items-center gap-4 w-[90%]'>
                    <legend className='p-3 text-lg font-bold'>Reseña</legend>
                    <textarea placeholder='Escribe tu Reseña'
                        className='border-[1px] border-solid border-[#000] w-[90%] p-1 h-[200px] max-h-[500px]'></textarea>
                </fieldset>

                <FormUbicacion />

                <button className='bg-primary px-5 py-3 rounded-md text-secondary-a m-3' onClick={handleSave}>Guardar</button>

            </form>



        </>
    )
}

export default EditarTexto;