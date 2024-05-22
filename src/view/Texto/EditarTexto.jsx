import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../component/Header/Header';
import CargandoLibro from '../../component/Loaders/CargandoLibro/Cargando';
import Ubicacion from '../../component/Ubicacion/Ubicacion';

const EditarTexto = () => {
    const stylesInputs = "border-b-[1px] w-[90%] p-1 outline-none";
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [ubicacion, setUbicacion] = useState({});
    const [btnBloqueado, setBtnBloqueado] = useState(false);

    const searchParams = new URLSearchParams(location.search);
    const codigo = searchParams.get('codigo');

    const [texto, setTexto] = useState({
        Codigo: '',
        Titulo: '',
        NumPaginas: '',
        Tipo: '',
        Ano: '',
        Nombre: '',
        Paterno: '',
        Materno: '',
        Resena: '',
    });

    const [repisa, setRepisa] = useState('');
    const [fila, setFila] = useState('');
    const [columna, setColumna] = useState('');

    useEffect(() => {
        axios.get(`https://${import.meta.env.VITE_IP}/texto/by-codigo?codigo=${codigo}`)
            .then(({ data }) => { setTexto(data); })
            .catch(error => console.error('Error al obtener el texto:', error));
    }, [codigo]);

    useEffect(() => {
        if (texto) {
            const { repisa, fila, columna } = JSON.parse(texto.Ubicacion || '{}');
            setRepisa(repisa);
            setFila(fila);
            setColumna(columna);
        }
    }, [texto]);

    const handleSave = async () => {
        setBtnBloqueado(true);

        const autor = {
            ID: texto.IDAutor,
            Nombre: texto.Nombre,
            Paterno: texto.Paterno,
            Materno: texto.Materno,
        };
        
        await axios.put(`https://${import.meta.env.VITE_IP}/autor/editar`, autor)
        .then(({data}) => {console.log(data);})
        .catch(error => console.error('Error al editar el autor:', error));

        const ubi = {
            repisa,
            fila,
            columna
        }

        const dataTexto = {
            ID: texto.IDTexto,
            Codigo: texto.Codigo,
            Titulo: texto.Titulo,
            NumPaginas: texto.NumPaginas,
            Tipo: texto.Tipo,
            Ano: texto.Ano,
            Resena: texto.Resena,
            IDAutor: texto.IDAutor,
            Ubicacion: JSON.stringify(ubi)
        }

        await axios.put(`https://${import.meta.env.VITE_IP}/texto/editar`, dataTexto)
        .then(({data}) => {console.log(data);})
        .catch(error => console.error('Error al editar el texto:', error));

        navigate('/texto');
        

    };

    const handleContadorCaracteres = (e, max) => {
        if (e.target.value.length > max) { e.target.value = e.target.value.slice(0, max); }
    };

    const handleInputChange = (e) => {
        setTexto({
            ...texto,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Header />

            <form onSubmit={handleSubmit(handleSave)} className='w-[90%] mx-auto flex flex-col justify-center items-center gap-4'>

                <fieldset className='flex flex-col justify-center items-center gap-4 w-[90%]'>
                    <legend className='p-3 text-lg font-bold'>Información del Libro</legend>
                    <input value={texto.Codigo} required={true} name="Codigo" type="text" placeholder='Código' className={`${stylesInputs}`} onChange={handleInputChange} />
                    <input value={texto.Titulo} required={true} name="Titulo" type="text" placeholder='Titulo' className={`${stylesInputs}`} onChange={handleInputChange} />
                    <input value={texto.NumPaginas} required={true} name="NumPaginas" type="number" placeholder='Número de Páginas' className={`${stylesInputs}`} onInput={(e) => { handleContadorCaracteres(e, 6) }} onChange={handleInputChange} />
                    <input value={texto.Tipo} required={true} name="Tipo" type="text" placeholder='Tipo' className={`${stylesInputs}`} onChange={handleInputChange} />
                    <input value={texto.Ano} required={true} name="Ano" onInput={(e) => { handleContadorCaracteres(e, 4) }} type="number" placeholder='Año' className={`${stylesInputs}`} onChange={handleInputChange} />
                </fieldset>

                <fieldset className='flex flex-col justify-center items-center gap-4 w-[90%]'>
                    <legend className='p-3 text-lg font-bold'>Información del Autor</legend>
                    <input value={texto.Nombre}  required={true} name="Nombre" type="text" placeholder='Nombre' className={`${stylesInputs}`} onChange={handleInputChange} />
                    <input value={texto.Paterno} required={true} name="Paterno" type="text" placeholder='Paterno' className={`${stylesInputs}`} onChange={handleInputChange} />
                    <input value={texto.Materno} name="Materno" type="text" placeholder='Materno' className={`${stylesInputs}`} onChange={handleInputChange} />
                </fieldset>

                <fieldset className='flex flex-col justify-center items-center gap-4 w-[90%]'>
                    <legend className='p-3 text-lg font-bold'>Reseña</legend>
                    <textarea value={texto.Resena} name="Resena" placeholder='Escribe tu Reseña' className='border-[1px] border-solid border-[#000] w-[90%] p-1 h-[200px] max-h-[500px] outline-none' onChange={handleInputChange}></textarea>
                </fieldset>

                <section className='w-[90%] mx-auto'>

                    <legend className='p-3 text-lg font-bold'>Ubicación</legend>
                    <select value={repisa} onChange={(e) => setRepisa(e.target.value)} className='w-[100%] bg-transparent border-b-[1px] border-solid border-[#000] p-1 my-2 outline-none'>
                        <option value="">Seleccione una repisa</option>
                        <option value="1">Repisa 1</option>
                        <option value="2">Repisa 2</option>
                    </select>
                    <input
                        value={columna}
                        onChange={(e) => setColumna(e.target.value)}
                        className='outline-none w-[100%] bg-transparent border-b-[1px] border-solid border-[#000] p-1 my-2'
                        type="number"
                        onInput={handleContadorCaracteres}
                        placeholder='Columna *'
                    />
                    <input
                        value={fila}
                        onChange={(e) => setFila(e.target.value)}
                        className='outline-none w-[100%] bg-transparent border-b-[1px] border-solid border-[#000] p-1 my-2'
                        type="number"
                        onInput={handleContadorCaracteres}
                        placeholder='Fila *'
                    />

                    {repisa === '1' ? <Ubicacion col={columna} row={fila} size={4} /> : <Ubicacion col={columna} row={fila} size={6} />}
                </section>

                <button disabled={btnBloqueado} className='px-5 py-3 m-3 rounded-md bg-primary text-secondary-a' type='submit'>Guardar</button>

                {isLoading ? <CargandoLibro /> : ""}
            </form>
        </>
    )
}

export default EditarTexto;

