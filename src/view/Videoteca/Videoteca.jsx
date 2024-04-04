import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../../component/Header/Header';
import Lupa from '../../images/Lupa';

const Videoteca = () => {
    const [peliculas, setPeliculas] = useState([])
    const [generos, setGeneros] = useState([])

    useEffect(() => {
        axios.get(`http://${import.meta.env.VITE_IP}/pelicula/listar`)
            .then((res) => {
                setPeliculas(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get(`http://${import.meta.env.VITE_IP}/genero/listar-generos`)
            .then((res) => {
                setGeneros(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])

    return (
        <>
            <Header />

            <div className='border-[1px] border-solid rounded-md w-[300px] max-w-2xl h-[40px] bg-secondary-a mx-auto my-8 flex flex-row justify-center items-center'>
                <input type="text" placeholder="Buscar" className='bg-transparent h-[100%] border-none outline-none p-4 ' />
                <div className=''>
                    <Lupa color={'black'} w={28} />
                </div>
            </div>

            {
                peliculas.map((pelicula, index) => {
                    return (
                        <div key={index} className='bg-primary my-5 w-[90%] rounded-md shadow-md flex flex-col justify-evenly py-2 items-center mx-auto'>
                            <div className='flex flex-row justify-evenly items-center w-[100%]'>
                                <picture>
                                    <img src={pelicula.LinkFoto} className='rounded-md w-[140px] h-[180px]' />
                                </picture>
                                <article className='flex flex-col justify-center items-center gap-1 text-secondary-a text-center w-[50%]'>
                                    <h2>{pelicula.Codigo}</h2>
                                    <h2>{pelicula.Titulo}</h2>
                                    <h2>{pelicula?.Tipo?.toUpperCase()}</h2>
                                    <h2>{pelicula.Ano}</h2>
                                    <h2>{pelicula.Nombre + " " + pelicula.Paterno + " " + pelicula?.Materno}</h2>
                                </article>
                            </div>
                            <div className='flex flex-row justify-center items-center w-[100%] gap-3 px-1 py-2'>
                                {
                                    generos.map((genero, index) => {
                                        if (pelicula.ID === genero.IDPelicula) {
                                            return (
                                                <h2 key={index} className='bg-secondary-a text-primary text-[12px] text-center rounded-md p-1 m-1'>{genero.Nombre}</h2>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    )
                }).reverse()
            }



        </>
    );
}

export default Videoteca;