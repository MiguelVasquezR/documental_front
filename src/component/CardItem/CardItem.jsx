import { React } from 'react';
import {useNavigate} from 'react-router-dom';

const CardItem = (libro) => {
    const navigate = useNavigate();

    const seeBook = () => {                
        navigate(`/ver?id=${libro.libro.ID}`);
    }

    return (
        <div onClick={seeBook} className='bg-primary w-[90%] max-w-lg h-[150px] rounded-xl mx-auto flex flex-row justify-evenly items-center text-secondary-a my-5 animate-slideInUp'>
            <picture className='w-[100px] h-[90%] border-secondary-a border-2'>
                <img src={`${libro.libro.LinkFoto}`} className="h-[100%] w-screen object-cover"/>
            </picture>

            <div className='w-48 text-center'>
                <h2 className='text-lg'>{libro.libro.Titulo}</h2>
                <h2 className='text-sm my-1' >{libro.libro.Nombre +" "+ libro.libro.Paterno +" "+ libro.libro.Materno}</h2>
            </div>
        </div>
    )
}

export default CardItem;