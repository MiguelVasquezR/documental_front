import { React, useEffect, useState } from 'react'
import axios from 'axios'

import Header from '../../component/Header/Header'

const App = () => {

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const formattedDate = formatDate(new Date());
    const [prestamo, setPrestamo] = useState([]);

    useEffect(() => {
        axios.get(`httpss://${import.meta.env.VITE_IP}/prestamo/listar`)
            .then((res) => {
                if (res.data) {
                    setPrestamo(res.data);
                } else {
                    setPrestamo(null);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    const CardPrestamo = ({ p }) => {

        const [e, setE] = useState(null);
        const [t, setT] = useState(null);

        useEffect(() => {
            axios.get(`httpss://${import.meta.env.VITE_IP}/estudiante/id?id=${p.IDEstudiante}`)
                .then((res) => {
                    setE(res.data);
                })
                .catch((err) => {
                    console.log(err)
                })

            axios.get(`httpss://${import.meta.env.VITE_IP}/texto/prestamo?id=${p.IDTexto}`)
                .then((res) => {
                    setT(res.data);
                })
                .catch((err) => {
                    console.log(err)
                })

        }, []);


        return (
            <div className='w-[90%] h-[150px] max-w-[300px] shadow-md rounded-md flex flex-row justify-evenly items-center mx-auto animate-slideInUp'>

                <picture>
                    <img src={`${t?.LinkFoto}`} className='object-cover rounded-md h-[120px] w-[100px]' />
                </picture>

                <article className='text-center w-[50%]'>
                    <p className='text-[12px]'>Titulo: {t?.Titulo}</p>
                    <p className='text-[12px]'>Nombre: {e?.Nombre + " " + e?.Paterno + " " + e?.Materno}</p>
                    <p className='text-[12px]'>Préstamo: {p.fechaPrestamo}</p>
                    <p className='text-[12px]'>Devolución: {p.fechaRegreso}</p>
                </article>

            </div>
        )
    }

    return (
        <>
            <Header />
            <section className='py-4'>
                <h2 className='pr-8 font-bold tracking-wider text-right'>{formattedDate}</h2>
                <h2 className='p-4' >Próximas Devoluciones</h2>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {
                        prestamo !== null ?
                            prestamo.map((p, index) => {
                                if (p.Estado !== "Devuelto") {
                                    return <CardPrestamo key={index} p={p} />
                                } else {
                                    return <p className='mx-auto my-5 font-bold'>No hay libros por devolver</p>
                                }
                            }) : null
                    }
                </div>

                {
                    prestamo.length === 0 ?
                        <div className='w-[90%] h-[150px] max-w-[300px] shadow-md rounded-md flex flex-row justify-evenly items-center mx-auto animate-slideInUp'>
                            <h2 className='text-center'>No hay préstamos pendientes</h2>
                        </div> : ""
                }
            </section>

        </>
    )
}

export default App;