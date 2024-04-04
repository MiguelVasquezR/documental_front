import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../component/Header/Header';
import axios from 'axios';

import ip from '../../dir'

const PeliculaView = () => {

    const [selected, setSelected] = useState({});
    const [peliculas, setPeliculas] = useState([])

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
                    {
                        peliculas.map((pelicula, index) => {
                            return (
                                <tr key={index} className='text-center'>
                                    <td>{pelicula.Codigo}</td>
                                    <td>{pelicula.Titulo}</td>
                                    <td>{pelicula.Nombre + " " + pelicula.Paterno + " " + pelicula?.Materno}</td>
                                </tr>
                            )
                        }).reverse()
                    }
                </tbody>
            </table>
        </>
    );
};

export default PeliculaView;
