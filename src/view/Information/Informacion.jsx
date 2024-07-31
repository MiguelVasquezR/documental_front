import React, { useEffect, useState } from 'react';

import Back from '../../images/ArrowLeft';

import Header from '../../component/Header/Header';
import Ubicacion from '../../component/Ubicacion/Ubicacion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cargando from '../../component/Loaders/CargandoLibro/Cargando';


import {getTextByID} from '../../FirebaseService/TextService'
import { IsLogin } from '../../FirebaseService/AuthService';

const Información = () => {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [ubicacion, setUbiacion] = useState({});

    useEffect(() => {
        IsLogin().then((res) => {
            if (!res) { 
                navigate('/login');
            }
        }
        );
    })

    console.log(data);

    const goBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        getTextByID(id).then((res)=> {setData(res); setUbiacion(res.Ubicacion); setIsLoading(false)}).catch((err)=>{console.log(err);})
    }, []);

    return (
        <>


            {
                isLoading ?
                    <Cargando />
                    :
                    <>
                        <Header />

                        <div onClick={goBack} className='px-4 py-8 cursor-pointer'>
                            <Back w={24} />
                        </div>

                        <section className=' flex flex-col justify-center items-center gap-5 mx-auto w-[90%] lg:flex-row'>

                            <div className='shadow-md flex flex-row justify-center items-center gap-5 rounded-md text-center w-[100%] max-w-[500px] lg:w-[50%] lg:h-[500px] lg:flex-col'>
                                <picture><img src={`${data?.Portada}`} className="rounded-md w-[150px] h-[180px] object-fill lg:w-[200px] lg:h-[280px]" /></picture>
                                <article className='flex flex-col gap-1 p-2 pb-1'>
                                    <h2 className='text-[18px] font-bold'>{data?.Titulo}</h2>
                                    <h2 className='text-sm'>Código: {data?.Codigo}</h2>
                                    <h2 className='text-sm'>Número de Páginas: {data?.NumPaginas}</h2>
                                    <h2 className='text-sm'>Autor: {data?.AUTOR.NOMBRE} {data?.AUTOR.PATERNO} {data?.AUTOR?.MATERNO}</h2>
                                    <h2 className='text-sm'>Tipo: {data?.Tipo}</h2>
                                </article>
                            </div>

                            <article className='text-justify py-5 lg:w-[50%]'>
                                <h2 className='text-xl font-bold'>Reseña</h2>
                                <p className='leading-7'>{data?.Resena}</p>
                            </article>

                        </section>
                        <div className='w-[90%] xl:w-[80%] mx-auto xl:my-5 '>
                            <h2 className='text-xl font-bold'>Ubicación</h2>
                            <Ubicacion size={ubicacion?.repisa === '1' ? 4 : 6} col={ubicacion.columna} row={ubicacion.fila} />
                        </div>

                    </>
            }


        </>
    )
}



export default Información;