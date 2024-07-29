import React, { useEffect, useState } from "react";
import { IoPersonAdd, IoCloseCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";

import Header from "../../component/Header/Header";
import IsLogin from "../../hooks/IsLogin";


import {getStudentByTuition} from "../../FirebaseService/Studentservice";

const PrestamoView = () => {
    const [bloqueado, setBloqueado] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [nombre, setNombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [paso, setPaso] = useState(1);
    const [matricula, setMatricula] = useState("");
    const [codigo, setCodigo] = useState("");
    const [estudiante, setEstudiante] = useState(null);
    const [libro, setLibro] = useState(null);

    const navigate = useNavigate();
    const inicio = new Date();
    const fin = new Date();
    fin.setDate(fin.getDate() + 15);
    const fechaAumentada = `${('0' + fin.getDate()).slice(-2)}/${('0' + (fin.getMonth() + 1)).slice(-2)}/${fin.getFullYear()}`;

    

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "nombre":
                setNombre(value);
                break;
            case "apellidoPaterno":
                setApellidoPaterno(value);
                break;
            case "apellidoMaterno":
                setApellidoMaterno(value);
                break;
            case "correo":
                setCorreo(value);
                break;
            case "telefono":
                setTelefono(value);
                break;
            default:
                break;
        }
    };

    const guardarPrestamo = () => {
        setBloqueado(true);

        const data = {
            Estado: "Prestado",
            fechaPrestamo: inicio.toLocaleDateString(),
            fechaRegreso: fechaAumentada,
            IDTexto: libro.IDTexto,
            IDEstudiante: estudiante.ID
        }

        axios.post(`http://${import.meta.env.VITE_IP}/prestamo/crear`, data)
            .then((res) => {
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                setBloqueado(false);
            });
    };

    const obtenerEstudiante = (e) => {
        e.preventDefault();

        getStudentByTuition()

        
       
            
    };

    const obtenerLibro = (e) => {
        e.preventDefault();

        axios.get(`http://${import.meta.env.VITE_IP}/texto/codigo?codigo=${codigo}`)
            .then((res) => {
                if (res.data.mensaje === "No existe el libro") {
                    setMensaje(res.data.mensaje);
                } else {
                    if (res.data.disponible) {
                        setMensaje(null);
                        setLibro(res.data.texto);
                    } else {
                        setMensaje("Libro no disponible");
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                setMensaje("Error al buscar libro");
            });
    };

    const validarMatricula = (e) => {
        setMensaje(null);
        const value = e.target.value;
        if (value.length <= 9 && value.charAt(0) === 'S') {
            setMatricula(value);
        }
    };

    const editarEstudiante = () => {
        setShowForm(true);
    };

    const actualizarEstudiante = (e) => {
        e.preventDefault();

        const data = {
            ID: estudiante.ID,
            Nombre: nombre,
            Paterno: apellidoPaterno,
            Materno: apellidoMaterno,
            Correo: correo,
            Telefono: telefono
        };

        console.log(data);

        axios.put(`http://${import.meta.env.VITE_IP}/estudiante/editar`, data)
            .then((res) => {
                setEstudiante(res.data);
                setShowForm(false);
                setMensaje("Estudiante actualizado");
            })
            .catch((err) => {
                console.log(err);
                setMensaje("Error al actualizar estudiante");
            });
    }

    return (
        <>
            <Header />

            <div className="relative flex flex-col items-center justify-center gap-7">

                {showForm && (
                    <div className="fixed top-0 flex items-center justify-center w-screen h-screen bg-black/50">
                        <form onSubmit={actualizarEstudiante} className="bg-white shadow-md w-[500px] h-[700px] flex flex-col justify-center items-center gap-5 relative rounded-md">
                            <IoCloseCircleOutline onClick={() => setShowForm(!showForm)} className="absolute cursor-pointer top-2 right-2" size={50} />
                            <legend className="my-5 text-2xl font-bold">Actualizar Estudiante</legend>
                            <input value={nombre} onChange={handleChange} name="nombre" type="text" className="border-b-[1px] border-solid border-[#000]  outline-none w-[80%] p-1" placeholder="Nombre" />
                            <input value={apellidoPaterno} onChange={handleChange} name="apellidoPaterno" type="text" className="border-b-[1px] border-solid border-[#000] outline-none  w-[80%] p-1" placeholder="Apellido Paterno" />
                            <input value={apellidoMaterno} onChange={handleChange} name="apellidoMaterno" type="text" className="border-b-[1px] border-solid border-[#000] outline-none  w-[80%] p-1" placeholder="Apellido Materno" />
                            <input value={correo} onChange={handleChange} name="correo" type="text" className="border-b-[1px] border-solid border-[#000]  outline-none w-[80%] p-1" placeholder="Correo" />
                            <input value={telefono} onChange={handleChange} name="telefono" type="text" className="border-b-[1px] border-solid border-[#000] w-[80%] outline-none p-1" placeholder="Teléfono" />
                            <button className="p-2 rounded-md bg-primary text-secondary-a" type="submit">Actualizar</button>
                        </form>
                    </div>
                )}


                <h2 className="my-5 text-2xl font-bold text-center">Prestamo</h2>

                <section className="w-[100%]">

                    {
                        paso === 1 ?
                            <form action="" className="flex flex-col justify-center items-center gap-5 mx-auto max-w-[500px]">
                                <input value={matricula} onChange={validarMatricula} className="outline-none border-b-[1px] border-solid border-[#000] p-1 w-[80%]" type="text" placeholder="Matricula: S12345678" />
                                <div className="flex flex-row items-center justify-center gap-5">
                                    <button onClick={obtenerEstudiante} type="submit" className="px-4 py-2 rounded-md bg-primary text-secondary-a">Buscar</button>
                                    <IoPersonAdd size={35} onClick={() => { navigate("/agregar-estudiante") }} />
                                </div>
                            </form>
                            :
                            <form action="" className="flex flex-col justify-center items-center gap-5 mx-auto max-w-[500px]">
                                <input value={codigo} onChange={(e) => { setCodigo(e.target.value) }} className="outline-none border-b-[1px] border-solid border-[#000] p-1 w-[80%]" type="text" placeholder="Ingresar código del libro" />
                                <button onClick={obtenerLibro} type="submit" className="px-4 py-2 rounded-md bg-primary text-secondary-a">Buscar</button>
                            </form>
                    }
                </section>

                {
                    estudiante ?
                        <section className="shadow-md w-[90%] p-5 mx-auto animate-slideInRight rounded-md max-w-[700px] flex flex-row items-center justify-center gap-10">
                            <div>
                                <h2 className="my-2 text-xl font-bold">Información del Estudiante</h2>
                                <article className="flex flex-col items-center justify-center gap-2 text-center">
                                    <h3>Nombre: {estudiante?.Nombre + " " + estudiante?.Paterno + " " + estudiante?.Materno}</h3>
                                    <h3>Correo: {estudiante?.Correo}</h3>
                                    <h3>Teléfono: {estudiante?.Telefono}</h3>
                                </article>
                            </div>
                            <FaUserEdit onClick={editarEstudiante} className="cursor-pointer" size={30} />
                        </section>
                        :
                        ""

                }

                {
                    libro ?
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
                        <div className="animate-slideInRight w-[100%] flex flex-col items-center justify-center gap-5 rounded-md max-w-[700px]">
                            <section className="shadow-md w-[90%] p-5 mx-auto">
                                <h2 className="my-2 text-xl font-bold">Información de Entrega</h2>
                                <div className="flex flex-row items-center justify-center gap-5">
                                    <p>Inicio: {inicio.toLocaleDateString()}</p>
                                    <p>Fin: {fechaAumentada}</p>
                                </div>
                            </section>
                            <button disabled={bloqueado} onClick={guardarPrestamo} className="px-2 py-4 mb-5 rounded-md bg-primary text-secondary-a hover:bg-primary/90">Guardar Prestamo</button>
                        </div>
                        :
                        ""
                }

                {
                    mensaje !== null &&
                    <div className="bg-[#ec5353] px-4 py-2 rounded-md text-secondary-a">
                        <p>{mensaje}</p>
                    </div>
                }

            </div>

        </>
    );
};

export default PrestamoView;
