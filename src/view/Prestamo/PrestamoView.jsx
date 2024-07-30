import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Header from "../../component/Header/Header";
import { getStudentByTuition } from "../../FirebaseService/Studentservice";
import { getTextByCode } from "../../FirebaseService/TextService";
import { createLoans, isSvailable } from "../../FirebaseService/LoansService";
import { IsLogin } from '../../FirebaseService/AuthService';



const PrestamoView = () => {
    const [student, setStudent] = useState({});
    const [material, setMaterial] = useState({});
    const { register, handleSubmit, setValue } = useForm();
    const [btnMaterial, setBtnMaterial] = useState(false);

    useEffect(() => {
        IsLogin().then((res) => {
            if (!res) { 
                navigate('/login');
            }
        }
        );
    })

    const navigate = useNavigate();


    const fecha = new Date();

    const fechaFutura = new Date(fecha);
    fechaFutura.setDate(fecha.getDate() + 15);

    const handlesearchMaterial = async (data) => {
        setBtnMaterial(true);

        if (!data.matricula) {
            toast.error("Ingrese la matrícula del estudiante");
            return;
        }

        if (!data.codigo) {
            toast.error("Ingrese el código del material");
            return;
        }

        try {
            const resS = await getStudentByTuition(data.matricula);
            const resM = await getTextByCode(data.codigo);

            if (resS && resM.length > 0) {
                setStudent(resS);
                setMaterial(resM[0]);
            } else {
                toast.error("Algún dato no coincide");
                setBtnMaterial(false);
            }

        } catch (error) {
            console.log(error);
            setBtnMaterial(false);
        }


    };

    const savedata = (e) => {
        e.preventDefault();

        const data = {
            Estudiante: student,
            Material: material,
            FechaInicio: fecha,
            FechaFin: fechaFutura,
            Estado: "Prestado"
        };

        createLoans(data).then((res) => {
            if (res) {
                toast.success("Préstamo realizado con éxito");
                navigate("/");
            } else {
                toast.error("No se pudo realizar el préstamo");
            }
        })
    }

    return (
        <>
            <Header />
            <div className="flex flex-row">
                <section className="w-[50%] h-screen bg-primary flex flex-col justify-center items-center gap-10">

                    <form onSubmit={handleSubmit(handlesearchMaterial)} className="flex flex-col items-center justify-center shadow-md w-[300px] h-[250px] bg-[#f2f2f2] rounded-md">
                        <label htmlFor="matricula">Matrícula del Estudiante</label>
                        <input {...register('matricula', { required: true })} className="bg-transparent border-b-[1px] border-b-black p-1 outline-none my-2 text-center" type="text" placeholder="Ejemplo: S0000000" />
                        <label htmlFor="codigo">Código Material</label>
                        <input {...register('codigo', { required: true })} className="bg-transparent border-b-[1px] border-b-black p-1 outline-none my-2 text-center" type="text" placeholder="Ejemplo: 000-00" />
                        <button disabled={btnMaterial} type="submit" className="bg-primary/80 text-[#fff] p-1 w-[100px] my-2 rounded-md">Buscar</button>
                    </form>
                </section>

                <div className="w-[50%] h-screen flex flex-col justify-center items-center gap-10">
                    <section className="shadow-lg w-[500px] rounded-none p-2">
                        <h3 className="my-1 font-bold">Información del Estudiante</h3>
                        <p>Nombre: {student?.Nombre} {student?.Paterno} {student?.Materno}</p>
                        <p>Correo: {student?.Correo}</p>
                        <p>Teléfono: {student?.Telefono}</p>
                    </section>

                    <section className="shadow-lg w-[500px] rounded-none p-2">
                        <h3 className="my-1 font-bold">Información del Material</h3>
                        <p>Título: {material?.Titulo}</p>
                        <p>Autor: {material?.AUTOR?.NOMBRE} {material?.AUTOR?.PATERNO} {material?.AUTOR?.MATERNO}</p>
                        <p>Páginas: {material?.NumPaginas}</p>
                    </section>

                    <section className="shadow-lg w-[500px] rounded-none p-2">
                        <h3 className="my-1 font-bold">Información del Préstamo</h3>
                        <p>Inicia: {fecha.toLocaleDateString()}</p>
                        <p>Finaliza: {fechaFutura.toLocaleDateString()}</p>
                    </section>


                    <button onClick={savedata} className="bg-primary text-[#fff] p-2 w-[200px] my-2 rounded-md">Prestar</button>


                </div>
            </div>

            <Toaster position="top-left" />
        </>
    );
};

export default PrestamoView;
