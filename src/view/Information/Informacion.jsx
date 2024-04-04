import { React, useEffect, useState } from 'react';

import Back from '../../images/ArrowLeft';

import Header from '../../component/Header/Header';
import Ubicacion from '../../component/Ubicacion/Ubicacion';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cargando from '../../component/Loaders/CargandoLibro/Cargando';

const Información = () => {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});

    const goBack = () => {
        navigate(-1);
    }

    useEffect(() => {

        axios.get(`http://${import.meta.env.VITE_IP}/texto/visualizar?id=${id}`)
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })
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

                        <section className=' flex flex-col justify-center items-center gap-5 mx-auto w-[90%]'>

                            <div className='shadow-md flex flex-row justify-center items-center gap-5 rounded-md text-center'>
                                <picture><img src={`${data?.LinkFoto}`} className="rounded-md" /></picture>
                                <article className='flex flex-col gap-1 pb-1'>
                                    <h2 className='font-bold text-2xl'>{data?.Titulo}</h2>
                                    <h2 className='text-sm'>{data?.Codigo}</h2>
                                    <h2 className='text-sm'>{data?.Nombre} {data?.Paterno} {data?.Materno}</h2>
                                    <h2 className='text-sm'>{data?.Tipo}</h2>
                                    <h2 className='text-sm'>{data?.Disponibilidad}</h2>
                                    <h2 className='text-sm'>{"Cantidad"}</h2>
                                </article>
                            </div>

                            <article className='text-justify py-5'>
                                <h2 className='text-xl font-bold'>Reseña</h2>
                                <p className='leading-7'>{data?.Resena}</p>
                            </article>

                        </section>

                    </>
            }


        </>
    )
}



export default Información;