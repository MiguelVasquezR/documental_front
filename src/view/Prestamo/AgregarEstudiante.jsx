import React, { useState } from "react";

import Header from "../../component/Header/Header";

import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AgregarEstudiante = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const onSubmit = (data) => {
        axios.post(`httpss://${import.meta.env.VITE_IP}/estudiante/crear`, data)
            .then((res) => {                
                if (res.data.mensaje === "Creado") {
                    navigate("/prestamo");
                }else{
                    setError(res.data.mensaje);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const styleInputs = "border-b-[1px] border-solid border-[#000] w-[100%] p-1 outline-none";
    return (
        <>
            <Header />
            <div className="w-[90%] mx-auto my-5 flex flex-col justify-center gap-4">
                <h2 className="font-bold">Información Estudiante</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-4 mx-auto w-[90%]">
                    <input className={`${styleInputs}`} type="text" placeholder="Matricula*" {...register("Matricula", { required: true })} />
                    <input className={`${styleInputs}`} type="text" placeholder="Nombre*" {...register("Nombre", { required: true })} />
                    <input className={`${styleInputs}`} type="text" placeholder="Apellido Paterno*" {...register("Paterno", { required: true })} />
                    <input className={`${styleInputs}`} type="text" placeholder="Apellido Materno*" {...register("Materno", { required: true })} />
                    <input className={`${styleInputs}`} type="number" placeholder="Teléfono*" {...register("Telefono", { required: true })} />
                    <input className={`${styleInputs}`} type="email" placeholder="Correo*" {...register("Correo", { required: true })} />
                    <button type="submit" className="px-4 py-2 my-5 rounded-md bg-primary text-secondary-a">Guardar</button>
                </form>
                {
                    error && <p className="p-1 text-center rounded-md bg-danger text-secondary-a">{error}</p>
                }
            </div>
        </>
    );
}

export default AgregarEstudiante;