import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from '../../component/Header/Header';
import BotonCargando from '../../component/Loaders/BotonCargando/BotonCargando';
import { getMovieByID, updateMovie } from '../../FirebaseService/MovieService';
import { IsLogin } from '../../FirebaseService/AuthService';

const EditarPelicula = () => {
    const [loading, setLoading] = useState(false);
    const [btnBloqueado, setBtnBloqueado] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();

    // Obtener código de la URL
    const searchParams = new URLSearchParams(window.location.search);
    const codigo = searchParams.get('codigo');

    useEffect(() => {
        IsLogin().then((res) => {
            if (!res) { 
                navigate('/login');
            }
        }
        );
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const datos = await getMovieByID(codigo);
                
                // Verifica que datos exista y tenga las propiedades necesarias
                if (datos) {
                    setValue('codigo', datos.codigo);
                    setValue('titulo', datos.titulo);
                    setValue('anio', datos.anio);
                    setValue('tipo', datos.tipo);
                    setValue('origen', datos.origen);
                    setValue('Nombre', datos.AUTOR?.Nombre || '');
                    setValue('Paterno', datos.AUTOR?.Paterno || '');
                    setValue('Materno', datos.AUTOR?.Materno || '');
                }
            } catch (error) {
                console.error('Error al obtener los datos de la película:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [codigo, setValue]);

    const guardarPelicula = async (data) => {
        setBtnBloqueado(true);
        try {
            const INFORMACION = {
                anio: data.anio,
                codigo: data.codigo,
                titulo: data.titulo,
                origen: data.origen,
                tipo: data.tipo,
                AUTOR: {
                    Nombre: data.Nombre,
                    Paterno: data.Paterno,
                    Materno: data.Materno,
                },
            };
            const response = await updateMovie(codigo, INFORMACION);
            if (response) {
                navigate('/pelicula');
            } else {
                alert('Error al guardar la película');
            }
        } catch (error) {
            console.error('Error al guardar la película:', error);
        } finally {
            setBtnBloqueado(false);
        }
    };

    return (
        <>
            <Header />
            <h2 className="m-4 text-xl font-bold text-center">Editar Película</h2>
            <section className="flex flex-col items-center justify-center gap-5">
                <form onSubmit={handleSubmit(guardarPelicula)} className="mx-auto w-[90%] flex flex-col justify-center items-center gap-9">
                    <fieldset className="flex flex-col gap-4 w-[100%]">
                        <legend className="my-4 text-xl font-bold">Información de Película</legend>
                        <input {...register('codigo', { required: true })} type="text" placeholder="Código" className="border-b-[1px] border-solid outline-none border-[#000] p-1 w-[100%]" />
                        <input {...register('titulo', { required: true })} type="text" placeholder="Título" className="border-b-[1px] border-solid outline-none border-[#000] p-1 w-[100%]" />
                        <input {...register('anio', { required: true })} type="text" placeholder="Año" className="border-b-[1px] border-solid outline-none border-[#000] p-1 w-[100%]" />
                        <select {...register('tipo', { required: true })} className="border-b-[1px] border-solid outline-none border-[#000] p-1 w-[100%]">
                            <option value="">Selecciona Opción</option>
                            <option value="dvd">DVD</option>
                            <option value="blueRay">Blue-Ray</option>
                            <option value="otro">Otro</option>
                        </select>
                        <select {...register('origen', { required: true })} className="outline-none border-b-[1px] border-solid border-[#000] p-1 w-[100%]">
                            <option value="">Selecciona Opción</option>
                            <option value="original">Original</option>
                            <option value="copia">Copia</option>
                        </select>
                    </fieldset>

                    <fieldset className="flex flex-col gap-4 w-[100%]">
                        <legend className="my-4 text-xl font-bold">Información del Autor</legend>
                        <input {...register('Nombre', { required: true })} type="text" placeholder="Nombre" className="border-b-[1px] outline-none border-solid border-[#000] p-1 w-[100%]" />
                        <input {...register('Paterno', { required: true })} type="text" placeholder="Paterno" className="border-b-[1px] outline-none border-solid border-[#000] p-1 w-[100%]" />
                        <input {...register('Materno')} type="text" placeholder="Materno" className="border-b-[1px] outline-none border-solid border-[#000] p-1 w-[100%]" />
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
