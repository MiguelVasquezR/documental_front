import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../component/Header/Header';
import BotonCargando from '../../component/Loaders/BotonCargando/BotonCargando';
import IsLogin from '../../hooks/IsLogin';


import { getMovieByID, updateMovie } from '../../FirebaseService/MovieService';

const EditarPelicula = () => {
    const [loading, setLoading] = useState(false);
    const [pelicula, setPelicula] = useState({
        anio: '',
        codigo: '',
        titulo: '',
        origen: '',
        tipo: '',
        AUTOR: {
            Nombre: '',
            Paterno: '',
            Materno: ''
        },
    });

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [btnBloqueado, setBtnBloqueado] = useState(false);

    const searchParams = new URLSearchParams(window.location.search);
    const codigo = searchParams.get('codigo');

    useEffect(() => {
        /* if(!IsLogin){
            navigate('/login');
          } */
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const datos = await getMovieByID(codigo);
            setPelicula(datos);
        };
        fetchData();
    }, [codigo]);

    const guardarPelicula = async (e) => {
        setBtnBloqueado(true);


        const INFORMACION = {
            anio: pelicula.ano,
            codigo: pelicula.codigo,
            titulo: pelicula.titulo,
            origen: pelicula.origen,
            tipo: pelicula.tipo,
            AUTOR: {
                Nombre: pelicula.AUTOR.nombre,
                Paterno: pelicula.AUTOR.paterno,
                Materno: pelicula.AUTOR.materno
            },
        }
        if (updateMovie(codigo,INFORMACION)) {
            navigate('/pelicula');
        } else {
            alert('Error al guardar la película');
        }

    };

    const handleInputChange = (e) => {
        setPelicula({
            ...pelicula,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Header />
            <h2 className="m-4 text-xl font-bold text-center">Editar Película</h2>
            <section className="flex flex-col items-center justify-center gap-5">
                <form onSubmit={handleSubmit(guardarPelicula)} className="mx-auto w-[90%] flex flex-col justify-center items-center gap-9">
                    <fieldset className="flex flex-col gap-4 w-[100%]">

                        <legend className="my-4 text-xl font-bold">Información de Película</legend>
                        <input value={pelicula?.codigo} name="Codigo" onChange={handleInputChange} type="text" placeholder="Código" className="border-b-[1px] border-solid outline-none border-[#000] p-1 w-[100%]" />
                        <input value={pelicula?.titulo} name="Titulo" onChange={handleInputChange} type="text" placeholder="Título" className="border-b-[1px] border-solid outline-none border-[#000] p-1 w-[100%]" />
                        <input value={pelicula?.anio} name="Ano" onChange={handleInputChange} type="text" placeholder="Año" className="border-b-[1px] border-solid outline-none border-[#000] p-1 w-[100%]" />
                        <select value={pelicula?.tipo} name='Tipo' onChange={handleInputChange} className="border-b-[1px] border-solid outline-none border-[#000] p-1 w-[100%]">
                            <option value="">Selecciona Opción</option>
                            <option value="dvd">DVD</option>
                            <option value="blueRay">Blue-Ray</option>
                            <option value="otro">Otro</option>
                        </select>
                        <select value={pelicula?.origen} name='Proviene' onChange={handleInputChange} className="outline-none border-b-[1px] border-solid border-[#000] p-1 w-[100%]">
                            <option value="">Selecciona Opción</option>
                            <option value="original">Original</option>
                            <option value="copia">Copia</option>
                        </select>
                    </fieldset>

                    <fieldset className="flex flex-col gap-4 w-[100%]">
                        <legend className="my-4 text-xl font-bold">Información del Autor</legend>
                        <input value={pelicula?.AUTOR?.Nombre} name="Nombre" onChange={handleInputChange} type="text" placeholder="Nombre" className="border-b-[1px] outline-none border-solid border-[#000] p-1 w-[100%]" required />
                        <input value={pelicula?.AUTOR?.Paterno} name="Paterno" onChange={handleInputChange} type="text" placeholder="Paterno" className="border-b-[1px] outline-none border-solid border-[#000] p-1 w-[100%]" required />
                        <input value={pelicula?.AUTOR?.Materno} name="Materno" onChange={handleInputChange} type="text" placeholder="Materno" className="border-b-[1px] outline-none border-solid border-[#000] p-1 w-[100%]" />
                    </fieldset>

                    {loading && <BotonCargando />}
                    <button disabled={btnBloqueado} type="submit" className="px-4 py-2 my-5 rounded-md bg-primary text-secondary-a">
                        Guardar
                    </button>
                </form>
            </section>
        </>
    );
};

export default EditarPelicula;

