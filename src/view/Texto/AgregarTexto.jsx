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

    const handleUploadImage = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        setLoading(true);

        const file = e.target.files[0];
        const refArchivo = ref(storage, `portadasTextos/${file.name}`)
        await uploadBytes(refArchivo, file)
        const ulrImDesc = await getDownloadURL(refArchivo)

        setDataImage(ulrImDesc);
        setText("Cargado");

    }

    const handleSave = async (data) => {
        setBtnBloqueado(true);

        if (!dataImage || dataImage === undefined) {
            console.log('No se ha ejecutado el handleSave');
            setBtnBloqueado(false);
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
            } else if (mensaje === 'Codigo Existente') {
                setIsLoading(false);
                setBtnBloqueado(false);
                setCodeRepeat(true);
            }
            else {
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


            <div className='w-[90%] mx-auto my-4 flex flex-row justify-center items-center gap-5'>
                {dataImage ? <img className='w-[100px] h-[150px] rounded-sm' src={dataImage} /> : <div className='bg-[#f2f2f2] w-[100px] h-[150px] rounded-sm border-solid border-[1px] border-[#000]'></div>}
                <input name="image" type="file" onChange={handleUploadImage} style={{ display: 'none' }} ref={fileInputRef} />
                <div className='flex flex-col items-center justify-center gap-3'>
                    {
                        loading ? <BotonCargando text={text} /> : <button className='bg-primary text-secondary-a p-2 rounded-md w-[180px]' onClick={(e) => { e.preventDefault(); fileInputRef.current.click() }}>Seleccionar Portada</button>
                    }
                </div>
            </div>

            <form onSubmit={handleSubmit(handleSave)} className='w-[90%] mx-auto flex flex-col justify-center items-center gap-4'>


                <fieldset className='flex flex-col justify-center items-center gap-4 w-[90%]'>
                    <legend className='p-3 text-lg font-bold'>Información del Libro</legend>
                    <input {...register("Codigo", { required: true })} type="text" placeholder='Código' className={`${stylesInputs}`} />
                    <input {...register("Titulo", { required: true })} type="text" placeholder='Titulo' className={`${stylesInputs}`} />
                    <input {...register("NumPaginas", { required: true })} type="number" placeholder='Número de Páginas' className={`${stylesInputs}`} onInput={(e) => { handleContadorCaracteres(e, 6) }} />
                    <input {...register("Tipo", { required: true })} type="text" placeholder='Tipo' className={`${stylesInputs}`} />
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