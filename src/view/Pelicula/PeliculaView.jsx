import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../component/Header/Header';

import Editar from '../../images/Editar';
import Delete from '../../images/Delete';

const PeliculaView = () => {

    const [selected, setSelected] = useState({});

    const handleEditarLibro = (libro) => {
        console.log(libro);
    }

    const handleEliminarLibro = (libro) => {
        console.log(libro);
    }

    const libros = [
        {
            codigo: 1,
            titulo: 'El principito',
            autor: 'Antoine de Saint-Exupéry'
        },
        {
            codigo: 2,
            titulo: 'El señor de los anillos',
            autor: 'J.R.R. Tolkien'
        },
        {
            codigo: 3,
            titulo: 'Harry Potter',
            autor: 'J.K. Rowling'
        },
        {
            codigo: 4,
            titulo: 'Cien años de soledad',
            autor: 'Gabriel García Márquez'
        },
        {
            codigo: 5,
            titulo: 'Don Quijote de la Mancha',
            autor: 'Miguel de Cervantes'
        },
        {
            codigo: 6,
            titulo: 'La Odisea',
            autor: 'Homero'
        },
        {
            codigo: 7,
            titulo: 'La Iliada',
            autor: 'Homero'
        },
        {
            codigo: 8,
            titulo: 'La Divina Comedia',
            autor: 'Dante Alighieri'
        },
        {
            codigo: 9,
            titulo: 'El retrato de Dorian Gray',
            autor: 'Oscar Wilde'
        },
        {
            codigo: 10,
            titulo: 'El amor en los tiempos del cólera',
            autor: 'Gabriel García Márquez'
        }
    ];

    return (
        <>
            <Header />
            <Link to={"/pelicula/agregar"} className='bg-primary text-secondary-a px-4 py-2 rounded-md m-4 inline-block'>Agregar Libro</Link>
            <hr className='bg-[#c2c2c2] w-[90%] h-[1] mx-4' />
            <form className='w-[90%] my-3 mx-auto flex flex-row items-center justify-between'>
                <input type="text" placeholder='Ingresa Titulo' className='border-[1px] border-solid border-[#c2c2c2] p-2 rounded-md w-[200px]' />
                <input type="submit" value={"Buscar"} className='bg-primary text-secondary-a px-4 py-2 rounded-md' />
            </form>
            <h2 className='ml-4 my-4 text-lg'>Lista de Películas</h2>
            <h4 className='text-[red] text-sm w-[90%] m-4 md:hidden'>Si deseas editar o eliminar, hazlo desde el navegador del escritorio**</h4>
            <table className='max-w-[800px] w-[90%] mx-auto mb-8'>
                <thead className='w-[100%]'>
                    <tr>
                        <th className='w-[20%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Código</th>
                        <th className='w-[40%] md:w-[25%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Titulo</th>
                        <th className='w-[40%] md:w-[25%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Autor</th>
                        <th className='hidden md:table-cell md:w-[15%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Editar</th>
                        <th className='hidden md:table-cell md:w-[15%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Eliminar</th>
                    </tr>
                </thead>
                <tbody className='w-[100%]'>
                    {libros.map((libro, index) => (
                        <tr key={index}>
                            <td className='w-[20%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{libro.codigo}</td>
                            <td className='w-[40%] md:w-[25%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{libro.titulo}</td>
                            <td className='w-[40%] md:w-[25%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{libro.autor}</td>
                            <td className='hidden md:table-cell md:w-[15%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>
                                <div className="md:flex md:items-center md:justify-center" onClick={()=>handleEditarLibro(libro)}>
                                    <Editar w={30} />
                                </div>
                            </td>
                            <td className='hidden md:table-cell md:w-[15%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>
                                <div className="md:flex md:items-center md:justify-center" onClick={()=>handleEliminarLibro(libro)}>
                                    <Delete w={25} />
                                </div>
                            </td>                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default PeliculaView;
