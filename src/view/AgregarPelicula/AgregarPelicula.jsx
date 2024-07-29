import { React, useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../../component/Header/Header';
import BotonCargando from '../../component/Loaders/BotonCargando/BotonCargando';
import Plus from '../../images/Plus';
import { useNavigate } from 'react-router-dom';
import { handleUploadImage, PORTADAS_PELICULAS } from '../../FirebaseService/StorageService';
import { addMovie } from '../../FirebaseService/MovieService'



const AgregarPelicula = () => {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("Cargando...");

    
    const [imageUrl, setImageUrl] = useState(null);
    const fileInputRef = useRef(null);
    const [origen, setOrigen] = useState();
    const [tipo, setTipo] = useState();
    const { register, handleSubmit } = useForm();
    const [generos, setGeneros] = useState([]);
    const navigate = useNavigate();
    const [btnBloqueado, setBtnBloqueado] = useState(false);

    const handleAddGenero = () => {
        setGeneros([...generos, ""]);
    };

    const handleGeneroChange = (index, value) => {
        if (value.trim() !== "") {
            const updatedGeneros = [...generos];
            updatedGeneros[index] = value.trim(); // Eliminar espacios en blanco al principio y al final
            setGeneros(updatedGeneros);
        }
    };

    const guardarPelicula = async (data) => {
        setBtnBloqueado(true);
        const INFORMACION = {
            anio: data.ano,
            codigo: data.codigo,
            titulo: data.titulo,
            origen: origen,
            portada: imageUrl,
            tipo: tipo,
            AUTOR: {
                Nombre: data.nombre,
                Paterno: data.paterno,
                Materno: data.materno
            },
            GENEROS: [
                ...generos
            ]
        }
        if(addMovie(INFORMACION)){
            navigate('/pelicula');
        }else{
            alert('Error al guardar la película');
        }
    }

    return (
        <>
            <Header />
            <h2 className='m-4 text-xl font-bold text-centers'>Agregar Película</h2>
            <section className='flex flex-col items-center justify-center gap-5'>

                <div className='w-[90%] mx-auto my-4 flex flex-row justify-center items-center gap-5'>
                    {imageUrl ? <img className='w-[100px] h-[150px] rounded-sm object-cover' src={imageUrl} /> : <div className='bg-[#f2f2f2] w-[100px] h-[150px] rounded-sm border-solid border-[1px] border-[#000]'></div>}
                    <input name="image" type="file" onChange={async (e)=>{const url = await handleUploadImage(e, PORTADAS_PELICULAS); setImageUrl(url)}} style={{ display: 'none' }} ref={fileInputRef} />
                    <div className='flex flex-col items-center justify-center gap-3'>
                        {
                            loading ? <BotonCargando text={text} /> : <button className='bg-primary text-secondary-a p-2 rounded-md w-[180px]' onClick={(e) => { e.preventDefault(); fileInputRef.current.click() }}>Seleccionar Portada</button>
                        }
                    </div>
                </div>

                <form onSubmit={handleSubmit(guardarPelicula)} className='mx-auto w-[90%] flex flex-col justify-center items-center gap-9'>

                    <fieldset className='flex flex-col gap-4 w-[100%]'>
                        <legend className='my-4 text-xl font-bold'>Información de Película</legend>
                        <input {...register("codigo", { required: true })} type="text" placeholder="Código" className='border-b-[1px] border-solid outline-none border-[#000] p-1 w-[100%]' />
                        <input {...register("titulo", { required: true })} type="text" placeholder="Titulo" className='border-b-[1px] border-solid outline-none border-[#000] p-1 w-[100%]' />

                        <input {...register("ano", { required: true })} type="text" placeholder="Año" className='border-b-[1px] border-solid outline-none border-[#000] p-1 w-[100%]' />

                        <select className='border-b-[1px] border-solid outline-none border-[#000] p-1 w-[100%]' value={tipo} onChange={(e) => { setTipo(e.target.value) }} >
                            <option value="">Selecciona Opción</option>
                            <option value="dvd">DVD</option>
                            <option value="blueRay">Blue-Ray</option>
                            <option value="otro">Otro</option>
                        </select>

                        <select value={origen} onChange={(e) => { setOrigen(e.target.value) }} className='outline-none border-b-[1px] border-solid border-[#000] p-1 w-[100%]'>
                            <option value="">Selecciona Opción</option>
                            <option value="original">Original</option>
                            <option value="copia">Copia</option>
                        </select>

                    </fieldset>

                    <fieldset className='flex flex-col gap-4 w-[100%]'>
                        <legend className='my-4 text-xl font-bold'>Información del Autor</legend>
                        <input {...register("nombre", { required: true })} type="text" placeholder="Nombre" className='border-b-[1px] outline-none border-solid border-[#000] p-1 w-[100%]' />
                        <input {...register("paterno", { required: true })} type="text" placeholder="Paterno" className='border-b-[1px] outline-none border-solid border-[#000] p-1 w-[100%]' />
                        <input {...register("materno", { required: false })} type="text" placeholder="Materno" className='border-b-[1px] outline-none border-solid border-[#000] p-1 w-[100%]' />
                    </fieldset>

                    <fieldset className='flex flex-col gap-4 w-[100%]'>
                        <legend className='text-xl font-bold'>Género</legend>
                        {generos.map((genero, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder='Género *'
                                className='border-b-[1px] border-solid outline-none border-[#000] p-1 w-[100%]'
                                value={genero}
                                onChange={(e) => { handleGeneroChange(index, e.target.value) }}
                            />
                        ))}
                        <div className='w-[50px] mx-auto' onClick={handleAddGenero}>
                            <Plus color={'black'} w={50} />
                        </div>
                    </fieldset>

                    <button disabled={btnBloqueado} type='submit' className='px-4 py-2 my-5 rounded-md bg-primary text-secondary-a'>Guardar</button>

                </form>

            </section>
        </>
    )
}

export default AgregarPelicula;