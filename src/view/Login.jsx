import React, { useState } from 'react';
import Logo from '../images/Logo.png';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import {login} from '../FirebaseService/AuthService'

const Login = () => {

    const [error, setError] = useState(false);

    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    
    const onSubmit = async(data) => {
        try {
            if(login(data)){
                navigate('/');
            }else{
                setError(true);
                reset();
            }
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }

    return (
        <div className='bg-[#18529D] w-screen h-screen flex justify-center items-center'>
            <form className='bg-[#fff] w-[500px] h-[700px] rounded-md flex justify-evenly items-center flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                <img src={Logo} className='bg-[#18529D] w-[150px] rounded-md' />
                {error && <p className='p-2 bg-red-400 rounded-md text-secondary-a'>Usuario o contraseña incorrecta</p>}
                <fieldset className='flex flex-col justify-center items-center w-[90%] gap-10'>
                    <input {...register("usuario", { required: true })} className='outline-none border-b-[1px] border-solid border-[#000] w-full p-1' type="email" placeholder='Usuario' />
                    <input {...register("password", { required: true })} className='outline-none border-b-[1px] border-solid border-[#000] w-full p-1' type="password" placeholder='Contraseña' />
                </fieldset>
                <button type='submit' className='p-2 rounded-md bg-primary text-secondary-a'>Iniciar Sesión</button>
            </form>
        </div>
    )
}
export default Login;
