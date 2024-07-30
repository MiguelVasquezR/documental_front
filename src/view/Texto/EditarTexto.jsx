import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../component/Header/Header';
import CargandoLibro from '../../component/Loaders/CargandoLibro/Cargando';
import Ubicacion from '../../component/Ubicacion/Ubicacion';

import { getTextByID, updateText } from '../../FirebaseService/TextService';
import toast, {Toaster} from 'react-hot-toast';
import { IsLogin } from '../../FirebaseService/AuthService';

const EditarTexto = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const codigo = searchParams.get('codigo');
    const { register, handleSubmit, setValue, watch } = useForm();
    const [texto, setTexto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [btnBloqueado, setBtnBloqueado] = useState(false);
    const navigate = useNavigate();

    const repisa = watch('repisa', '');
    const fila = watch('fila', '');
    const columna = watch('columna', '');

    useEffect(() => {
        IsLogin().then((res) => {
            if (!res) { 
                navigate('/login');
            }
        }
        );
    })

    useEffect(() => {
        getTextByID(codigo).then((res) => {
            if (res) {
                setTexto(res);
                setValue('Codigo', res?.Codigo);
                setValue('Titulo', res?.Titulo);
                setValue('NumPaginas', res?.NumPaginas);
                setValue('Tipo', res?.Tipo);
                setValue('Ano', res?.Ano);

                // Asegúrate de que los nombres de las propiedades coincidan
                setValue('Nombre', res?.AUTOR?.NOMBRE || '');
                setValue('Paterno', res?.AUTOR?.PATERNO || '');
                setValue('Materno', res?.AUTOR?.MATERNO || '');
                setValue('Resena', res?.Resena || '');
                
                setValue('repisa', res?.Ubicacion.repisa);
                setValue('fila', res?.Ubicacion.fila);
                setValue('columna', res?.Ubicacion.columna);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [codigo, setValue]);

    const handleSave = async (data) => {
        setIsLoading(true);
        setBtnBloqueado(true);
        
        const dataSend = {
            Codigo: data.Codigo,
            Titulo: data.Titulo,
            NumPaginas: data.NumPaginas,
            Tipo: data.Tipo,
            Ano: data.Ano,
            Resena: data.Resena,
            Ubicacion: {
                repisa: repisa,
                fila: fila,
                columna: columna
            },
            AUTOR: {
                NOMBRE: data?.Nombre,
                PATERNO: data?.Paterno,
                MATERNO: data?.Materno,
            }
        }

        updateText(dataSend, texto.id).then((res)=>{
            if(res){
                navigate('/texto');
            }else{
                toast.error('Error al actualizar el libro');
            }
        })
        
       
    };

    const stylesInputs = "border-b-[1px] w-[90%] p-1 outline-none";

    return (
        <>
            <Header />

            <form onSubmit={handleSubmit(handleSave)} className='w-[90%] mx-auto flex flex-col justify-center items-center gap-4'>
                <fieldset className='flex flex-col justify-center items-center gap-4 w-[90%]'>
                    <legend className='p-3 text-lg font-bold'>Información del Libro</legend>
                    <input {...register('Codigo', { required: true })} type="text" placeholder='Código' className={`${stylesInputs}`} />
                    <input {...register('Titulo', { required: true })} type="text" placeholder='Titulo' className={`${stylesInputs}`} />
                    <input {...register('NumPaginas', { required: true })} type="number" placeholder='Número de Páginas' className={`${stylesInputs}`} />
                    <input {...register('Tipo', { required: true })} type="text" placeholder='Tipo' className={`${stylesInputs}`} />
                    <input {...register('Ano', { required: true })} type="number" placeholder='Año' className={`${stylesInputs}`} />
                </fieldset>

                <fieldset className='flex flex-col justify-center items-center gap-4 w-[90%]'>
                    <legend className='p-3 text-lg font-bold'>Información del Autor</legend>
                    <input {...register('Nombre', { required: true })} type="text" placeholder='Nombre' className={`${stylesInputs}`} />
                    <input {...register('Paterno', { required: true })} type="text" placeholder='Paterno' className={`${stylesInputs}`} />
                    <input {...register('Materno')} type="text" placeholder='Materno' className={`${stylesInputs}`} />
                </fieldset>

                <fieldset className='flex flex-col justify-center items-center gap-4 w-[90%]'>
                    <legend className='p-3 text-lg font-bold'>Reseña</legend>
                    <textarea {...register('Resena', { required: true })} placeholder='Escribe tu Reseña' className='border-[1px] border-solid border-[#000] w-[90%] p-1 h-[200px] max-h-[500px] outline-none'></textarea>
                </fieldset>

                <section className='w-[90%] mx-auto'>
                    <legend className='p-3 text-lg font-bold'>Ubicación</legend>
                    <select {...register('repisa', { required: true })} className='w-[100%] bg-transparent border-b-[1px] border-solid border-[#000] p-1 my-2 outline-none'>
                        <option value="">Seleccione una repisa</option>
                        <option value="1">Repisa 1</option>
                        <option value="2">Repisa 2</option>
                    </select>
                    <input
                        {...register('columna', { required: true })}
                        className='outline-none w-[100%] bg-transparent border-b-[1px] border-solid border-[#000] p-1 my-2'
                        type="number"
                        placeholder='Columna *'
                    />
                    <input
                        {...register('fila', { required: true })}
                        className='outline-none w-[100%] bg-transparent border-b-[1px] border-solid border-[#000] p-1 my-2'
                        type="number"
                        placeholder='Fila *'
                    />
                    {repisa === '1' ? <Ubicacion col={columna} row={fila} size={4} /> : <Ubicacion col={columna} row={fila} size={6} />}
                </section>

                <button disabled={btnBloqueado || isLoading} className='px-5 py-3 m-3 rounded-md bg-primary text-secondary-a' type='submit'>
                    {isLoading ? 'Guardando...' : 'Guardar'}
                </button>

                {isLoading && <CargandoLibro />}
            </form>

            <Toaster position='top-left' />

        </>
    );
}

export default EditarTexto;
