import { React } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../component/Header/Header';

import Editar from '../../images/Editar';
import Delete from '../../images/Delete';

const PeliculaView = () => {


    const libros = [
        {
            titulo: "El Señor de los Anillos",
            autor: "J.R.R. Tolkien",
            codigo: "001"
        },
        {
            titulo: "La Odisea",
            autor: "Homero",
            codigo: "002"
        },
        {
            titulo: "El Principito",
            autor: "Antoine de Saint-Exupéry",
            codigo: "003"
        },
        {
            titulo: "Don Quijote de la Mancha",
            autor: "Miguel de Cervantes",
            codigo: "004"
        },
        {
            titulo: "Cien Años de Soledad",
            autor: "Gabriel García Márquez",
            codigo: "005"
        },
        {
            titulo: "El Perfume",
            autor: "Patrick Süskind",
            codigo: "006"
        },
        {
            titulo: "El Código Da Vinci",
            autor: "Dan Brown",
            codigo: "007"
        },
        {
            titulo: "El Alquimista",
            autor: "Paulo Coelho",
            codigo: "008"
        },
        {
            titulo: "El Nombre de la Rosa",
            autor: "Umberto Eco",
            codigo: "009"
        },
        {
            titulo: "El Laberinto de los Espíritus",
            autor: "Carlos Ruiz Zafón",
            codigo: "010"
        }
    ]


    return (
        <>
            <Header />
            <Link to={"/pelicula/agregar"} className='bg-primary text-secondary-a px-4 py-2 rounded-md m-4 inline-block'>Agregar Libro</Link>
            <hr className='bg-[#c2c2c2] w-[90%] h-[1] mx-4' />

            <form className='w-[90%] my-3 mx-auto flex flex-row items-center justify-between' >
                <input type="text" placeholder='Ingresa Titulo' className='border-[1px] border-solid border-[#c2c2c2] p-2 rounded-md w-[200px]' />
                <input type="submit" value={"Buscar"} className='bg-primary text-secondary-a px-4 py-2 rounded-md' />
            </form>

            <h2 className='ml-4 my-4 text-lg'>Lista de Películas</h2>
            <table className='max-w-[600px] w-[90%] block mx-auto mb-8'>

                <thead className=' w-[100%] flex justify-center items-center'>
                    <tr className='w-[100%] border-[1px] border-[#c3c3c3] border-solid flex'> 
                        <th className='w-[40%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Titulo</th>
                        <th className='w-[40%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Código</th>                                                   
                        <th className='w-[20%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Autor</th>
                    </tr>                                            
                </thead>

                <tbody>
                    {
                        libros.map((libro, index) => {
                            return (
                                <tr key={index} className='my-[1px]'>
                                    <td className='w-[40%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{libro.titulo}</td>
                                    <td className='w-[40%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{libro.autor}</td>
                                    <td className='w-[20%] text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{libro.codigo}</td>                                    
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    );
}

export default PeliculaView;