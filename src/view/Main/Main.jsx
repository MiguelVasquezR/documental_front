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
        axios.get(`http://${import.meta.env.VITE_IP}/prestamo/listar`)
            .then((res) => {
                setPrestamo(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    const CardPrestamo = ({ p }) => {

        const [e, setE] = useState(null);
        const [t, setT] = useState(null);

        useEffect(() => {
            axios.get(`http://${import.meta.env.VITE_IP}/estudiante/id?id=${p.IDEstudiante}`)
                .then((res) => {
                    setE(res.data);
                })
                .catch((err) => {
                    console.log(err)
                })

            axios.get(`http://${import.meta.env.VITE_IP}/texto/prestamo?id=${p.IDTexto}`)
                .then((res) => {
                    setT(res.data);
                })
                .catch((err) => {
                    console.log(err)
                })

        }, []);


        return (
            <div className='w-[90%] h-[150px] shadow-md rounded-md flex flex-row justify-evenly items-center mx-auto animate-slideInUp'>

                <picture>
                    <img src={`${t?.LinkFoto}`} className='object-cover rounded-md h-[120px] w-[100px]' />
                </picture>

                <article className='text-center'>
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
                <h2 className='text-right pr-8 font-bold tracking-wider'>{formattedDate}</h2>
                <h2 className='p-4' >Próximas Devoluciones</h2>
                {
                    prestamo.map((p, index) => {
                        if (p.Estado !== "Devuelto"){
                            return <CardPrestamo key={index} p={p} />
                        }else{
                            return ""
                        }
                        
                    })
                }
            </section>

        </>
    )
}

export default App;