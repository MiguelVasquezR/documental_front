import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../component/Header/Header";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";

const Devolucion = () => {

    const [estudiante, setEstudiante] = useState(null);
    const [libro, setLibro] = useState(null);
    const [prestamo, setPrestamo] = useState(null);
    const [codigo, setCodigo] = useState("");
    const navigate = useNavigate();
    const [btnBloqueado, setBtnBloqueado] = useState(false);

    const obtenerPrestamo = (e) => {
        e.preventDefault();
        axios.post(`https://${import.meta.env.VITE_IP}/prestamo/devolver?codigo=${codigo}`)
            .then((res) => {
                setPrestamo(res.data);
            })
            .catch((err) => { console.log(err) })
    }

    useEffect(() => {
        if (prestamo === null) return;
        axios.get(`https://${import.meta.env.VITE_IP}/estudiante/id?id=${prestamo?.IDEstudiante}`)
            .then((res) => {
                setEstudiante(res.data);
            })
            .catch((err) => { console.log(err) })

        axios.get(`https://${import.meta.env.VITE_IP}/texto/by-codigo?codigo=${codigo}`)
            .then((res) => {
                console.log(res.data);
                setLibro(res.data);
            })
            .catch((err) => { console.log(err); })

    }, [prestamo]);

    const confirmarDevolucion = () => {
        setBtnBloqueado(true);
        axios.put(`https://${import.meta.env.VITE_IP}/prestamo/confirmar-devolucion?id=${prestamo.ID}`)
            .then((res) => {
                console.log(res.data.mensaje);

                navigate("/")
                
            })
            .catch((err) => { console.log(err); })
    }



    return (
        <>
            <Header />

            <section className="flex flex-col items-center justify-center gap-5">
                <h2 className="my-2 text-2xl font-bold">Devolución</h2>

                <form action="" className="w-[90%] flex flex-col justify-center items-center gap-5 mx-auto rounded-md max-w-[700px]">
                    <input value={codigo} onChange={(e) => { setCodigo(e.target.value) }} className="outline-none border-b-[1px] border-[#000] border-solid p-1 w-[80%] text-center" type="text" placeholder="Ingresa código del libro" />
                    <button onClick={obtenerPrestamo} className="px-4 py-2 rounded-md bg-primary text-secondary-a" type="submit">Búscar</button>
                </form>

                {
                    estudiante !== null ?
                        <section className="shadow-md w-[90%] p-5 mx-auto animate-slideInRight rounded-md max-w-[700px]">
                            <h2 className="my-2 text-xl font-bold">Información del Estudiante</h2>
                            <article className="flex flex-col items-center justify-center gap-2">
                                <h3>Nombre: {estudiante?.Nombre + " " + estudiante?.Paterno + " " + estudiante?.Materno}</h3>
                                <h3>Correo: {estudiante?.Correo}</h3>
                                <h3>Teléfono: {estudiante?.Telefono}</h3>
                            </article>
                        </section>
                        :
                        ""

                }

                {
                    libro !== null ?
                        <section className="shadow-md w-[90%] p-5 mx-auto animate-slideInRight rounded-md max-w-[700px]">
                            <h2 className="my-2 text-xl font-bold">Información del Libro</h2>

                            <article className="flex flex-row items-center justify-center gap-2">
                                <picture>
                                    <img src={`${libro.LinkFoto}`} className="bg-blue-500 w-[100px] h-[120px] rounded-md" />
                                </picture>
                                <div className="flex flex-col items-center justify-center gap-2 text-center">
                                    <h3>Titulo: {libro.Titulo}</h3>
                                    <h3>Código: {libro.Codigo}</h3>
                                    <h3>Autor: {libro?.Nombre + " " + libro?.Paterno + " " + libro?.Materno}</h3>
                                </div>
                            </article>

                        </section>
                        :
                        ""

                }

                {
                    libro && estudiante ?
                    <button disabled={btnBloqueado} onClick={confirmarDevolucion} className="px-2 py-4 my-5 rounded-md bg-primary text-secondary-a animate-slideInRight">Aceptar Devolución</button>
                    :
                    ""
                }

            </section>


        </>
    )
}

export default Devolucion;