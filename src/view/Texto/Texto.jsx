import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../../component/Header/Header';


const Texto = () => {
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4567/texto/informacion-tabla')
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
            <section>
                <Link to={"/texto/agregar"} className='bg-primary text-secondary-a px-4 py-2 rounded-md m-4 inline-block'>
                    Crear Libro
                </Link>
                <hr className='w-[90%] mx-auto bg-[#c2c2c2]' />


                <form className='w-[90%] my-3 mx-auto flex flex-row items-center justify-between' >
                    <input type="text" placeholder='Ingresa Titulo' className='border-[1px] border-solid border-[#c2c2c2] p-2 rounded-md w-[200px]' />
                    <input type="submit" value={"Buscar"} className='bg-primary text-secondary-a px-4 py-2 rounded-md' />
                </form>

                <h2 className='ml-4 my-4 text-lg'>Lista Textos</h2>

                <table className='w-[90%] mx-auto'>
                    <thead>
                        <tr>
                            <th className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Código</th>
                            <th className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Titulo</th>
                            <th className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Autor</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            libros.map((libro, index) => {
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