import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../../component/Header/Header';


const Texto = () => {
    const [libros, setLibros] = useState([]);
    const [search, setSearch] = useState('');

    const librosFiltrados = libros.filter((libro) => {
        return libro.Titulo.toLowerCase().includes(search.toLowerCase());
    });

    useEffect(() => {
        axios.get(`http://${import.meta.env.VITE_IP}/texto/informacion-tabla`)
            .then((res) => {
                setLibros(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <Header />
            <section className='max-w-[1270px] mx-auto'>
                <Link to={"/texto/agregar"} className='bg-primary text-secondary-a px-4 py-2 rounded-md m-4 inline-block'>
                    Crear Libro
                </Link>

                <hr className='w-[90%] lg:w-[100%] mx-auto bg-[#c2c2c2]' />


                <form className='w-[90%] my-3 mx-auto flex flex-row items-center justify-between max-w-[1270px] lg:w-[100%]' >
                    <input value={search} onChange={(e)=>{setSearch(e.target.value)}} type="text" placeholder='Ingresa Titulo' className='border-[1px] border-solid border-[#c2c2c2] p-2 rounded-md w-[200px] md:w-[400px] lg:w-[500px] max-w-[700px] outline-none' />
                </form>

                <h2 className='ml-4 my-4 text-lg lg:ml-0'>Lista Textos</h2>

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
                            librosFiltrados.map((libro, index) => {
                                return (
                                    <tr key={index} className='my-[1px]'>
                                        <td className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{libro.Codigo}</td>
                                        <td className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{libro.Titulo}</td>
                                        <td className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{libro.Nombre + " " + libro.Paterno + " " + libro?.Materno}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>

            </section>

        </>
    )
}

export default Texto;