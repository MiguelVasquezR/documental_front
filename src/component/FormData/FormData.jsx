import React from 'react';
import { useForm } from 'react-hook-form';

const FormDatos = () => {
    const { register, handleSubmit } = useForm();

    const style = 'w-[100%] bg-transparent border-b-[1px] border-solid border-[#000] p-1 my-2';

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <form className='w-[90%] my-5 mx-auto' onSubmit={handleSubmit(onSubmit)}>
            <legend className='text-lg font-bold'>Información General</legend>
            <input  {...register("Codigo", { required: true })} className={`${style}`} type="text" placeholder='Código *' />
            <input  {...register("Tipo", { required: true })} className={`${style}`} type="text" placeholder='Tipo *' />
            <input  {...register("Titulo", { required: true })} className={`${style}`} type="text" placeholder='Titulo *' />
            <input  {...register("Director", { required: true })} className={`${style}`} type="text" placeholder='Director *' />
            <input  {...register("Agno", { required: true })} className={`${style}`} type="text" placeholder='Año *' />
            <input  {...register("Proviene", { required: true })} className={`${style}`} type="text" placeholder='Seleccionar *' />
        </form>
    )
}


export default FormDatos;