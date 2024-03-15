import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../component/Header/Header';


const libros = [
    {
        titulo: "El Señor de los Anillos",
        autor: "J.R.R. Tolkien",
        codigo: "001",
        cantidad: 4
    },
    {
        titulo: "La Odisea",
        autor: "Homero",
        codigo: "002",
        cantidad: 4
    },
    {
        titulo: "El Principito",
        autor: "Antoine de Saint-Exupéry",
        codigo: "003",
        cantidad: 4
    }
]


const Texto = () => {
    return (
        <>
            <Header />
            <body>
                <Link to={"/texto/agregar"} className='bg-primary text-secondary-a px-4 py-2 rounded-md m-4 inline-block'>
                    Crear Libro
                </Link>
                <hr className='w-[90%] mx-auto bg-[#c2c2c2]' />


                <form className='w-[90%] my-3 mx-auto flex flex-row items-center justify-between' >
                    <input type="text" placeholder='Ingresa Titulo' className='border-[1px] border-solid border-[#c2c2c2] p-2 rounded-md w-[200px]' />
                    <input type="submit" value={"Buscar"} className='bg-primary text-secondary-a px-4 py-2 rounded-md' />
                </form>

                <h2 className='ml-4 my-4 text-lg'>Lista Textos</h2>
                <table className='max-w-[600px] w-[90%] block mx-auto mb-8'>

                    <thead className=' w-[100%] flex justify-center items-center'>
                        <tr className='w-[100%] border-[1px] border-[#c3c3c3] border-solid flex'>
                            <th className='w-[20%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Código</th>
                            <th className='w-[30%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Titulo</th>
                            <th className='w-[30%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Autor</th>
                            <th className='w-[20%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Cant.</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            libros.map((libro, index) => {
                                return (
                                    <tr key={index} className='my-[1px]'>
                                        <td className='w-[20%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{libro.codigo}</td>
                                        <td className='w-[30%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{libro.titulo}</td>
                                        <td className='w-[30%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{libro.autor}</td>
                                        <th className='w-[20%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{libro.cantidad}</th>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>


            </body>

        </>
    )
}

export default Texto;