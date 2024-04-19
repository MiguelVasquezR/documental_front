import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../component/Header/Header';
import axios from 'axios';

const PeliculaView = () => {

    const [peliculas, setPeliculas] = useState([])
    const [search, setSearch] = useState('')

    const peliculaFiltradas = peliculas.filter((pelicula) => {
        return pelicula.Titulo.toLowerCase().includes(search.toLowerCase())
    });

    useEffect(() => {
        axios.get(`http://${import.meta.env.VITE_IP}/pelicula/listar`)
            .then((res) => {
                console.log(res.data);
                setPeliculas(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    return (
        <>
            <Header />

            <section className='max-w-[1270px] mx-auto'>

                <Link to={"/pelicula/agregar"} className='bg-primary text-secondary-a px-4 py-2 rounded-md m-4 inline-block'>Agregar Libro</Link>

                <hr className='bg-[#c2c2c2] w-[90%] lg:w-[100%] h-[1px] mx-auto lg:mx-0' />

                <form className='w-[90%] my-3 mx-auto flex flex-row items-center justify-between max-w-[1270px] lg:w-[100%]' >
                    <input value={search} onChange={(e)=>{setSearch(e.target.value)}} type="text" placeholder='Ingresa Titulo' className='border-[1px] border-solid border-[#c2c2c2] p-2 rounded-md w-[200px] md:w-[400px] lg:w-[500px] max-w-[700px] outline-none' />
                </form>

                <h2 className='ml-4 my-4 text-lg lg:ml-0'>Lista Películas</h2>

                <table className='w-[90%] mx-auto lg:w-[100%] rounded-sm'>
                    <thead>
                        <tr>
                            <th className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Código</th>
                            <th className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Titulo</th>
                            <th className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Autor</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            peliculaFiltradas.map((pelicula, index) => {
                                return (
                                    <tr key={index} className='my-[1px]'>
                                        <td className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{pelicula.Codigo}</td>
                                        <td className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{pelicula.Titulo}</td>
                                        <td className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{pelicula.Nombre + " " + pelicula.Paterno + " " + pelicula?.Materno}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>


            </section>


        </>
    );
};

export default PeliculaView;
