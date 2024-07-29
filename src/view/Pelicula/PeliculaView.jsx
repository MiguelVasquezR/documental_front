import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../component/Header/Header';
import axios from 'axios';
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import IsLogin from '../../hooks/IsLogin';


import { getMovies, deleteMovie } from '../../FirebaseService/MovieService';

const PeliculaView = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [search, setSearch] = useState('');
    const [isSelectedBook, setIsSelectedBook] = useState(null);
    const navigate = useNavigate();

    const peliculaFiltradas = useMemo(() => {
        return peliculas.filter(pelicula => pelicula.titulo?.toLowerCase().includes(search.toLowerCase()));
    }, [peliculas, search]);

    useEffect(() => {
        const fetch = async () => {
            const data = await getMovies();
            setPeliculas(data);    
        }
        fetch();
    }, []);

    const handleMovieClick = useCallback((pelicula) => {
        setIsSelectedBook(pelicula);
    }, []);

    const handleDeleteMovie = async () => {
        if (isSelectedBook) {
            const res = await deleteMovie(isSelectedBook?.id);
            if (res) {
                setPeliculas(peliculas.filter(pelicula => pelicula.id !== isSelectedBook?.id));
                setIsSelectedBook(null);
            }else{
                alert("Error al eliminar la película");
            }
        }
    };

    const handleEditMovie = () => {
        if (isSelectedBook) {
            navigate(`/pelicula/editar?codigo=${isSelectedBook.id}`);
        }
    };

    return (
        <>
            <Header />
            <section className='max-w-[1270px] mx-auto lg:w-[90%]'>
                <Link to={"/pelicula/agregar"} className='inline-block px-4 py-2 m-4 rounded-md bg-primary text-secondary-a'>Agregar Película</Link>
                <hr className='bg-[#c2c2c2] w-[90%] lg:w-[100%] h-[1px] mx-auto lg:mx-0' />
                <form className='w-[90%] my-3 mx-auto flex flex-row items-center justify-between max-w-[1270px] lg:w-[100%]' >
                    <input value={search} onChange={(e) => { setSearch(e.target.value) }} type="text" placeholder='Ingresa Título' className='border-[1px] border-solid border-[#c2c2c2] p-2 rounded-md w-[200px] md:w-[400px] lg:w-[500px] max-w-[700px] outline-none' />
                </form>
                <div className='flex flex-row items-center justify-between'>
                    <h2 className='my-4 ml-4 text-lg lg:ml-0'>Lista de Películas</h2>
                    <div className='flex flex-row items-center justify-center'>
                        <MdEdit onClick={handleEditMovie} size={50} color={isSelectedBook !== null ? 'black' : 'grey'} />
                        <MdDelete onClick={handleDeleteMovie} size={50} color={isSelectedBook ? 'black' : 'grey'} />
                    </div>
                </div>
                <table className='w-[90%] mx-auto lg:w-[100%] rounded-sm'>
                    <thead>
                        <tr>
                            <th className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Código</th>
                            <th className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Título</th>
                            <th className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {peliculaFiltradas.map((pelicula, index) => (
                            <tr key={index} onClick={() => handleMovieClick(pelicula)} className={`my-[1px] ${isSelectedBook?.Codigo === pelicula.Codigo ? "bg-primary text-secondary-a" : ""}`}>
                                <td className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{pelicula.codigo}</td>
                                <td className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{pelicula.titulo}</td>
                                <td className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{pelicula?.AUTOR?.Nombre} {pelicula?.AUTOR?.Paterno} {pelicula?.AUTOR?.Materno}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default PeliculaView;
