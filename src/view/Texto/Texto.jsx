import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../component/Header/Header';
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

import { getTexts, deleteText } from '../../FirebaseService/TextService';
import { IsLogin } from '../../FirebaseService/AuthService';

const Texto = () => {
    const [libros, setLibros] = useState([]);
    const [search, setSearch] = useState('');
    const [isSelectedBook, setIsSelectedBook] = useState(null);
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
        getTexts().then((res) => { setLibros(res) })
    }, []);

    const handleDeleteBook = useCallback(() => {

        deleteText(isSelectedBook.id).then((res) => {
            console.log(res);
            if (res) {
                toast.success('Libro eliminado con exito');
                getTexts().then((res) => { setLibros(res) })
            }
        });

    }, [isSelectedBook, libros]);

    const handleEditBook = useCallback(() => {
        if (isSelectedBook) {
            navigate(`/texto/editar?codigo=${isSelectedBook.id}`);
        }
    }, [isSelectedBook, navigate]);

    const handleBookClick = useCallback((libro) => {
        setIsSelectedBook(libro);
    }, []);

    const librosFiltrados = useMemo(() => {
        return libros ? libros.filter(libro => libro.Titulo.toLowerCase().includes(search.toLowerCase())) : "";
    }, [libros, search]);

    return (
        <>
            <Header />
            <section className='max-w-[1270px] mx-auto md:w-[90%] lg:w-[90%]'>
                <Link to={"/texto/agregar"} className='inline-block px-4 py-2 m-4 rounded-md bg-primary text-secondary-a'>
                    Crear Libro
                </Link>

                <hr className='w-[90%] lg:w-[100%] mx-auto bg-[#c2c2c2]' />

                <form className='w-[90%] my-3 mx-auto flex flex-row items-center justify-between max-w-[1270px] lg:w-[100%]' >
                    <input value={search} onChange={(e) => { setSearch(e.target.value) }} type="text" placeholder='Ingresa Titulo' className='border-[1px] border-solid border-[#c2c2c2] p-2 rounded-md w-[200px] md:w-[400px] lg:w-[500px] max-w-[700px] outline-none' />
                </form>

                <div className='flex flex-row items-center justify-between'>
                    <h2 className='my-4 ml-4 text-lg lg:ml-0'>Lista Textos</h2>
                    <div className='flex flex-row items-center justify-center'>
                        <MdEdit onClick={handleEditBook} size={50} color={`${isSelectedBook !== null ? 'black' : 'grey'}`} />
                        <MdDelete onClick={handleDeleteBook} size={50} color={`${isSelectedBook ? 'black' : 'grey'}`} />
                    </div>
                </div>

                <table className='w-[90%] mx-auto lg:w-[100%] md:w-[90%] rounded-sm'>
                    <thead>
                        <tr>
                            <th className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Código</th>
                            <th className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Titulo</th>
                            <th className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>Autor</th>
                        </tr>
                    </thead>

                    <tbody>

                        {librosFiltrados.length !== 0 ?
                            librosFiltrados.map((libro, index) => (
                                <tr key={index} onClick={() => handleBookClick(libro)} className={`my-[1px] ${isSelectedBook?.Codigo === libro.Codigo ? "bg-primary text-secondary-a" : ""}`}>
                                    <td className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{libro.Codigo}</td>
                                    <td className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{libro.Titulo}</td>
                                    <td className='text-center p-1 border-[1px] border-[#c2c2c2] border-solid'>{libro?.AUTOR?.NOMBRE + " " + libro?.AUTOR?.PATERNO + " " + libro?.AUTOR?.MATERNO}</td>
                                </tr>
                            ))
                            :
                            null
                        }
                    </tbody>
                </table>

            </section>


            <Toaster position='top-left' />


        </>
    );
};

export default Texto;
