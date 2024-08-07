import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Header from '../../component/Header/Header';
import Lupa from '../../images/Lupa';
import Cargando from '../../component/Loaders/CargandoLibro/Cargando'
import { useNavigate } from 'react-router-dom';
import { IsLogin } from '../../FirebaseService/AuthService';


import { getMovies } from '../../FirebaseService/MovieService';

const Videoteca = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        IsLogin().then((res) => {
            if (!res) { 
                navigate('/login');
            }
        }
        );
    })

    useEffect(() => {
        setLoading(true);
        getMovies().then((res) => { setPeliculas(res); console.log(res); }).then(() => { setLoading(false) }).catch((err) => { console.log(err) });
    }, []);

    const filteredMovies = useMemo(() => {
        return peliculas ? peliculas.filter(pelicula => pelicula?.titulo.toLowerCase().includes(search?.toLowerCase())) : "";
    }, [peliculas, search]);

    return (
        <>
            <Header />
            <div className='border-[1px] border-solid rounded-md w-[300px] max-w-2xl h-[40px] bg-secondary-a mx-auto my-8 flex flex-row justify-center items-center md:w-[500px]'>
                <input type="text" placeholder="Buscar" className='bg-transparent w-[100%] h-[100%] border-none outline-none p-4 ' value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className='px-1'>
                    <Lupa color={'black'} w={28} />
                </div>
            </div>
            <section className='grid grid-cols-1 gap-5 px-5 mb-5 md:grid-cols-2 xl:grid-cols-3'>
                {filteredMovies.length > 0 && (
                    filteredMovies.map((pelicula, index) => (
                        <div key={index} className='w-[360px] h-[220px] shadow-md rounded-md grid grid-cols-2 gap-3 mx-auto'>
                            <img src={pelicula.portada} className='h-[220px] w-[200px] object-fill rounded-md' />
                            <article className='flex flex-col justify-center gap-1'>
                                <p className='text-[12px] font-bold'>{pelicula.titulo}</p>
                                <div>
                                    <p className='text-[8px] text-[#000]/50'>Código:</p>
                                    <p className='text-[10px]'>{pelicula.codigo}</p>
                                </div>
                                <div>
                                    <p className='text-[8px] text-[#000]/50'>Autor:</p>
                                    <p className='text-[10px]'>{pelicula?.AUTOR?.Nombre + " " + pelicula?.AUTOR?.Paterno + " " + pelicula?.AUTOR?.Materno}</p>
                                </div>
                                <div>
                                    <p className='text-[8px] text-[#000]/50'>Formato:</p>
                                    <p className='text-[10px]'>{pelicula.tipo}</p>
                                </div>
                                <div>
                                    <p className='text-[8px] text-[#000]/50'>Tipo:</p>
                                    <p className='text-[10px]'>{pelicula.origen}</p>
                                </div>
                                <section>
                                    <h4 className='text-[12px] font-bold'>Género</h4>
                                    <div className='flex flex-row items-center justify-center gap-1'>
                                        {

                                            pelicula.GENEROS.map((genero, index) => { return <p key={index} className='text-[8px] bg-primary p-1 rounded-md text-secondary-a mt-1'>{genero}</p> })
                                        }
                                    </div>
                                </section>
                            </article>
                        </div>
                    ))
                )
                }
            </section>
            {
                filteredMovies.length === 0 &&
                <div className='text-2xl font-bold text-center'>
                    <p>No hay resultados</p>
                </div>
            }
            {loading && <Cargando />}
        </>
    );
};

export default Videoteca;
