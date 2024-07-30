import { React } from 'react';
import {useNavigate} from 'react-router-dom';

const CardItem = (libro) => {
    const navigate = useNavigate();

    const seeBook = () => {                
        navigate(`/ver?id=${libro.libro.id}`);
    }

    return (
        <div onClick={seeBook} className='bg-primary w-[90%] max-w-lg h-[150px] rounded-xl mx-auto flex flex-row justify-evenly items-center text-secondary-a my-5 animate-slideInUp'>
            <picture className='w-[100px] h-[90%] border-secondary-a border-2'>
                <img src={`${libro.libro?.Portada}`} className="h-[100%] w-screen object-fill"/>
            </picture>

            <div className='w-48 text-center'>
                <h2 className='text-lg'>{libro.libro?.Titulo}</h2>
                <h2 className='my-1 text-sm' >{libro.libro?.AUTOR?.NOMBRE +" "+ libro.libro?.AUTOR?.PATERNO +" "+ libro.libro?.AUTOR?.MATERNO}</h2>
                
            </div>
        </div>
    )
}

export default CardItem;