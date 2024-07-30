import React, { useEffect, useState, useRef } from 'react';
import { set, useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from '../../component/Header/Header';
import FormUbicacion from '../../component/FormUbicacion/FormUbicacion';
import CargandoLibro from '../../component/Loaders/CargandoLibro/Cargando';

import appFirebase from '../../hooks/AppFirebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
const storage = getStorage(appFirebase);

import BotonCargando from '../../component/Loaders/BotonCargando/BotonCargando';



import { handleUploadImage, PORTADAS_LIBROS } from '../../FirebaseService/StorageService';
import { addText } from '../../FirebaseService/TextService';
import { IsLogin } from '../../FirebaseService/AuthService';


const AgregarTexto = () => {


    const stylesInputs = "border-b-[1px] w-[90%] p-1 outline-none";
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [dataImage, setDataImage] = useState();
    const [location, setLocation] = useState({});
    const [codeRepeat, setCodeRepeat] = useState(false);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("Cargando...");
    const fileInputRef = useRef(null);

    const [btnBloqueado, setBtnBloqueado] = useState(false);

    useEffect(() => {
        IsLogin().then((res) => {
            if (!res) { 
                navigate('/login');
            }
        }
        );
    })




    const handleLocation = (repisa, fila, columna) => {
        if (repisa && fila && columna && repisa !== '') {
            setLocation({ repisa, fila, columna });
        } else {
            setLoading(null)
        }
    }

    const handleContadorCaracteres = (e, max) => {
        if (e.target.value.length > max) { e.target.value = e.target.value.slice(0, max); }
    }

    const validatedData = async (data) => {
        const dataSend = {
            Codigo: data.Codigo,
            Titulo: data.Titulo,
            NumPaginas: data.NumPaginas,
            Tipo: data.Tipo,
            Ano: data.Ano,
            Resena: data.Resena,
            Ubicacion: location,
            Portada: dataImage,
            AUTOR: {
                NOMBRE: data?.Nombre,
                PATERNO: data?.Paterno,
                MATERNO: data?.Materno,
            }
        }

        const res = await addText(dataSend);
        if (res) {
            navigate('/texto');
        } else {
            alert('Error al guardar el texto');
        }
    }




    return (
        <>
            <Header />

            <div className='w-[90%] mx-auto my-4 flex flex-col justify-center items-center gap-5'>
                {dataImage ? <img className='w-[200px] h-[250px] rounded-sm' src={dataImage} /> : <div className='bg-[#f2f2f2] w-[100px] h-[150px] rounded-sm border-solid border-[1px] border-[#000]'></div>}
                <input name="image" type="file" onChange={async (e) => { setLoading(true); setDataImage(await handleUploadImage(e, PORTADAS_LIBROS)); setText("Cargado") }} style={{ display: 'none' }} ref={fileInputRef} />
                <div className='flex flex-col items-center justify-center gap-3'>
                    {
                        loading ? <BotonCargando text={text} /> : <button className='bg-primary text-secondary-a p-2 rounded-md w-[180px]' onClick={(e) => { e.preventDefault(); fileInputRef.current.click() }}>Seleccionar Portada</button>
                    }
                </div>
            </div>

            <form onSubmit={handleSubmit(validatedData)} className='w-[70%] h-full flex flex-col items-center justify-center gap-4 mx-auto'>

                <fieldset className='flex flex-col justify-center items-center gap-4 w-[90%]'>
                    <legend className='p-3 text-lg font-bold'>Información del Libro</legend>
                    <input {...register("Codigo", { required: true })} type="text" placeholder='Código' className={`${stylesInputs}`} />
                    <input {...register("Titulo", { required: true })} type="text" placeholder='Titulo' className={`${stylesInputs}`} />
                    <input {...register("NumPaginas", { required: true })} type="number" placeholder='Número de Páginas' className={`${stylesInputs}`} onInput={(e) => { handleContadorCaracteres(e, 6) }} />
                    <input {...register("Tipo", { required: true })} type="text" placeholder='Tipo - Literatura Mexicana, Tesis, etc.' className={`${stylesInputs}`} />
                    <input {...register("Ano", { required: true })} onInput={(e) => { handleContadorCaracteres(e, 4) }} type="number" placeholder='Año' className={`${stylesInputs}`} />
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
                        className='border-[1px] border-solid border-[#000] w-[90%] p-1 h-[200px] max-h-[500px] outline-none'></textarea>
                </fieldset>

                <FormUbicacion handleGetLocation={handleLocation} />

                {
                    codeRepeat ? <p className='bg-red-500 w-[90%] text-secondary-a p-2 rounded-sm  text-center'>Texto no creado, el código ya existe</p> : ""
                }

                <button disabled={btnBloqueado} className='px-5 py-3 m-3 rounded-md bg-primary text-secondary-a' type='submit'>Guardar</button>

                {
                    isLoading ? <CargandoLibro /> : ""
                }

            </form>



        </>
    )
}

export default AgregarTexto;