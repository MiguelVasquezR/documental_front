import { React } from 'react';
import {useNavigate} from 'react-router-dom';

const CardItem = (libro) => {
    const navigate = useNavigate();

    const seeBook = () => {                
        navigate(`/ver?id=${libro.libro.id}`);
    }

    return (
        <div onClick={seeBook} className='bg-primary w-[300px] max-w-lg h-[180px] rounded-xl mx-auto flex flex-row justify-between p-2 items-center text-secondary-a my-5 animate-slideInUp'>
            <picture className='w-[100px] h-[90%] border-secondary-a border-2 rounded-md'>
                <img src={`${libro.libro?.Portada}`} className="h-[100%] w-screen object-fill rounded-md"/>
            </picture>

            <div className='w-48 text-center'>
                <h2 className='text-[15px]'>{libro.libro?.Titulo}</h2>
                <h2 className='my-1 text-[12px] font-bold' >{libro.libro?.AUTOR?.NOMBRE +" "+ libro.libro?.AUTOR?.PATERNO +" "+ libro.libro?.AUTOR?.MATERNO}</h2>
                
            </div>
        </div>
    )
}

export default CardItem;