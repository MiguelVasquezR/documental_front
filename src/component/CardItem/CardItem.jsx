import { React } from 'react';
import {Link, useNavigate} from 'react-router-dom';

import img from '../../images/qj.jpeg'

const CardItem = (data) => {
    const navigate = useNavigate();

    const seeBook = () => {                
        navigate(`/ver`);
    }

    return (
        <div onClick={seeBook} className='bg-primary w-[90%] max-w-[600px] h-[150px] rounded-xl mx-auto flex flex-row justify-evenly items-center text-secondary-a my-5'>
            <picture className='h-[90%] border-secondary-a border-2'>
                <img src={img} className="h-[100%] object-cover"/>
            </picture>

            <div className='w-48 text-center'>
                <h2 className='text-lg'>Don Quijote de la mancha</h2>
                <h2 className='text-sm my-1' >Miguel De Cervantes</h2>
                <h3 className='text-sm my-1' >Novela Española</h3>
            </div>
        </div>
    )
}

export default CardItem;