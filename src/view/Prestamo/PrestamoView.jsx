import React, { useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../../component/Header/Header";

const PrestamoView = () => {

    const [paso, setPaso] = useState(1);
    const navigate = useNavigate();

    const [matricula, setMatricula] = useState("");
    const [codigo, setCodigo] = useState("");

    const [estudiante, setEstudiante] = useState(null);
    const [libro, setLibro] = useState(null);


    const inicio = new Date();

    const fin = new Date();
    fin.setDate(fin.getDate() + 15);
    var year = fin.getFullYear();
    var month = ('0' + (fin.getMonth() + 1)).slice(-2); // Los meses son indexados desde 0
    var day = ('0' + fin.getDate()).slice(-2);
    var fechaAumentada = day + "/" + month + "/" + year;


    const guardarPrestamo = () => {
        const data = {
            Estado: "Prestado",
            fechaPrestamo: inicio.toLocaleDateString(),
            fechaRegreso: fechaAumentada,
            IDTexto: libro.IDTexto,
            IDEstudiante: estudiante.ID
        }

        axios.post('http://localhost:4567/prestamo/crear', data)
            .then((res) => {
                console.log(res.data.mensaje);
                navigate("/")
            })
            .catch((err) => { console.log(err); })

    }

    const obtenerEstudiante = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:4567/estudiante/matricula?matricula=${matricula}`)
            .then((res) => {
                setEstudiante(res.data);
                setPaso(2);
            })
            .catch((err) => { console.log(err); })
    }

    const obtenerLibro = (e) => {
        e.preventDefault();

        axios.get(`http://localhost:4567/texto/codigo?codigo=${codigo}`)
            .then((res) => {
                console.log(res.data);
                setLibro(res.data);
            })
            .catch((err) => { console.log(err); })
    }


    return (
        <>
            <Header />

            <div className="flex flex-col justify-center items-center gap-7">

                <h2 className="text-center text-2xl font-bold my-5">Prestamo</h2>

                <section className="w-[100%]">

                    {
                        paso === 1 ?
                            <form action="" className="flex flex-col justify-center items-center gap-5">
                                <input value={matricula} onChange={(e) => { setMatricula(e.target.value) }} className="border-b-[1px] border-solid border-[#000] p-1 w-[80%]" type="text" placeholder="Ingresar matricula" />
                                <div className="flex flex-row justify-center items-center gap-5">
                                    <button onClick={obtenerEstudiante} type="submit" className="bg-primary py-2 px-4 text-secondary-a rounded-md">Buscar</button>
                                    <IoPersonAdd size={35} onClick={() => { navigate("/agregar-estudiante") }} />
                                </div>
                            </form>
                            :
                            <form action="" className="flex flex-col justify-center items-center gap-5">
                                <input value={codigo} onChange={(e) => { setCodigo(e.target.value) }} className="border-b-[1px] border-solid border-[#000] p-1 w-[80%]" type="text" placeholder="Ingresar código del libro" />
                                <button onClick={obtenerLibro} type="submit" className="bg-primary py-2 px-4 text-secondary-a rounded-md">Buscar</button>
                            </form>
                    }
                </section>

                {
                    estudiante ?
                        <section className="shadow-md w-[90%] p-5 mx-auto animate-slideInRight">
                            <h2 className="my-2 font-bold text-xl">Información del Estudiante</h2>
                            <article className="flex flex-col justify-center items-center gap-2">
                                <h3>Nombre: {estudiante?.Nombre + " " + estudiante?.Paterno + " " + estudiante?.Materno}</h3>
                                <h3>Correo: {estudiante?.Correo}</h3>
                                <h3>Teléfono: {estudiante?.Telefono}</h3>
                            </article>
                        </section>
                        :
                        ""

                }

                {
                    libro ?
                        <section className="shadow-md w-[90%] p-5 mx-auto animate-slideInRight">
                            <h2 className="font-bold text-xl my-2">Información del Libro</h2>

                            <article className="flex flex-row justify-center items-center gap-2">
                                <picture>
                                    <img src={`http://localhost:5678/images/${libro.LinkFoto}`} className="bg-blue-500 w-[100px] h-[120px] rounded-md" />
                                </picture>
                                <div className="flex flex-col justify-center items-center gap-2 text-center">
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
                        <div className="animate-slideInRight w-[100%] flex flex-col items-center justify-center gap-5"> 
                            <section className="shadow-md w-[90%] p-5 mx-auto">
                                <h2 className="text-xl font-bold my-2">Información de Entrega</h2>
                                <div className="flex flex-row justify-center items-center gap-5">
                                    <p>Inicio: {inicio.toLocaleDateString()}</p>
                                    <p>Fin: {fechaAumentada}</p>
                                </div>
                            </section>
                            <button onClick={guardarPrestamo} className="bg-primary px-2 py-4 text-secondary-a rounded-md mb-5">Guardar Prestamo</button>
                        </div>
                        :
                        ""
                }

            </div>




        </>
    );
}

export default PrestamoView;