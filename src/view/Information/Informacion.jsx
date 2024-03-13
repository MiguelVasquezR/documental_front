import { React } from 'react';

import Back from '../../images/ArrowLeft';

import Header from '../../component/Header/Header';
import Ubicacion from '../../component/Ubicacion/Ubicacion';

import { useNavigate } from 'react-router-dom';

const Información = ({img, titulo, autor, editorial, cantidad, codigo, genero, resena, ubicacion}) => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);    
    }

    return (
        <>
            <Header />
            <div onClick={goBack} className='px-4 py-8 '>
                <Back w={24} />
            </div>

            <section className=' flex flex-col justify-center items-center gap-3 mx-auto w-[90%]'>

                <div>
                    <picture>
                        {img ? <img src={img} /> : <div className='w-[100px] h-[150px] my-2 rounded-md bg-[#f2f2f2]'></div>}
                    </picture>
                    <article className='text-center'>
                        <h2 className='text-2xl' >{titulo ? titulo : "Titulo"}</h2>
                        <h2 className='text-lg' >{autor ? autor : "Autor"}</h2>
                        <h2 className='text-lg' >{editorial ? editorial : "Editorial"}</h2>
                        <h2 className='text-md' >{cantidad ? cantidad : "Cantidad"}</h2>
                        <h2 className='text-md' >{codigo ? codigo : "Código"}</h2>
                        <h2 className='text-md' >{genero ? genero : "Género"}</h2>
                    </article>
                </div>

                <article>
                    <h2 className='text-xl font-bold'>Reseña</h2>
                    <h2>{resena ? resena : "No se ha encontrado la reseña"}</h2>
                </article>
            
            
            </section>            


        </>
    )
}

export default Información;