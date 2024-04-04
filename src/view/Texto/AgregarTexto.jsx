import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from '../../component/Header/Header';
import SelectPhoto from '../../component/SelectPhoto/SelectPhoto';
import FormUbicacion from '../../component/FormUbicacion/FormUbicacion';
import CargandoLibro from '../../component/Loaders/CargandoLibro/Cargando';




const AgregarTexto = () => {
    const stylesInputs = "border-b-[1px] w-[90%] p-1";
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [bloqueado, setBloqueado] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const [dataImage, setDataImage] = useState();
    const [location, setLocation] = useState({});

    const handleSave = async (data) => {

        await setDataImage(window.localStorage.getItem('portada'));
        
        if (!dataImage || dataImage === undefined) {
            console.log('No se ha ejecutado el handleSave');
            return;
        }

        setIsLoading(true);

        try {

            const imageData = {
                LinkFoto: dataImage
            };

            const { data: { ID: IDFoto } } = await axios.post(`http://${import.meta.env.VITE_IP}/foto/crear`, imageData);

            const dataAutor = {
                Nombre: data.Nombre,
                Paterno: data.Paterno,
                Materno: data.Materno
            };
            const { data: { IDAutor } } = await axios.post(`http://${import.meta.env.VITE_IP}/autor/crear`, dataAutor);

            const dataLibro = {
                Codigo: data.Codigo,
                Disponibilidad: "Disponible",
                Titulo: data.Titulo,
                NumPaginas: data.NumPaginas,
                Tipo: data.Tipo,
                Ano: data.Ano,
                Resena: data.Resena,
                IDAutor,
                LinkFoto: IDFoto,
                Ubicacion: location
            };
            const { data: { mensaje } } = await axios.post(`http://${import.meta.env.VITE_IP}/texto/crear`, dataLibro);

            if (mensaje === "Texto creado") {
                navigate('/texto');
            } else {
                console.log('No se ha creado el libro');
            }
        } catch (error) {
            console.error('Error al ejecutar handleSave:', error);
        }

        window.localStorage.removeItem('portada');
    };

    const handleLocation = (repisa, fila, columna) => {
        if (repisa && fila && columna) {
            setLocation({ repisa, fila, columna });
        }
    }

    const handleContadorCaracteres = (e, max) => {
        if (e.target.value.length > max) { e.target.value = e.target.value.slice(0, max); }
    }


    return (
        <>
            <Header />
            <SelectPhoto />

            <form onSubmit={handleSubmit(handleSave)} className='w-[90%] mx-auto flex flex-col justify-center items-center gap-4'>


                <fieldset className='flex flex-col justify-center items-center gap-4 w-[90%]'>
                    <legend className='p-3 text-lg font-bold'>Información del Libro</legend>
                    <input {...register("Codigo", { required: true })} type="text" placeholder='Código' className={`${stylesInputs}`} />
                    <input {...register("Titulo", { required: true })} type="text" placeholder='Titulo' className={`${stylesInputs}`} />
                    <input {...register("NumPaginas", { required: true })} type="number" placeholder='Número de Páginas' className={`${stylesInputs}`} onInput={(e) => { handleContadorCaracteres(e, 6) }} />
                    <input {...register("Tipo", { required: true })} type="text" placeholder='Tipo' className={`${stylesInputs}`} />
                    <input {...register("Ano", { required: true})} onInput={(e) => { handleContadorCaracteres(e, 4) }} type="number" placeholder='Año' className={`${stylesInputs}`} />
                </fieldset>

                <fieldset className=' flex flex-col justify-center items-center gap-4 w-[90%]'>
                    <legend className='p-3 text-lg font-bold'>Información del Autor</legend>
                    <input {...register("Nombre", { required: true })} type="text" placeholder='Nombre' className={`${stylesInputs}`} />
                    <input {...register("Paterno", { required: true })} type="text" placeholder='Paterno' className={`${stylesInputs}`} />
                    <input {...register("Materno", { required: false })} type="text" placeholder='Materno' className={`${stylesInputs}`} />
                </fieldset>

                <fieldset className=' flex flex-col justify-center items-center gap-4 w-[90%]'>
                    <legend className='p-3 text-lg font-bold'>Reseña</legend>
                    <textarea {...register("Resena", { required: true })} placeholder='Escribe tu Reseña'
                        className='border-[1px] border-solid border-[#000] w-[90%] p-1 h-[200px] max-h-[500px]'></textarea>
                </fieldset>

                <FormUbicacion handleGetLocation={handleLocation} />

                <button className='bg-primary px-5 py-3 rounded-md text-secondary-a m-3' type='submit'>Guardar</button>

                {
                    isLoading ? <CargandoLibro /> : ""
                }

            </form>

        </>
    )
}

export default AgregarTexto;