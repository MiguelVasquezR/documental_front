import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Header from '../../component/Header/Header';
import Lupa from '../../images/Lupa';
import Cargando from '../../component/Loaders/CargandoLibro/Cargando';

const Videoteca = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [peliculasResponse, generosResponse] = await Promise.all([
                    await axios.get(`http://${import.meta.env.VITE_IP}/pelicula/listar`),
                    await axios.get(`http://${import.meta.env.VITE_IP}/genero/listar-generos`)
                ]);

                if(peliculasResponse.data.length === 0){
                    setLoading(false);
                    return;
                }

                setPeliculas(peliculasResponse.data);
                setGeneros(generosResponse.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const filteredMovies = useMemo(() => {
        return peliculas.filter(pelicula => pelicula.Titulo.toLowerCase().includes(search.toLowerCase()));
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
            <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-5 px-5'>
                {filteredMovies.length > 0 && (
                    filteredMovies.map((pelicula, index) => (
                        <div key={index} className='w-[360px] h-[220px] shadow-md rounded-md grid grid-cols-2 gap-3 mx-auto'>
                            <img src={pelicula.LinkFoto} className='h-[220px] w-[200px] object-fill rounded-md' />
                            <article className='flex flex-col justify-center gap-1'>
                                <p className='text-[12px] font-bold'>{pelicula.Titulo}</p>
                                <div>
                                    <p className='text-[8px] text-[#000]/50'>Código:</p>
                                    <p className='text-[10px]'>{pelicula.Codigo}</p>
                                </div>
                                <div>
                                    <p className='text-[8px] text-[#000]/50'>Autor:</p>
                                    <p className='text-[10px]'>{pelicula.Nombre + " " + pelicula.Paterno + " " + pelicula?.Materno}</p>
                                </div>
                                <div>
                                    <p className='text-[8px] text-[#000]/50'>Formato:</p>
                                    <p className='text-[10px]'>{pelicula.Tipo}</p>
                                </div>
                                <div>
                                    <p className='text-[8px] text-[#000]/50'>Tipo:</p>
                                    <p className='text-[10px]'>{pelicula.Proviene}</p>
                                </div>
                                <section>
                                    <h4 className='text-[12px] font-bold'>Género</h4>
                                    <div className='flex flex-row justify-center items-center gap-1'>
                                        {generos
                                            .filter((genero) => genero.IDPelicula === pelicula.ID && genero.Nombre !== '')
                                            .map((genero, index) => (
                                                <p key={index} className='text-[8px] bg-primary p-1 rounded-md text-secondary-a mt-1'>
                                                    {genero.Nombre}
                                                </p>
                                            ))}
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
                <div className='text-center text-2xl font-bold'>
                    <p>No hay resultados</p>
                </div>
            }
            {loading && <Cargando />}
        </>
    );
};

export default Videoteca;
