import React, { useEffect, useState } from 'react';
import Header from '../../component/Header/Header';
import { getLoans } from '../../FirebaseService/LoansService';
import { LuBookUp2 } from "react-icons/lu";

import { updateStatus } from '../../FirebaseService/LoansService';

import { IsLogin } from '../../FirebaseService/AuthService';
import { useNavigate } from 'react-router-dom';

const App = () => {

    const navigate = useNavigate();

    useEffect(() => {
        IsLogin().then((res) => {
            if (!res) { 
                navigate('/login');
            }
        }
        );
    })


    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const [prestamos, setPrestamos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const res = await getLoans();
                setPrestamos(res);
            } catch (err) {
                setError('Error al obtener los préstamos');
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, []);

    const formatTimestamp = (timestamp) => {
        if (timestamp && timestamp.toDate) {
            return timestamp.toDate().toLocaleDateString();
        }
        return 'Fecha no disponible';
    };

    const handleReturn = async (id) => {
        updateStatus(id).then((res) => { console.log(res); })
    }

    const CardPrestamo = ({ p }) => {
        return (
            <div className='w-[500px] h-[150px] shadow-md rounded-md flex flex-row justify-evenly items-center mx-auto animate-slideInUp'>
                <picture>
                    <img src={`${p?.Material?.Portada}`} alt="Portada" className='object-fill rounded-md h-[150px] w-[150px]' />
                </picture>
                <article className='text-center w-[50%]'>
                    <p className='text-[12px]'>Titulo: {p?.Material?.Titulo}</p>
                    <p className='text-[12px]'>Nombre: {`${p?.Estudiante?.Nombre || ''} ${p?.Estudiante?.Paterno || ''} ${p?.Estudiante?.Materno || ''}`}</p>
                    <p className='text-[12px]'>Correo: {p.Estudiante.Correo}</p>
                    <p className='text-[12px]'>Telefono: {p.Estudiante.Telefono}</p>
                    <p className='text-[12px]'>Préstamo: {formatTimestamp(p?.FechaInicio)}</p>
                    <p className='text-[12px]'>Devolución: {formatTimestamp(p?.FechaFin)}</p>
                </article>

                <div className="flex flex-col items-center justify-center cursor-pointer" onClick={() => { handleReturn(p) }}>
                    <LuBookUp2 size={40} />
                    <h2 className="text-[12px]">Regresar</h2>
                </div>


            </div>
        );
    };

    return (
        <>
            <Header />
            <section className='py-4'>
                <h2 className='pr-8 font-bold tracking-wider text-right'>{formatDate(new Date())}</h2>
                <h2 className='p-4'>Próximas Devoluciones</h2>

                {loading && <p>Cargando...</p>}
                {error && <p>{error}</p>}

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {
                        prestamos.length > 0 ? (
                            prestamos.filter(p => p.Estado !== "Devuelto").map((p, index) => (
                                <CardPrestamo key={index} p={p} />
                            ))
                        ) : (
                            <div className='w-[90%] h-[150px] max-w-[300px] shadow-md rounded-md flex flex-row justify-evenly items-center mx-auto animate-slideInUp'>
                                <h2 className='text-center'>No hay préstamos pendientes</h2>
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    );
};

export default App;
